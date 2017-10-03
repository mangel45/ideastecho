'use strict';

describe('Controller: ProyectosCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var ProyectosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProyectosCtrl = $controller('ProyectosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
