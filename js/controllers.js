var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

// Main control, mostly for init
statham.controller('StathamMainCtrl', function($scope, $http, $routeParams) {

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
    	$("html, body").animate({ scrollTop: 0 }, "slow");
    }

});

// Front page controller
statham.controller('StathamHomeCtrl', function($scope, wordpress, $routeParams) {

	if ( $routeParams.page > 0 ) {
		$scope.currentPage = $routeParams.page - 1;
	} else {
		$scope.currentPage = 0;
	}

	wordpress.getPosts('posts', {'posts_per_page': -1});

});

// Single post controller
statham.controller('StathamSingleCtrl', function($scope, $routeParams, wordpress) {

	$scope.slug = $routeParams.slug;

	// Should be the standard whenever I want to run some queries
	var args = {
		'name': $routeParams.slug,
		'posts_per_page': -1
	}

	wordpress.getPosts( 'posts', args );

});

statham.controller('StathamPrimaryNavCtrl', function($scope, $http) {

});