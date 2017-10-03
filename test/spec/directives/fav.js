'use strict';

describe('Directive: fav', function () {

  // load the directive's module
  beforeEach(module('ideastechoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fav></fav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fav directive');
  }));
});
