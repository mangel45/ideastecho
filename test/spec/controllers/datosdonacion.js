'use strict';

describe('Controller: DatosdonacionCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var DatosdonacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatosdonacionCtrl = $controller('DatosdonacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
