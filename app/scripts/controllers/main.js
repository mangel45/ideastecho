'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('MainCtrl', function ($scope, $state, $localStorage, $rootScope, proyectos, project, auth) {
  	
    $scope.accessLevels = auth.accessLevels;

    if ($localStorage.user) {
      $scope.userid = $localStorage.user.id;
    };

    $scope.sonMillones = function(_monto){
      if (_monto > 999999) {
        return 'title-sm-text';
      }
    }

    //TABS

    $scope.gotoProyectos = function(){
      $state.go('publico.proyectos');
    };

    //PROYECTOS

    /*Operaciones con fechas: */

    var todayDateObj = new Date();
    $scope.todayDate = todayDateObj.toISOString();

    $scope.rectaFinalDate = addDays(todayDateObj, 20);

    //console.log('Recta Final Date: ', $scope.rectaFinalDate);

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date.toISOString();
    }

    $scope.allProyectos = getAutorizados(proyectos);
    $scope.rectaFinalProyectos = getRectaFinal(proyectos);

    if ($scope.allProyectos.length <= 0) {
      $rootScope.alerta = 'No se encontraron proyectos.';
    };

    $scope.pathToProyecto = $state.href('publico.proyecto', {}, {absolute: true});

    /*Funciones de filtrado*/

    function getAutorizados(proyectosArray){
      var autorizadosProyectos = [];
      angular.forEach(proyectosArray, function(proyecto){
        //console.log('P: ', proyecto.fechafin, 'T: ', $scope.todayDate);
        if (proyecto.borrador == false && proyecto.estatus == true && $scope.todayDate < proyecto.fechafin) {
          autorizadosProyectos.push(proyecto);
        }
      });
      return autorizadosProyectos;
    }

    function getRectaFinal(proyectosArray){
      //console.log('Get Recta Final');
      var proyectosRectaFinal = [];
      angular.forEach(proyectosArray, function(proyecto){        
        if ($scope.rectaFinalDate > proyecto.fechafin && proyecto.borrador == false && proyecto.estatus == true && $scope.todayDate < proyecto.fechafin) {
          proyectosRectaFinal.push(proyecto);
        }
      });
      return proyectosRectaFinal;
    }

    function getAliados(){

    }

    function getPopulares(){
      
    }

  });
