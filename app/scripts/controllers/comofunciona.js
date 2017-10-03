'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:ComoFuncionaCtrl
 * @description
 * # ComoFuncionaCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('ComoFuncionaCtrl', function ($scope, $rootScope, users, catalog, auth) {
  	
    $scope.setUserDetail = function() {
  		users.setDonadorData(
          2, //ID
          '', //Nombre
          '', //Apellido Paterno
          '', //Apellido Materno
          'daftpunk@aper.net', //Email
          null,//País
          null,//Estado
          '',//Celular
          '', //Teléfono
          null, //Avatar
          true, //Newsletter
          true, //Activo?
          2, //Creado Usuario ID
          2 //Modificado Usuario ID

          ).then(function(donadorData){
            console.log('Donador: ');
            console.log(donadorData);

            //window.location = '/';

        });
      };

    $scope.updateAreaTecho = function() {
      catalog.updateAreaTecho(1, 'Infraestructura', true)
        .then(function(data){
            console.log('Area Actualizada');
            console.log(data);
          });
    };

    $scope.getCurrentUser = function() {
      console.log('USUARIO ACTUAL: ');
      console.log(auth.user);
    };

    $scope.showErrorMessage = function() {
      $rootScope.error = 'Este es un ERROR :\'(!';
    };

    $scope.showWarningMessage = function() {
      $rootScope.alerta = 'Este es un WARNING :| !';
    };

    $scope.showInfoMessage = function() {
      $rootScope.info = 'Este es un INFO !! !';
    };

    $scope.showSuccessMessage = function() {
      $rootScope.exito = 'Este es un ÉXITO :D!';
    };
  });
