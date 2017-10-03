'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:MiPerfilCtrl
 * @description
 * # MiperfilCtrl
 * Controller of the ideastechoApp
 */

angular.module('ideastechoApp')
 	.controller('MiPerfilCtrl', function ( $scope, $timeout, $rootScope, $localStorage, image, users, catalog, paises ) {

 		$scope.usuario = {};

        $scope.paises = paises;
        $scope.estados = [];

        $scope.estadosDisabled = true;

 		if ($localStorage.user) {
 			users.getDonadorData($localStorage.user.id).then(
	 			function(data){
	 				$scope.usuario = data;
                    if (data.avatar_path != '') {
                        $scope.userAvatar = data.avatar_path;    
                    };
	 			});
 		}

        $scope.$watch('usuario.pais_id', function() {
            if ($scope.usuario.pais_id) {
                $scope.estadosDisabled = true;
                $scope.estados = [];
                catalog.getStateSByCountry($scope.usuario.pais_id).then(
                    function(resStatesByCountryId){
                        $scope.estados = resStatesByCountryId;
                        $scope.estadosDisabled = false;
                    },
                    function(errStatesByCountryId){
                        console.log(errStatesByCountryId);
                    }
                );
            
            }else{
                $scope.estadosDisabled = true;
                $scope.usuario.estado_id = null;
            };
        });

 		$scope.updateDonadorData = function(){
 			if ($localStorage.user) {

                if ($scope.userAvatar && $scope.usuario.avatar_path == '' ) {
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
                $scope.usuario.avatar_path = updateImage;
            };
            users.updateDonadorData(
                $localStorage.user.id, 
                {
                    userid: $localStorage.user.id,
                    nombre: $scope.usuario.nombre,
                    paterno: $scope.usuario.paterno,
                    materno: $scope.usuario.materno,
                    email: $scope.usuario.email,
                    pais_id: $scope.usuario.pais_id,
                    estado_id: $scope.usuario.estado_id,
                    celular: $scope.usuario.celular,
                    tel_fijo: $scope.usuario.tel_fijo,
                    avatar_path: $scope.usuario.avatar_path,
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
                        $scope.usuario = data;
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
            $scope.usuario.avatar_path = '';
        };


});
