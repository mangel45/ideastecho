'use strict';

describe('Controller: MiperfilempresaCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var MiperfilempresaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiperfilempresaCtrl = $controller('MiperfilempresaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
