var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

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

statham.controller('StathamHomeCtrl', function($scope, wordpress, $routeParams) {

	if ( $routeParams.page > 0 ) {
		$scope.currentPage = $routeParams.page - 1;
	} else {
		$scope.currentPage = 0;
	}

	wordpress.getPosts('posts', {'posts_per_page': -1});

});

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

statham.filter('rawHtml', ['$sce', function($sce){
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);

statham.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input) {
        	return input.slice(start);
    	}
    }
});

statham.factory('wordpress', function($http, $rootScope) {

	var wordpress = {};
	wordpress.getPosts = function(route, args) {

		var callback;

		if (route.indexOf('?') >= 0) {
			callback = '&_jsonp=JSON_CALLBACK';
		} else {
			callback = '?_jsonp=JSON_CALLBACK';
		}

		var filters = '';

		if (args) {
			argKeys = Object.keys(args);

			argKeys.forEach(function(key, i) {
				filters += '&filter[' + key + ']=' + args[key];
			});
		}

		$http.jsonp( site_url + '/wp-json/' + route + callback + filters ).success(function(data) {
			$rootScope.posts = data;
		});

	};

  	return wordpress;
});

statham.config(function($routeProvider) {
		$routeProvider
			.when(
				"/",
					{
						templateUrl: 'partials/front-page.html',
						controller: 'StathamHomeCtrl'
					}
			)
			.when(
				"/page/:page",
					{
						templateUrl: 'partials/front-page.html',
						controller: 'StathamHomeCtrl'
					}
			)
			.when(
				"/posts/:slug",
					{
						templateUrl: 'partials/single.html',
						controller: 'StathamSingleCtrl'
					}
			)
			.otherwise(
				{
					redirectTo: "/"
				}
			);
	});