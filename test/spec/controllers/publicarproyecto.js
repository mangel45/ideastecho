'use strict';

describe('Controller: PublicarproyectoCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var PublicarproyectoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicarproyectoCtrl = $controller('PublicarproyectoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
