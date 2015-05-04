statham.directive('lazyLoad', function () {
    return {
        // Restrict it to be an attribute in this case.
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $scope.$watch('posts', function() {
                $('img').unveil(0, function() {
                  $(this).load(function() {
                    this.style.opacity = 1;
                  });
                });
            });
        }
    }
});