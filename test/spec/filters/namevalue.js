'use strict';

describe('Filter: namevalue', function () {

  // load the filter's module
  beforeEach(module('ideastechoApp'));

  // initialize a new instance of the filter before each test
  var namevalue;
  beforeEach(inject(function ($filter) {
    namevalue = $filter('namevalue');
  }));

  it('should return the input prefixed with "namevalue filter:"', function () {
    var text = 'angularjs';
    expect(namevalue(text)).toBe('namevalue filter: ' + text);
  });

});
