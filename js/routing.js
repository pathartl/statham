statham.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when(
			"/",
				{
					templateUrl: 'partials/archive.html',
					controller: 'StathamArchiveCtrl'
				}
		)
		.when(
			"/page/:page",
				{
					templateUrl: 'partials/archive.html',
					controller: 'StathamArchiveCtrl'
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
		.when(
			"/category/:category",
				{
					templateUrl: 'partials/archive.html',
					controller: 'StathamArchiveCtrl'
				}
		)
		.otherwise(
			{
				redirectTo: "/"
			}
		);

	$locationProvider.html5Mode(true);
});