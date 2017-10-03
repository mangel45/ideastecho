'use strict';

describe('Controller: RegistroempresaCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var RegistroempresaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistroempresaCtrl = $controller('RegistroempresaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
