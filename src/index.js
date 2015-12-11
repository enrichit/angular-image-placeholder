angular.module('enrichit.angular-image-utils', []);

angular.module('enrichit.angular-image-utils').directive('iuSpinner', [

  '$document',
  '$compile',
  '$http',
  '$templateCache',

  function ($document, $compile, $http, $templateCache) {
    'use strict';

    function parentsUntil(element, targetSelector) {
      var $targets = $document.find(targetSelector);
      while (element.parentNode) {
        for (var i in $targets) {
          if ($targets[i] === element) {
            return $targets[i];
          }
        }

        element = element.parentNode;
      }
    }
    
    function getParent(element, targetSelector) {
      if (targetSelector) {
        var $lookup = $document.find(parentsUntil(element[0], targetSelector));
        if ($lookup.length) {
          return $lookup;
        }
      }
      
      return element.parent();
    }

    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var parent = getParent(element, attributes.iuParentSelector);
        if ( ! parent) return;

        var loadClass = attributes.iuLoadClass || 'iu-load';
        var completeClass = attributes.iuCompleteClass || 'iu-complete';
        var errorClass = attributes.iuErrorClass || 'iu-error';

        parent.addClass(loadClass);

        var spinnerContainer = getParent(element, attributes.iuSpinnerContainer);

        if (attributes.iuTemplateString) {
          spinnerContainer.append($compile(attributes.iuTemplateString)(scope));
        } else if(attributes.iuTemplateUrl) {
          $http.get(attributes.iuTemplateUrl, { cache: $templateCache })
            .success(function(response) {
              spinnerContainer.append($compile(response)(scope));
            });
        }

        element
          .on('load', function() {
            parent.addClass(completeClass);
          })
          .on('error', function() {
            parent.addClass(errorClass);
            
            if (attributes.iuErrorReplaceString) {
              element.replaceWith($compile(attributes.iuErrorReplaceString)(scope));
            } else if(attributes.iuErrorReplaceUrl) {
              $http.get(attributes.iuErrorReplaceUrl, { cache: $templateCache })
                .success(function(response) {
                  element.replaceWith($compile(response)(scope));
                });
            }
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
    
    function getComputedWidth(element) {
      var style;
 
      try {
        style = window.getComputedStyle(element, null).getPropertyValue('width');
      } catch(e) {
        style = element.currentStyle.height;
      }
      
      return parseInt(style);
    }

    function setAttributes(element, x, y, scaleUp) {
      return function() {
        var width = x, height = y;
  
        var parent = element[0].parentElement;
  
        if (parent) {
          var computedWidth = getComputedWidth(parent);
          if (computedWidth < x || scaleUp === true) {
            width = computedWidth;
            height = (computedWidth / x) * y;
          }
        }
  
        element.attr('width', width);
        element.attr('height', height);
      };
    }

    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var x = parseInt(attributes.iuWidth);
        var y = parseInt(attributes.iuHeight);
        var scaleUp = Boolean(attributes.iuScaleUp);

        var scaleFn = setAttributes(element, x, y, scaleUp);
        scaleFn();

        resizeCallbacks.push(function() {
          scaleFn();
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