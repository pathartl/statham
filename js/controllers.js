var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

// Main control, mostly for init
statham.controller('StathamMainCtrl', function($scope, $http, $routeParams, $location) {

	$scope.site = {};
	$scope.menu = {};

	$scope.postsPerPage = 3;
    
	// $http.get('https://pathar.tl/wp-json').
	// 	success(function(data, status) {
	// 		$scope.site.info = data;
	// 	});

	$http.jsonp( site_url + '/wp-json/?_jsonp=JSON_CALLBACK' ).success(function(data) {
		$scope.site.info = data;
	});

    $scope.numberOfPages = function() {
    	if ( $scope.posts ) {
        	return Array(Math.ceil($scope.posts.length/$scope.postsPerPage));
        }
    }

    $scope.scrollToTop = function() {
    	$("html, body").css({ scrollTop: 0 });
    }

    $scope.go = function ( path ) {
	  $location.path( path );
	};

});

// Front page controller
statham.controller('StathamHomeCtrl', function($scope, wordpress, $routeParams) {

	if ( $routeParams.page > 0 ) {
		$scope.currentPage = $routeParams.page - 1;
	} else {
		$scope.currentPage = 0;
	}

	var args = {
		'posts_per_page': -1,
		'more_tag': true
	}

	wordpress.getPosts('posts', args);

});

// Archive controller
statham.controller('StathamArchiveCtrl', function($scope, wordpress, $routeParams) {

	if ( $routeParams.page > 0 ) {
		$scope.currentPage = $routeParams.page - 1;
	} else {
		$scope.currentPage = 0;
	}

	var args = {
		'posts_per_page': -1,
		'more_tag': true
	}

	if ( $routeParams.category ) {
		args['category_name'] = $routeParams.category;
	}

	wordpress.getPosts('posts', args);

});

// Search controller
statham.controller('StathamSearchCtrl', function($scope, wordpress, $routeParams) {

	if ( $routeParams.page > 0 ) {
		$scope.currentPage = $routeParams.page - 1;
	} else {
		$scope.currentPage = 0;
	}

	var args = {
		'posts_per_page': -1,
		'more_tag': true,
		's': $routeParams.query
	}

	wordpress.getPosts('posts', args);

});

// Single post controller
statham.controller('StathamSingleCtrl', function($scope, $routeParams, wordpress) {

	$scope.slug = $routeParams.slug;

	// Should be the standard whenever I want to run some queries
	var args = {
		'name': $routeParams.slug,
		'posts_per_page': 1,
		'comments': true
	}

	wordpress.getPosts( 'posts', args );

});

statham.controller('StathamPrimaryNavCtrl', function($scope, $http) {

	$http.jsonp( site_url + '/wp-json/menus/59?_jsonp=JSON_CALLBACK' ).success(function(data) {
		$scope.menu.primary = data.items;

		$scope.menu.primary.forEach(function(item, i) {
			if (item.parent != 0) {

				var parent = $('.menu-item-' + item.parent);

				if (!parent.hasClass('dropdown')) {
					parent.addClass('dropdown');
				}

				if (parent.children('ul').length === 0) {

					var parentTitle = parent.children('a').text();

					parent.children('a').remove();

					parent.append('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' + parentTitle + ' <span class="caret"></span></a>');
					parent.append('<ul class="dropdown-menu" role="menu"></ul>');
				}
				
				parent.children('ul').append('<li class="menu-item-' + item.ID + '"><a href="' + item.url + '">' + item.title + '</a></li>');
				
			} else {
				$('header ul.nav').append('<li class="menu-item-' + item.ID + '"><a href="' + item.url + '">' + item.title + '</a></li>');
			}
		});
	});

});

statham.controller('StathamCommentsCtrl', function($scope, wordpress) {


});