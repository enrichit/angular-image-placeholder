describe('Unit: iuSizes directive.', function () {
  var _compile_, _rootScope_, _window_;

  function createPlaything(containerWidth) {
    var container = document.createElement('div');

    if (containerWidth) {
      container.style.width = containerWidth + 'px';
    }

    var img = document.createElement('img');

    img.setAttribute('iu-sizes', '');
    img.setAttribute('iu-width', '1024');
    img.setAttribute('iu-height', '768');

    container.appendChild(img);

    angular.element(document).find('body').append(container);

    return _compile_(container)(_rootScope_);
  }

  beforeEach(module('enrichit.angular-image-utils'));

  beforeEach(module('enrichit.angular-image-utils', function($compileProvider){
    $compileProvider.directive('testIsolated', function() {
      return {
        restrict:'A',
        scope: {}
      };
    });
  }));

  beforeEach(inject(['$rootScope', '$compile', '$window', function ($rootScope, $compile, $window) {
    _compile_ = $compile;
    _rootScope_ = $rootScope;
    _window_ = $window;
  }]));

  it('it exists and test framework is set up correctly', function () {
    $elem = _compile_('<img iu-sizes iu-width="1024" iu-height="768" ng-src="http://lorempixel.com/1000/1000/" />')(_rootScope_);

    expect($elem.attr('width')).toBe('1024');
    expect($elem.attr('height')).toBe('768');
  });
  
  it('does not require an isolatead scope', function() {
    expect(function () {
      _compile_('<div><img iu-sizes test-isolated /></div>')(_rootScope_);
    }).not.toThrow();
  });

  it('doesn\'t resize when container is bigger than it', function () {
    var $image = createPlaything(2000).find('img');
    expect($image.attr('width')).toBe('1024');
    expect($image.attr('height')).toBe('768');
  });

  it('resizes when parent container is smaller than original height', function () {
    var $image = createPlaything(500).find('img');
    expect($image.attr('width')).toBe('500');
    expect($image.attr('height')).toBe('375');
  });

  it('doesn\'t throw error when no parent container is found', function () {
    expect(function() {
      _compile_('<img iu-sizes iu-width="1024" iu-height="768" ng-src="http://lorempixel.com/1000/1000/" />')(_rootScope_);
    }).not.toThrow();
  });

  it('removes width and height after image loads', function () {
    var $image = createPlaything(2000).find('img');
    $image.triggerHandler('load');

    expect($image.attr('width')).toBeUndefined();
    expect($image.attr('height')).toBeUndefined();
  });

  it('adjusts as you resize the container when loading', function() {
    var $plaything = createPlaything(2000);
    var $image = $plaything.find('img');

    $plaything[0].style.width = '500px';
    angular.element(_window_).triggerHandler('resize');

    expect($image.attr('width')).toBe('500');
    expect($image.attr('height')).toBe('375');
  });
});