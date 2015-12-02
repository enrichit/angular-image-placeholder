angular.module('enrichit.angular-image-utils', []);

angular.module('enrichit.angular-image-utils').directive('iuSpinner', [

  '$compile',
  '$http',
  '$templateCache',

  function ($compile, $http, $templateCache) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        loadClass: '@iuLoadClass',
        completeClass: '@iuCompleteClass',
        templateString: '@iuTemplateString',
        templateUrl: '@iuTemplateUrl'
      },
      link: function(scope, element) {
        var loadClass = scope.loadClass || 'iu-load';
        var completeClass = scope.completeClass || 'iu-complete';
        element.addClass(loadClass);

        if (scope.templateString) {
          element.parent().append($compile(scope.templateString)(scope));
        } else if(scope.templateUrl) {
          $http.get(scope.templateUrl, {cache: $templateCache})
            .success(function(response) {
              element.parent().append($compile(response)(scope));
            });
        }

        element.on('load', function() {
          element.addClass(completeClass);
        });
      }
    };
  }
]);

angular.module('enrichit.angular-image-utils').directive('iuSizes', [

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
      restrict: 'A',
      scope: {
        x: '@iuWidth',
        y: '@iuHeight'
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