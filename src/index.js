angular.module('enrichit.ng-image-utils', []);

angular.module('enrichit.ng-image-utils').directive('placeholderSizes', [

  '$window',

  function ($window) {
    'use strict';

    var resizeCallbacks = [];
    angular.element($window).on('resize', function() {
      resizeCallbacks.forEach(function(c) {
        if (c instanceof Function) c();
      });
    });

    function setAttributes(element, x, y) {
      var width = x, height = y;

      var parent = element[0].parentElement;

      if (parent && parent.offsetWidth < x) {
        width = parent.offsetWidth;
        height = (parent.offsetWidth / x) * y;
      }

      element.attr('width', width);
      element.attr('height', height);
    }

    return {
      scope: {
        x: '@psWidth',
        y: '@psHeight'
      },
      link: function(scope, element) {
        var x = parseInt(scope.x);
        var y = parseInt(scope.y);

        setAttributes(element, x, y);

        resizeCallbacks.push(function() {
          setAttributes(element, x, y);
        });

        var index = resizeCallbacks.length - 1;

        element.on('load', function() {
          element.removeAttr('width');
          element.removeAttr('height');

          resizeCallbacks[index] = null;
        });
      }
    };
  }
]);