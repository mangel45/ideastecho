'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ideastechoApp
 */
 angular.module('ideastechoApp')
 .controller('HeaderCtrl', function ($scope, $state, $rootScope, $localStorage, auth, users) {

     $scope.usuario = {};

     $scope.accessLevels = auth.accessLevels;

     if ( $localStorage.token && $localStorage.user ) {
        var userId = $localStorage.user.id;
        $scope.userid = userId;

        users.getRoleByUserId(userId).then(
            function(resRole){
                console.log();
                //HARDCODED: Esto hay que cambiarlo que puede mandar todo a la ....
                switch(resRole.roleid){
                    case 3: //DONADOR
                        users.getDonadorData(userId).then(
                            function(data){
                                $scope.usuario = data;
                                if (data.avatar_path != '') {
                                    $scope.userAvatar = data.avatar_path;
                                }else{
                                    $scope.userAvatar = 'https://placehold.it/47x47/5490e0/FFFFFF';
                                };
                            }
                        );
                    break;
                    case 4: //VOLUNTARIO
                        users.getVoluntarioData(userId).then(
                            function(data){
                                $scope.usuario = data;
                                if (data.avatar_path != '') {
                                    $scope.userAvatar = data.avatar_path;
                                }else{
                                    $scope.userAvatar = 'https://placehold.it/47x47/5490e0/FFFFFF';
                                };
                            }
                        );
                    break;
                    case 5: //EMPRESA
                        users.getEmpresaData(userId).then(
                            function(data){
                                $scope.usuario = data;
                                if (data.avatar_path != '') {
                                    $scope.userAvatar = data.avatar_path;
                                }else{
                                    $scope.userAvatar = 'https://placehold.it/47x47/5490e0/FFFFFF';
                                };
                            }
                        );
                    break;
                }
            },
            function(errRole){
                console.log('Nadie Loggeado');
            }
        );
    }

    $scope.doLogout = function () {
        auth.logout().then(
            function(res) {
                delete $localStorage.token;
                delete $localStorage.user;
                delete $localStorage.prevStage;
                delete $localStorage.prevProyecto;

                $rootScope.exito = '!Sesión cerrada exitosamente!';

                window.location = '/';
            },
            function(err) {
                $rootScope.error = '!Error en la comunicación! :( Intenta más tarde.';
            }
        )
    };

    $scope.searchText = '';

    $scope.doSearch = function() {
        $state.go('publico.proyectos', {nombre: $scope.searchText});
        //$scope.searchText = '';
    };

});