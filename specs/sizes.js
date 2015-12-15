describe('Unit: iuSizes directive.', function () {
  var _compile_, _rootScope_, _window_;

  function createPlaything(containerWidth, padding, optionalImagecssibutes) {
    var container = document.createElement('div');

    if (containerWidth) {
      container.style.width = containerWidth + 'px';
    }
    
    if (padding) {
      container.style.padding = padding + 'px';
    }

    var img = document.createElement('img');

    img.setAttribute('iu-sizes', '');
    img.setAttribute('iu-width', '1024');
    img.setAttribute('iu-height', '768');

    optionalImagecssibutes = optionalImagecssibutes || {};
    for (var css in optionalImagecssibutes) {
      img.setAttribute(css, optionalImagecssibutes[css]);
    }

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

    expect($elem.css('width')).toBe('1024px');
    expect($elem.css('height')).toBe('768px');
  });
  
  it('does not require an isolatead scope', function() {
    expect(function () {
      _compile_('<div><img iu-sizes test-isolated /></div>')(_rootScope_);
    }).not.toThrow();
  });

  it('doesn\'t resize when container is bigger than it', function () {
    var $image = createPlaything(2000).find('img');
    expect($image.css('width')).toBe('1024px');
    expect($image.css('height')).toBe('768px');
  });

  it('resizes when parent container is smaller than original height', function () {
    var $image = createPlaything(500).find('img');
    expect($image.css('width')).toBe('500px');
    expect($image.css('height')).toBe('375px');
  });

  it('doesn\'t throw error when no parent container is found', function () {
    expect(function() {
      _compile_('<img iu-sizes iu-width="1024" iu-height="768" ng-src="http://lorempixel.com/1000/1000/" />')(_rootScope_);
    }).not.toThrow();
  });

  it('removes width and height after image loads', function () {
    var $image = createPlaything(2000).find('img');
    $image.triggerHandler('load');

    expect($image.css('width')).toBe('0px');
    expect($image.css('height')).toBe('0px');
  });

  it('adjusts as you resize the container when loading', function() {
    var $plaything = createPlaything(2000);
    var $image = $plaything.find('img');

    $plaything[0].style.width = '500px';
    angular.element(_window_).triggerHandler('resize');

    expect($image.css('width')).toBe('500px');
    expect($image.css('height')).toBe('375px');
  });
  
  it('ignores padding of parent element', function() {
    var $plaything = createPlaything(500, 10);
    var $image = $plaything.find('img');

    expect($image.css('width')).toBe('500px');
    expect($image.css('height')).toBe('375px');
  });
  
  it('allows you to set scale up with option when container is larger than element', function() {
    var $image = createPlaything(2000, 0, {
      'iu-scale-up': 'true'
    }).find('img');

    expect($image.css('width')).toBe('2000px');
    expect($image.css('height')).toBe('1500px');
  });

  it('it can trigger load on parent elements', function () {
    var $elem = _compile_('<div iu-sizes iu-width="1024" iu-height="768"><img iu-image-element ng-src="http://lorempixel.com/1000/1000/" /></div>')(_rootScope_);

    expect($elem.css('width')).toBe('1024px');
    expect($elem.css('height')).toBe('768px');

    $elem.find('img').trigger('load');

    expect($elem.css('width')).toBe('0px');
    expect($elem.css('height')).toBe('0px');
  });
});