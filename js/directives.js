statham.directive('lazyLoad', function () {
    return {
        // Restrict it to be an attribute in this case.
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $scope.$watch('posts', function() {

                $('.img-loader a').click(function(e) {
                    e.preventDefault();
                    $('#lightbox .modal-body').html('<img src="' + $(this).find('img').attr('src') + '">');
                    $('#lightbox').modal('show');
                });

                $('img').unveil(0, function() {
                  $(this).load(function() {
                    this.style.opacity = 1;
                  });
                });

                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });

            });
        }
    }
});