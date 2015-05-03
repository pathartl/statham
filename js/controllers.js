var statham = angular.module('statham', ['ngRoute']);

var http = {};

var site_url = 'https://pathar.tl';

statham.controller('StathamMainCtrl', function($scope, $http) {

	$scope.site = {};
    
	$http.get('https://pathar.tl/wp-json').
		success(function(data, status) {
			$scope.site.info = data;
		});

});

statham.controller('StathamHomeCtrl', function($scope, $http, wordpress) {

	wordpress.getPosts('posts');

});

statham.controller('StathamSingleCtrl', function($scope, $http, $routeParams) {

	$scope.slug = $routeParams.slug;

	// http.jsonp('http://pathar.tl/wp-json/posts?filter[name]=' + $routeParams.slug + '&_jsonp=JSON_CALLBACK').
	//  	success(function(data, status) {
	//  		$scope.post = data[0];
	//  	});

});

statham.controller('StathamPrimaryNavCtrl', function($scope, $http) {

});

statham.filter('rawHtml', ['$sce', function($sce){
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);

statham.factory('wordpress', function($http, $rootScope) {

	var wordpress = {};
	wordpress.getPosts = function(route) {

		var callback;

		if (route.indexOf('?') >= 0) {
			callback = '&_jsonp=JSON_CALLBACK';
		} else {
			callback = '?_jsonp=JSON_CALLBACK';
		}

		$http.jsonp( site_url + '/wp-json/' + route + callback ).success(function(data) {
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