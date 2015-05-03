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