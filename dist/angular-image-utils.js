angular.module('enrichit.angular-image-utils', []);

angular.module('enrichit.angular-image-utils').directive('iuSpinner', [

  '$compile',
  '$http',
  '$templateCache',

  function ($compile, $http, $templateCache) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var parent = element.parent();
        if (!parent) return;

        var loadClass = attributes.iuLoadClass || 'iu-load';
        var completeClass = attributes.iuCompleteClass || 'iu-complete';

        parent.addClass(loadClass);

        if (attributes.iuTemplateString) {
          parent.append($compile(attributes.iuTemplateString)(scope));
        } else if(attributes.iuTemplateUrl) {
          $http.get(attributes.iuTemplateUrl, {cache: $templateCache})
            .success(function(response) {
              parent.append($compile(response)(scope));
            });
        }

        element.on('load', function() {
          parent.addClass(completeClass);
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
      link: function(scope, element, attributes) {
        var x = parseInt(attributes.iuWidth);
        var y = parseInt(attributes.iuHeight);

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