'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:ProyectosCtrl
 * @description
 * # ProyectosCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('ProyectosCtrl', function ($scope, $filter, $state, $localStorage, $rootScope, $stateParams, ngMeta, auth, project, proyectos, paises, estados, categorias) {

    $scope.accessLevels = auth.accessLevels;

    //console.log(proyectos);
    $scope.filtroTitleText = '';
    
    $scope.estados = estados;

    $scope.filterProyectos = [];

    $scope.pathToProyecto = $state.href('publico.proyecto', {}, {absolute: true});

    $scope.visualizarEtiquetas = false;

    ngMeta.setTitle('Ideas TECHO', ' | Proyectos');

    function initialFilterProyectos(){
      if ($localStorage.user) {
          $scope.userid = $localStorage.user.id;

          if ($stateParams.usuario) { //Trae los proyectos del usuario que viene en la URL.
            var ownedProyectos = [];
            angular.forEach(proyectos, function(proyecto){
              if (proyecto.userid == Number($stateParams.usuario)) {
                ownedProyectos.push(proyecto);
              }
            });
            
            if ($scope.userid == $stateParams.usuario) { //Trae también los borradores y rechazados.
              $scope.allProyectos = ownedProyectos;
              $scope.filtroTitleText = 'Mis proyectos';
              $scope.visualizarEtiquetas = true;
            } else {
              $scope.allProyectos = getAutorizados(ownedProyectos);
            }
          }else{
            $scope.allProyectos = getAutorizados(proyectos);
          } 
      } else {
        $scope.allProyectos = getAutorizados(proyectos);
      };
    }

    initialFilterProyectos();

    var todayDateObj = new Date();
    $scope.todayDate = todayDateObj.toISOString();

    $scope.rectaFinalDate = addDays(todayDateObj, 20);

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date.toISOString();
    }

    //console.log('$stateParams: ', $stateParams);

    function getAutorizados(proyectosArray){
      var autorizadosProyectos = [];
        angular.forEach(proyectosArray, function(proyecto){
          if (proyecto.borrador == false && proyecto.estatus == true) {
            //console.log('Proyecto AUTORIZADO!!');
            autorizadosProyectos.push(proyecto);
          }
        });
        return autorizadosProyectos;
    }

    // NOMBRE DE PROYECTO

    $scope.filterNombre = '';

    if( $stateParams.nombre ){
      $scope.filterNombre = $stateParams.nombre;
    }

    // LUGAR 

    $scope.paises = paises;

    $scope.filterPais = $stateParams.lugar == 0 ? 0 : $stateParams.lugar;

    // INTERACCIÓN

    $scope.quitarInteraccion = false;

    $scope.proyectosFavoritos = [];
    $scope.proyectosApoyados = [];
    
    function getFavoritos(){
      project.isFav($scope.userid).then(
        function(resFavoritos){
          angular.forEach(resFavoritos, function(proyecto){
            //$scope.proyectosFavoritos.push(proyecto.proyectoid);
            $scope.filterProyectos.push(proyecto.proyectoid) //Push solo si no está agregado
            return;
          });
          console.log($scope.filterProyectos);
          //pushFavoritos();
        },
        function(errFavoritos){
          console.log(errFavoritos);
        }
      );
    };

    function getApoyados(){
      angular.forEach($scope.allProyectos, function(originalProyecto){
        project.getDonantes(originalProyecto.proyectoid).then(
          function(resDonadores){

          },
          function(errDonadores){

          }
        );
      });
    };


    $scope.$watch('interaccionFilter', function(){
      switch($scope.interaccionFilter){
        case 'favoritos':
          getFavoritos();
          $scope.quitarInteraccion = true;
          $scope.filterFavorite = true;
        break;
        case 'apoyados':
          $scope.quitarInteraccion = true;
          $scope.filterFavorite = null;
        break;
      }
    });

    $scope.quitarFiltroInteraccion = function(){
      $scope.quitarInteraccion = false;
      $scope.filterFavorite = null;
      $scope.interaccionFilter = null;
      $scope.filterProyectos = [];
    };
    

    // CATEGORÍA

    $scope.categorias = categorias;
    $scope.filterCategoria = [1, 2, 3, 4, 5, 6, 7];
    $scope.selectedCategoria = [];

    $scope.categoriaToggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        $scope.selectedCategoria.push(item);
      }
      setFilterCategoria($scope.selectedCategoria);
    };

    $scope.isChecked = function() {
      return $scope.selectedCategoria.length === $scope.categorias.length;
    };

    $scope.toggleAllCategorias = function() {
      if ($scope.selectedCategoria.length === $scope.categorias.length) {
        $scope.selectedCategoria = [];
      } else if ($scope.selectedCategoria.length === 0 || $scope.selectedCategoria.length > 0) {
        $scope.selectedCategoria = $scope.categorias.slice(0);
      }
      setFilterCategoria($scope.selectedCategoria);
    };

    $scope.categoriaExists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function() {
      return ($scope.selectedCategoria.length !== 0 &&
          $scope.selectedCategoria.length !== $scope.categorias.length);
    };

    $scope.toggleAllCategorias();

    function setFilterCategoria(categoriasObj) {
      $scope.filterCategoria = [];
      angular.forEach(categoriasObj, function(categoria){
        $scope.filterCategoria.push(categoria.id);
      });
    }

    // STATUS

    $scope.quitarStatus = false;

    $scope.$watch('statusFilter', function(){
      console.log('Filtrar: ', $scope.statusFilter);
      switch($scope.statusFilter){
        case 'popular':
          $scope.quitarStatus = true;
          angular.forEach($scope.allProyectos, function(proyecto){

          });
        break;
        case 'rectafinal':
          $scope.quitarStatus = true;
          //console.log($scope.rectaFinalDate);
          var proyectosRectaFinal = [];
          angular.forEach($scope.allProyectos, function(proyecto){
            if ($scope.rectaFinalDate > proyecto.fechafin && $scope.todayDate < proyecto.fechafin) {
              //console.log('Este proyecto está en RECTA FINAL: ', proyecto);
              proyectosRectaFinal.push(proyecto);
            }
          });
          $scope.allProyectos = proyectosRectaFinal;
        break;
        case 'aliados':
          $scope.quitarStatus = true;
          angular.forEach($scope.allProyectos, function(proyecto){
            
          });
        break;
      }
    });

    $scope.quitarFiltroStatus = function(){
      $scope.quitarStatus = false;
      $scope.statusFilter = '';
      initialFilterProyectos();
    }

   
    $scope.sonMillones = function(_monto){
      if (_monto > 999999) {
        return 'title-sm-text';
      }
    }

  });
