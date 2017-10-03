'use strict';

describe('Controller: ProyectoCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var ProyectoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProyectoCtrl = $controller('ProyectoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
