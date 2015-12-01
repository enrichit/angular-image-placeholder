describe('Unit: pilt directive', function () {
  var $elem;

  beforeEach(module('enrichit.pilt'));

  it('it exists and test framework is set up correctly', inject([

    '$rootScope',
    '$compile',

    function ($rootScope, $compile) {
      $elem = $compile('<img pilt original-width="1024" original-height="768" ng-src="http://lorempixel.com/1000/1000/" />')($rootScope);

      $rootScope.$digest();

      expect($elem.attr('width')).toBe('1024');
      expect($elem.attr('height')).toBe('768');
    }
  ]));

  // it('doesn\'t resize when container is bigger than it', function() {
  // });
})