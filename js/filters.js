// Render as HTML
statham.filter('rawHtml', ['$sce', function($sce){
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);

// Filter an array with an offset
statham.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input) {
        	return input.slice(start);
    	}
    }
});