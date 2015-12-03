describe('Unit: iuSpinner directive.', function () {
  var _compile_, _rootScope_, _templateCache_, _httpBackend_;

  beforeEach(module('enrichit.angular-image-utils'));

  beforeEach(module('enrichit.angular-image-utils', function($compileProvider){
    $compileProvider.directive('testIsolated', function() {
      return {
        restrict:'A',
        scope: {}
      };
    });
  }));

  beforeEach(inject(['$rootScope', '$compile', '$templateCache', '$httpBackend', function ($rootScope, $compile, $templateCache, $httpBackend) {
    _compile_ = $compile;
    _rootScope_ = $rootScope;
    _templateCache_ = $templateCache;
    _httpBackend_ = $httpBackend;
  }]));

  beforeEach(function() {
    _httpBackend_.when('GET', 'test.html').respond('<p>Hello</p>');
  });

  it('it exists and test framework is set up correctly', function() {
    $elem = _compile_('<div><img iu-spinner /></div>')(_rootScope_);

    expect($elem.hasClass('iu-load')).toBe(true);
  });
  
  it('does not require an isolatead scope', function() {
    expect(function () {
      _compile_('<div><img iu-spinner test-isolated /></div>')(_rootScope_);
    }).not.toThrow();
  });

  it('adds the correct classes', function() {
    $elem = _compile_('<div><img iu-spinner /></div>')(_rootScope_);
    expect($elem.hasClass('iu-load')).toBe(true);
    expect($elem.hasClass('iu-complete')).toBe(false);
    $elem.find('img').triggerHandler('load');
    expect($elem.hasClass('iu-complete')).toBe(true);
  });
  
  it('adds error classes', function() {
    $elem = _compile_('<div><img iu-spinner /></div>')(_rootScope_);
    $elem.find('img').triggerHandler('error');
    expect($elem.hasClass('iu-error')).toBe(true);
  });
  
  it('can customize error classes', function() {
    $elem = _compile_('<div><img iu-spinner iu-error-class="hodor" /></div>')(_rootScope_);
    $elem.find('img').triggerHandler('error');
    expect($elem.hasClass('hodor')).toBe(true);
  });

  it('allows you to customize the loading class names', function() {
    $elem = _compile_('<div><img iu-spinner iu-load-class="abaloogawoogawoo" iu-complete-class="aflibidybibidybob" /></div>')(_rootScope_);
    $elem.find('img').triggerHandler('load');
    expect($elem.hasClass('iu-load')).toBe(false);
    expect($elem.hasClass('iu-complete')).toBe(false);
    expect($elem.hasClass('abaloogawoogawoo')).toBe(true);
    expect($elem.hasClass('aflibidybibidybob')).toBe(true);
  });

  it('can insert a template as a string to the parent container', function() {
    $elem = _compile_('<div><img iu-spinner iu-template-string="<p>Hello World!</p>" /></div>')(_rootScope_);
    expect($elem.find('p').length).toBe(1);
  });

  it('can load a template string from a file', function() {
    $elem = _compile_('<div><img iu-spinner iu-template-url="test.html" /></div>')(_rootScope_);
    _httpBackend_.flush();
    expect($elem.find('p').length).toBe(1);
  });
});