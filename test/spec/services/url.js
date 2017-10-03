'use strict';

describe('Service: URL', function () {

  // load the service's module
  beforeEach(module('ideastechoApp'));

  // instantiate service
  var URL;
  beforeEach(inject(function (_URL_) {
    URL = _URL_;
  }));

  it('should do something', function () {
    expect(!!URL).toBe(true);
  });

});
