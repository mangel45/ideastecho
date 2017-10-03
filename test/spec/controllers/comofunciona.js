'use strict';

describe('Controller: ComofuncionaCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var ComofuncionaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComofuncionaCtrl = $controller('ComofuncionaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
