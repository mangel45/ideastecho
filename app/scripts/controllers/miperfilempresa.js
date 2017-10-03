'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:MiPerfilEmpresaCtrl
 * @description
 * # MiPerfilEmpresaCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('MiPerfilEmpresaCtrl', function ($scope, $localStorage, $rootScope, image, users) {

  		$scope.empresa = {};

 		if ($localStorage.user) {
 			users.getEmpresaData($localStorage.user.id).then(
	 			function(data){
	 				$scope.empresa = data;
                    if (data.avatar_path != '') {
                        $scope.userAvatar = data.avatar_path;    
                    };
	 			});
 		}

 		$scope.updateEmpresaData = function(){
 			if ($localStorage.user) {

                if ($scope.userAvatar && $scope.empresa.avatar_path == '' ) {
                    var formData = new FormData();
                    formData.append("avatar", $scope.userAvatar);
                    
                    image.setImagenUsuario(formData).then(
                        function(resImagen){
                            console.log('Imagen: ');
                            console.log(resImagen);

                            doUpdate(resImagen);
                        },
                        function(errImagen){
                            console.log('Error: ');
                            console.log(errImagen);
                        }
                    );
                }else{
                    doUpdate();
                };

			}else{
				$rootScope.error = 'No se pudo enlazar la información a tu usuario. Contacta a nuestro equipo.';
			}
        };

        function doUpdate(imagenData){
            var updateImage = '';
            if (imagenData) {
                var updateImage = imagenData.avatar;
                $scope.empresa.avatar_path = updateImage;
            };
            users.updateEmpresaData(
                $localStorage.user.id, 
                {
                    userid: $localStorage.user.id,
                    nombrempresa: $scope.empresa.nombrempresa,
                    nombre: $scope.empresa.nombre,
                    paterno: $scope.empresa.paterno,
                    materno: $scope.empresa.materno,
                    email: $scope.empresa.email,
                    descripcionempresa: $scope.empresa.descripcionempresa,
                    telefono: $scope.empresa.telefono,
                    avatar_path: $scope.empresa.avatar_path,
                    newsletter: true,
                    estatus: true,
                    creado_usuario_id: $localStorage.user.id,
                    modificado_usuario_id: $localStorage.user.id
                }
            ).then(
                function(resDonador){
                    $rootScope.exito = 'Datos actualizados :D';
                },
                function(errDonador){
                    $rootScope.error = 'No se pudo actualizar la información. Intenta de nuevo más tarde';
                }
            );
        }

        $scope.cancelSave = function() {
            if ($localStorage.user) {
                users.getDonadorData($localStorage.user.id).then(
                    function(data){
                        $scope.empresa = data;
                    });
            }
        };
    
        $scope.showAvatar = function (files) {
            console.log('Upload Avatar');
            console.log(files);

            if(files.length == 1){
                $scope.userAvatar = files[0];
                console.log($scope.userAvatar);
            }
        };

        $scope.removeUserAvatar = function() {
            $scope.userAvatar = null;
            $scope.empresa.avatar_path = '';
        };
  });
