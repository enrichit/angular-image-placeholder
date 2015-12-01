describe('Unit: pilt directive.', function () {
  var _compile_, _rootScope_;

  beforeEach(module('enrichit.pilt'));

  beforeEach(inject(['$rootScope', '$compile', function ($rootScope, $compile) {
    _compile_ = $compile;
    _rootScope_ = $rootScope;
  }]));

  it('it exists and test framework is set up correctly', function () {
    $elem = _compile_('<img pilt original-width="1024" original-height="768" ng-src="http://lorempixel.com/1000/1000/" />')(_rootScope_);

    expect($elem.attr('width')).toBe('1024');
    expect($elem.attr('height')).toBe('768');
  });

  function createPlaything(containerWidth) {
    var container = document.createElement('div');

    if (containerWidth) {
      container.style.width = containerWidth + 'px';
    }

    var img = document.createElement('img');

    img.setAttribute('pilt', '');
    img.setAttribute('original-width', '1024');
    img.setAttribute('original-height', '768');

    container.appendChild(img);

    angular.element(document).find('body').append(container);

    return container;
  }

  it('doesn\'t resize when container is bigger than it', function () {
    var plaything = createPlaything(2000);

    var $elem = _compile_(plaything)(_rootScope_);
    var $image = $elem.find('img');

    expect($image.attr('width')).toBe('1024');
    expect($image.attr('height')).toBe('768');
  });

  it('resizes when parent container is smaller than original height', function () {
    var plaything = createPlaything(500);

    var $elem = _compile_(plaything)(_rootScope_);
    var $image = $elem.find('img');

    expect($image.attr('width')).toBe('500');
    expect($image.attr('height')).toBe('375');
  });

  it('doesn\'t throw error when no parent container is found', function () {
    expect(function() {
      _compile_('<img pilt original-width="1024" original-height="768" ng-src="http://lorempixel.com/1000/1000/" />')(_rootScope_);
    }).not.toThrow();
  });
})