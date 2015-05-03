var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

statham.controller('StathamMainCtrl', function($scope, $http, $routeParams) {

	$scope.site = {};

	$scope.postsPerPage = 3;
    
	$http.get('https://pathar.tl/wp-json').
		success(function(data, status) {
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

	wordpress.getPosts('posts');

});

statham.controller('StathamSingleCtrl', function($scope, $routeParams, wordpress) {

	$scope.slug = $routeParams.slug;

	wordpress.getPosts( 'posts?filter[name]=' + $routeParams.slug );

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
	wordpress.getPosts = function(route) {

		var callback;

		if (route.indexOf('?') >= 0) {
			callback = '&_jsonp=JSON_CALLBACK';
		} else {
			callback = '?_jsonp=JSON_CALLBACK';
		}

		$http.jsonp( site_url + '/wp-json/' + route + callback + '&filter[posts_per_page]=-1' ).success(function(data) {
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