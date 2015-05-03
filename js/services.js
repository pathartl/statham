// Main WordPress GET service
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

				if (key != 'comments') {
					filters += '&filter[' + key + ']=' + args[key];
				}
			});
		}

		$http.jsonp( site_url + '/wp-json/' + route + callback + filters ).success(function(data) {
			$rootScope.posts = data;

			if ( args.comments == true ) {

				$rootScope.comments = [];

				data.forEach(function(post, i) {

					$http.jsonp( site_url + '/wp-json/posts/' + post.ID + '/comments?_jsonp=JSON_CALLBACK' ).success(function(comments) {
						$rootScope.comments = $rootScope.comments.concat(comments);
						console.log($rootScope.comments);
					});

				});
			}
		});

	};

  	return wordpress;
});