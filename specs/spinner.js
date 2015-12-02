describe('Unit: placeholderSpinner directive.', function () {
  var _compile_, _rootScope_;

  beforeEach(module('enrichit.ng-image-utils'));

  beforeEach(inject(['$rootScope', '$compile', function ($rootScope, $compile) {
    _compile_ = $compile;
    _rootScope_ = $rootScope;
  }]));

  it('it exists and test framework is set up correctly', function() {
    $elem = _compile_('<img placeholder-spinner />')(_rootScope_);

    expect($elem.hasClass('ps-load')).toBe(true);
  });

  it('adds the correct classes', function() {
    $elem = _compile_('<img placeholder-spinner />')(_rootScope_);
    expect($elem.hasClass('ps-load')).toBe(true);
    expect($elem.hasClass('ps-complete')).toBe(false);
    $elem.triggerHandler('load');
    expect($elem.hasClass('ps-complete')).toBe(true);
  });

  it('allows you to customize the loading class names', function() {
    $elem = _compile_('<img placeholder-spinner ps-load-class="abaloogawoogawoo" ps-complete-class="aflibidybibidybob" />')(_rootScope_);
    $elem.triggerHandler('load');
    expect($elem.hasClass('ps-load')).toBe(false);
    expect($elem.hasClass('ps-complete')).toBe(false);
    expect($elem.hasClass('abaloogawoogawoo')).toBe(true);
    expect($elem.hasClass('aflibidybibidybob')).toBe(true);
  });

  it('can insert a template as a string to the parent container', function() {
    $elem = _compile_('<div><img placeholder-spinner ps-template-string="<p>Hello World!</p>" /></div>')(_rootScope_);
    expect($elem.find('p').length).toBe(1);
  });
});