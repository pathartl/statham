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

statham.animation('.slide-out', [function() {
    return {
        // make note that other events (like addClass/removeClass)
        // have different function input parameters
        enter: function(element, doneFn) {
            $(element).hide();
            doneFn();

        // remember to call doneFn so that angular
        // knows that the animation has concluded
        },

        move: function(element, doneFn) {
            jQuery(element).fadeIn(100, doneFn);
        },

        leave: function(element, doneFn) {
            var panels = $(element).find('.panel');
            panels.each(function(i, panel) {
                $(panel).velocity({
                    translateX: '100vw',
                    opacity: 0
                }, {
                    delay: 100 * i,
                    easing: 'easeOutSine',
                    complete: function() {
                        if (i == (panels.length - 1)) {
                            doneFn();
                        }
                    }
                })
            });
        }
    }
}]);