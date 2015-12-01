angular.module('enrichit.pilt', []);

angular.module('enrichit.pilt').directive('pilt', [
  function () {
    'use strict';

    return {
      scope: {
        x: '@originalWidth',
        y: '@originalHeight'
      },
      link: function(scope, element) {
        var x = parseInt(scope.x);
        var y = parseInt(scope.y);

        var width = x, height = y;

        var parent = element[0].parentElement;

        // if parent width is less than original width then rescale
        if (parent && parent.offsetWidth < x) {
          width = parent.offsetWidth;
          height = (parent.offsetWidth / x) * y;
        }

        element.attr('width', width);
        element.attr('height', height);
      }
    };
  }
]);