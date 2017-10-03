'use strict';

describe('Controller: ProyectosapoyadosCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var ProyectosapoyadosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProyectosapoyadosCtrl = $controller('ProyectosapoyadosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
