'use strict';

describe('Controller: GraciasCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var GraciasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GraciasCtrl = $controller('GraciasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
