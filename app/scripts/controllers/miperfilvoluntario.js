'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:MiperfilvoluntarioCtrl
 * @description
 * # MiperfilvoluntarioCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('MiPerfilVoluntarioCtrl', function ( $scope, $timeout, $rootScope, $localStorage, image, users, paises, areas, oficinas ) {
    	$scope.voluntario = {};

        $scope.paises = paises;
        $scope.areas = areas;
        $scope.oficinas = oficinas;

 		if ($localStorage.user) {
 			users.getVoluntarioData($localStorage.user.id).then(
	 			function(data){
	 				$scope.voluntario = data;
                    if (data.avatar_path != '') {
                        $scope.userAvatar = data.avatar_path;    
                    };
	 			});
 		}

 		$scope.updateVoluntarioData = function(){
 			if ($localStorage.user) {

                if ($scope.userAvatar && $scope.voluntario.avatar_path == '' ) {
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
                $scope.voluntario.avatar_path = updateImage;
            };
            users.updateVoluntarioData(
                $localStorage.user.id, 
                {
                    userid: $localStorage.user.id,
                    nombre: $scope.voluntario.nombre,
                    paterno: $scope.voluntario.paterno,
                    materno: $scope.voluntario.materno,
                    email: $scope.voluntario.email,
                    cuentanosdeti: $scope.voluntario.cuentanosdeti,
                    areatecho: $scope.voluntario.areatecho,
                    oficinatecho: $scope.voluntario.oficinatecho,
                    pais_id: $scope.voluntario.pais_id,
                    celular: $scope.voluntario.celular,
                    tel_fijo: $scope.voluntario.tel_fijo,
                    avatar_path: $scope.voluntario.avatar_path,
                    newsletter: true,
                    estatus: true,
                    aprovado: 1,
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
                        $scope.voluntario = data;
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
            $scope.voluntario.avatar_path = '';
        };
});
