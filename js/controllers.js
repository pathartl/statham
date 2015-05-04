var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

// Main control, mostly for init
statham.controller('StathamMainCtrl', function($scope, $http, $routeParams, $location) {

	$scope.site = {};

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

});

statham.controller('StathamCommentsCtrl', function($scope, wordpress) {


});