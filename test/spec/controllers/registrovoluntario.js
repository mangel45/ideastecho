'use strict';

describe('Controller: RegistrovoluntarioCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var RegistrovoluntarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrovoluntarioCtrl = $controller('RegistrovoluntarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
