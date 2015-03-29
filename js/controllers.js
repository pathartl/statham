var statham = angular.module('statham', ['ngRoute']);

var $html = {};

statham.controller('StathamMainCtrl', function($scope, $http) {

	$scope.site = {};
    
	$http.get('https://pathar.tl/wp-json').
		success(function(data, status) {
			$scope.site.info = data;
		});

	http = $http;

});

statham.controller('StathamHomeCtrl', function($scope, $http) {

	http.jsonp('http://pathar.tl/wp-json/posts?_jsonp=JSON_CALLBACK').
		success(function(data, status) {
			$scope.posts = data;
		});

});

statham.controller('StathamSingleCtrl', function($scope, $http, $routeParams) {

	$scope.slug = $routeParams.slug;

	http.jsonp('http://pathar.tl/wp-json/posts?filter[name]=' + $routeParams.slug + '&_jsonp=JSON_CALLBACK').
	 	success(function(data, status) {
	 		$scope.post = data[0];
	 	});

});

statham.filter('rawHtml', ['$sce', function($sce){
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);

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

function getPosts($scope, url) {
	
	http.jsonp(url).success(function(data, status) {
		return data;
	});

}