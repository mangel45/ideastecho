'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:PruebasCtrl
 * @description
 * # PruebasCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('PruebasCtrl', function ($scope, project, catalog) {

  	$scope.imagenData = {
  		proyectoid: 1,
  		imagen: null,
	    creado_usuario_id: 1,
	    modificado_usuario_id: 1
  	}

  	$scope.$watch('imagenData.imagen', function() {
  		console.log('Cambio en la imagen!');
        console.log($scope.imagenData.imagen);
    });

  	$scope.uploadImage = function () {

  		var formData = new FormData();
        formData.append("proyectoid", $scope.imagenData.proyectoid);
        formData.append('imagen', $scope.imagenData.imagen);
        formData.append('creado_usuario_id', $scope.imagenData.creado_usuario_id);
        formData.append('modificado_usuario_id', $scope.imagenData.modificado_usuario_id);
  		
  		project.setImagenEquipoProyecto(formData).then(
  			function(resImagen){
				console.log(resImagen);
  			},
  			function(errImagen){
				console.log(errImagen);
  			}
  		);
		
    };

    $scope.setFile = function (element) {
      $scope.currentFile = element.files[0];
      $scope.imagenData.imagen = $scope.currentFile;
      var reader = new FileReader();

      reader.onload = function (event) {
        $scope.image_source = event.target.result;
        $scope.$apply();
      }
      reader.readAsDataURL(element.files[0]);
    };

    $scope.updateProyecto = function(id){
      project.getProyecto(id).then(

        function(resProyecto){
          var updatedProyecto = resProyecto;

          updatedProyecto.autor = 'Space X';
          updatedProyecto.userid = 2;

          project.updateProyecto(updatedProyecto).then(
            function(resUpdated){
              console.log(resUpdated);
            },
            function(errUpdated){
              console.log(errUpdated);
            }
          );
        }, 
        function(errProyecto){
          console.log(errProyecto);
        }
      );
      
    };


    $scope.deleteEstado = function(id) {
      catalog.deleteState(id).then(
        function(resDeleteState){
          console.log('Borrado Exitoso!');
          console.log(resDeleteState);
        },
        function(errDeleteState){
          console.log('No se pudo borrar :(');
          console.log(errDeleteState);
        }
      );
    };

  });
