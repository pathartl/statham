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

				if (key != 'comments' || key != 'more_tag') {
					filters += '&filter[' + key + ']=' + args[key];
				}
			});
		}

		$http.jsonp( site_url + '/wp-json/' + route + callback + filters ).success(function(data) {

			$rootScope.comments = [];

			data.forEach(function(post, i) {

				if ( args.comments == true ) {

					// Grab comments and add them to scope if we make an arg for it
					$http.jsonp( site_url + '/wp-json/posts/' + post.ID + '/comments?_jsonp=JSON_CALLBACK' ).success(function(comments) {
						$rootScope.comments = $rootScope.comments.concat(comments);
						console.log($rootScope.comments);
					});

				}

				if ( args.more_tag == true ) {

					var moreIndex = post.content.indexOf('<!--more-->');

					if (moreIndex > 0) {
						post.content = post.content.substring(0, moreIndex);
					}

				}

			});

			$rootScope.posts = data;

		});

	};

  	return wordpress;
});