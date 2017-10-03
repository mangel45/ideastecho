'use strict';

describe('Filter: filterMultiple', function () {

  // load the filter's module
  beforeEach(module('ideastechoApp'));

  // initialize a new instance of the filter before each test
  var filterMultiple;
  beforeEach(inject(function ($filter) {
    filterMultiple = $filter('filterMultiple');
  }));

  it('should return the input prefixed with "filterMultiple filter:"', function () {
    var text = 'angularjs';
    expect(filterMultiple(text)).toBe('filterMultiple filter: ' + text);
  });

});
