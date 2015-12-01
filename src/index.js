angular.module('enrichit.pilt', []);

angular.module('enrichit.pilt').directive('pilt', [
  function () {
    'use strict';

    return {
      scope: {
        x: '@originalWidth',
        Y: '@originalHeight',
      },
      link: function(scope, element) {
        element.attr('width', scope.x);
        element.attr('height', scope.y);
      }
    };
  }
]);