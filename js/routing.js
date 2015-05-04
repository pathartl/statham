statham.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when(
			"/",
				{
					templateUrl: 'partials/archive.html',
					controller: 'StathamHomeCtrl'
				}
		)
		.when(
			"/page/:page",
				{
					templateUrl: 'partials/archive.html',
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
		.when(
			"/search/:query",
				{
					templateUrl: 'partials/archive.html',
					controller: 'StathamSearchCtrl'
				}
		)
		.otherwise(
			{
				redirectTo: "/"
			}
		);

	$locationProvider.html5Mode(true);
});