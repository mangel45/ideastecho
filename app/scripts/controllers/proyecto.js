'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:ProyectoCtrl
 * @description
 * # ProyectoCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('ProyectoCtrl', function ($scope, $state, $localStorage, $rootScope, $stateParams, ngMeta, users, project, proyecto, auth, catalog, image) {

    $scope.accessLevels = auth.accessLevels;
    $scope.pathToProyecto = $state.href('publico.proyecto', {}, {absolute: true});
    
    $scope.proyecto = proyecto;
    //console.log('Estos son los datos del proyecto: ', $scope.proyecto);

    ngMeta.setTitle('Ideas TECHO', ' | ' + proyecto.nombreproyecto);

    setMetas();
    getNombres($scope.proyecto);
    getAutorInfo($scope.proyecto.userid);
    getDonacionesInfo($scope.proyecto.proyectoid);
    getExtraImages($scope.proyecto.proyectoid);
    getComentarios($scope.proyecto.proyectoid);
    getActualizaciones($scope.proyecto.proyectoid);

    $scope.proyectoParsedData = {};

    moment.locale('es');
    var contador = moment($scope.proyecto.fechafin).diff(moment());
    var espera = moment.duration(contador);
    var restante = Math.round(espera.asDays());
    $scope.proyectoParsedData.fromNow = restante;

    if ($localStorage.user) {
        $scope.userid = $localStorage.user.id;
        if ($scope.proyecto.userid == $localStorage.user.id) {
            $scope.isOwner = true;    
        }
    }

    var todayDateObj = new Date();
    $scope.todayDate = todayDateObj.toISOString();

    $scope.isOwner = false;

  	//TABS

    $scope.activeTab = 'tabDescripcion';

    $scope.selectTab = function(setTab) {
    	$scope.activeTab = setTab;
    };
    $scope.isSelected = function(checkTab) {
    	return $scope.activeTab === checkTab;
    };

    $scope.avatars = ['g114', 'g196', 'g294', 'g360', 'g364', 'g454', 'g516', 'g600', 'g680', 'g764', 'g852', 'g940'];

    //NOMBRES

    function getNombres(_proyecto){
        catalog.getCountryById(_proyecto.pais_id).then(
            function(resPais){
                $scope.proyectoParsedData.nombrePais = resPais.pais;
            },
            function(errPais){

            }
        );
        if (!_proyecto.multiregion) {
            catalog.getStateById(_proyecto.ciudad_id).then(
                function(resEstado){
                    $scope.proyectoParsedData.nombreEstado = resEstado.estado;
                },
                function(errEstado){
                    $scope.proyectoParsedData.nombreEstado = 'Multiregión';
                }
            );
        }
        catalog.getCategorieById(_proyecto.categoria_id).then(
            function(resCategoria){
                $scope.proyectoParsedData.nombreCategoria = resCategoria.categoria;
            },
            function(errCategoria){

            }
        );
    };

    $scope.autor = {};

    function getAutorInfo(autorid){
        users.getRoleByUserId(autorid).then(
            function(resRole){
                //console.log('Rol del Publicador: ', resRole);
                //scope.nombre = 'Autor';
                switch(resRole.roleid){
                    case 4: //voluntario
                        users.getVoluntarioData(autorid).then(
                            function(resVoluntario){
                                $scope.autor.nombre = resVoluntario.nombre + ' ' + resVoluntario.paterno + ' ' +  resVoluntario.materno;
                                $scope.autor.descripcion = resVoluntario.cuentanosdeti;
                                $scope.autor.avatar = resVoluntario.avatar_path != '' ? resVoluntario.avatar_path : 'https://placehold.it/100x100';
                            },
                            function(errVoluntario){
                                //console.log(errVoluntario);
                            }
                        );
                    break;
                    case 5: //empresa
                        users.getEmpresaData(autorid).then(
                            function(resEmpresa){
                                $scope.autor.nombre = resEmpresa.nombrempresa;
                                $scope.autor.descripcion = resEmpresa.descripcionempresa;
                                $scope.autor.avatar = resEmpresa.avatar_path != '' ? resEmpresa.avatar_path : 'https://placehold.it/100x100';
                            },
                            function(errEmpresa){
                                //console.log(errEmpresa);
                            }
                        );
                    break;
                }
            },
            function(errRole){

            }
        );
    };

    $scope.donativo = {};

    function getDonacionesInfo(proyectoid){

        project.getDonantes(proyectoid).then(
            function(resDonantes){
                $scope.usuariosDonantes = [];

                $scope.donativo.total = 0;
                $scope.donativo.usuarios = resDonantes.length;
                angular.forEach(resDonantes, function(donante){
                    //console.log(donante);
                    $scope.donativo.total = $scope.donativo.total + donante.donativo;

                    users.getDonadorData(donante.userid).then(
                        function(resDonador){
                            $scope.usuariosDonantes.push(resDonador);
                        },
                        function(errDonador){

                        }
                    );

                    //$scope.usuariosDonantes
                });

                $scope.donativo.porcentaje = Math.round($scope.donativo.total * 100 / $scope.proyecto.monto);
            },
            function(errDonantes){

            }
        );
    };

    function getExtraImages(proyectoid){

        image.getImagenesPorQueImportante(proyectoid).then(
            function(resImagen){
                //console.log(resImagen);
                if (resImagen.length > 0) {
                    $scope.imagenesPorQueImportante = resImagen;    
                };
            },
            function(serrImagen){

            }
        );
        image.getImagenesUsoDinero(proyectoid).then(
            function(resImagen){
                //console.log(resImagen);
                if (resImagen.length > 0) {
                    $scope.imagenesUsoDinero = resImagen;    
                };
            },
            function(serrImagen){

            }
        );
        image.getImagenesBeneficiara(proyectoid).then(
            function(resImagen){
                //console.log(resImagen);
                if (resImagen.length > 0) {
                    $scope.imagenesBeneficiara  = resImagen;    
                };
            },
            function(serrImagen){

            }
        );
        image.getImagenesEquipoVoluntarios(proyectoid).then(
            function(resImagen){
                //console.log(resImagen);
                if (resImagen.length > 0) {
                    $scope.imagenesEquipoVoluntarios = resImagen;
                };
            },
            function(serrImagen){

            }
        );
    };

    //COMENTARIOS

    //$scope.comentarios = {};

    function getComentarios(proyectoid){
        project.getComentarios(proyectoid).then(
            function(resComentarios){
                $scope.comentarios = [];
                if (resComentarios.length > 0) {
                    $scope.comentarios = resComentarios;
                }
            },
            function(errComentarios){

            }
        );
    };

    //ACTUALIZACIONES

    //$scope.actualizaciones = {};

    function getActualizaciones(proyectoid){
        project.getActualizaciones(proyectoid).then(
            function(resActualizaciones){
                $scope.actualizaciones = [];
                if (resActualizaciones.length > 0) {
                    $scope.actualizaciones = resActualizaciones;
                }
            },
            function(errActualizaciones){

            }
        );
    };

    //METAS

    function setMetas(){

        ngMeta.setTag('twitter:title', $scope.proyecto.nombreproyecto );
        ngMeta.setTag('twitter:description', $scope.proyecto.porqueimportante );
        ngMeta.setTag('twitter:image', $scope.proyecto.imagencausa_path );
        ngMeta.setTag('twitter:url', $scope.pathToProyecto );

        ngMeta.setTag('og:title', $scope.proyecto.nombreproyecto );
        ngMeta.setTag('og:site_name', 'Ideas TECHO' );
        ngMeta.setTag('og:url', $scope.pathToProyecto );
        ngMeta.setTag('og:description', $scope.proyecto.porqueimportante );
        ngMeta.setTag('og:image', $scope.proyecto.imagencausa_path );

    }

    //ROUTING

    //$scope.proyecto = {};
    
    /*
    if ($stateParams.id) {
        
        //if ($stateParams.id == 'MetlifeFoundation' || $stateParams.id == 'metlifefoundation' ) {
        //    $stateParams.id = 32;
        //}
        
        $localStorage.prevProyecto = $stateParams.id;

    	project.getProyecto($stateParams.id).then(
    		function(resProyecto){
    			$scope.proyecto = resProyecto;

                setMetas();
                getNombres($scope.proyecto);
                getAutorInfo($scope.proyecto.userid);
                getDonacionesInfo($scope.proyecto.proyectoid);
                getExtraImages($scope.proyecto.proyectoid);
                getComentarios($scope.proyecto.proyectoid);
                getActualizaciones($scope.proyecto.proyectoid);

                moment.locale('es');
                var contador = moment($scope.proyecto.fechafin).diff(moment());
                var espera = moment.duration(contador);
                var restante = Math.round(espera.asDays());
                $scope.proyectoParsedData.fromNow = restante;

                if ($localStorage.user) {
                    if ($scope.proyecto.userid == $localStorage.user.id) {
                        $scope.isOwner = true;    
                    }
                }
    		},
    		function(erProyecto){
    			$rootScope.error = 'No se encontró el proyecto';
    		}
    	);

    }else{

    };
    */
    $scope.proyecto.porcentaje = 0;

    $scope.getPorcentaje = function(){
    	return $scope.donativo.porcentaje;
    };

    $scope.goToDonar = function(){
        $state.go('donador.donar', {usuarioId: 1})
    };

    //FORMULARIO DE COMENTARIOS

    $scope.nombreComentario = '';
    $scope.textoComentario = '';
    $scope.publicarComentario = function(){
        var nuevoComentario = {
            proyectoid: $scope.proyecto.proyectoid,
            user: $scope.nombreComentario,
            comentario: $scope.textoComentario,
            estatus: true
        };
        project.setComentario(nuevoComentario).then(
            function(resComentario){
                if ($scope.comentarios.length > 0) {
                    $scope.comentarios.push(resComentario);
                }else{
                    $scope.comentarios = resComentario;
                }
                
                $rootScope.exito = '!Comentario publicado exitosamente!';

                $scope.commentForm.$setPristine();
                $scope.commentForm.$setUntouched();

                $scope.nombreComentario = '';
                $scope.textoComentario = '';
            },
            function(errComentario){
                $rootScope.error = 'No se pudo publicar tu comentario :(. Intentalo más tarde.';
            }
        );
    };

    //FORMULARIO DE ACTUALIZACIONES

    $scope.tituloActualizacion = '';
    $scope.textoActualizacion = '';

    $scope.publicarActualizacion = function(){
        var nuevaActualizacion = {
            proyectoid: $scope.proyecto.proyectoid,
            userid: $localStorage.user.id,
            comentario: $scope.textoActualizacion,
            titulo: $scope.tituloActualizacion, 
            estatus: true,
            creado_usuario_id: $localStorage.user.id,
            modificado_usuario_id: $localStorage.user.id
        };
        
        project.setActualizacion(nuevaActualizacion).then(
            function(resActualizacion){
                if ($scope.actualizaciones.length > 0) {
                    $scope.actualizaciones.push(resActualizacion);
                }else{
                    $scope.actualizaciones = resActualizacion;
                }
                
                $rootScope.exito = '!Actualización publicada exitosamente!';

                $scope.updateForm.$setPristine();
                $scope.updateForm.$setUntouched();

                $scope.tituloActualizacion = '';
                $scope.textoActualizacion = '';
            },
            function(errComentario){
                $rootScope.error = 'No se pudo publicar la actualización :(. Intentalo más tarde.';
            }
        );
        
    };


  });
