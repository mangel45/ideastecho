'use strict';

describe('Controller: ConfigurarcuentaCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var ConfigurarcuentaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigurarcuentaCtrl = $controller('ConfigurarcuentaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfigurarcuentaCtrl.awesomeThings.length).toBe(3);
  });
});
