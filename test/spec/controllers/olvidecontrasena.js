'use strict';

describe('Controller: OlvidecontrasenaCtrl', function () {

  // load the controller's module
  beforeEach(module('ideastechoApp'));

  var OlvidecontrasenaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OlvidecontrasenaCtrl = $controller('OlvidecontrasenaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OlvidecontrasenaCtrl.awesomeThings.length).toBe(3);
  });
});
