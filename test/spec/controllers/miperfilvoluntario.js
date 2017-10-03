'use strict';

describe('Controller: MiperfilvoluntarioCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var MiperfilvoluntarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiperfilvoluntarioCtrl = $controller('MiperfilvoluntarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
