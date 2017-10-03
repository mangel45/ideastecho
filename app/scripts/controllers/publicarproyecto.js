'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:PublicarProyectoCtrl
 * @description
 * # PublicarProyectoCtrl
 * Controller of the ideastechoApp
 */
 angular.module('ideastechoApp')
 .controller('PublicarProyectoCtrl', function ($scope, $state, $interval, $rootScope, $localStorage, project, image, auth, catalog, paises, categorias) {

    // Catálogos y Autocomplete

    $scope.isDisabled = false;
    $scope.paises = paises;
    $scope.estados = [];
    $scope.categorias = categorias;

    $scope.estadosDisabled = true;

    $scope.searchText = '';

    $scope.accessLevels = auth.accessLevels;

    if ($localStorage.user) {
        $scope.isAuth = auth.isAuthorized($localStorage.user, 'empresa');
    }

    $scope.myDate = new Date();
    $scope.minInitDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate()
    );

    $scope.minEndDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth(),
        $scope.myDate.getDate()+1
    );

    //ATOCOMPLETADORES

    $scope.querySearchPaises = function(query) {
    	var results = $scope.paises.filter(function(paises) {
    		return (paises.pais.toLowerCase().indexOf($scope.searchTextPais.toLowerCase()) !== -1);
    	});

    	return results;
    };

    $scope.querySearchCategoria = function(query) {
    	var results = $scope.categorias.filter(function(categorias) {
    		return (categorias.categoria.toLowerCase().indexOf($scope.searchTextCategoria.toLowerCase()) !== -1);
    	});

    	return results;
    };

    $scope.querySearchEstado = function(query) {
    	var results = $scope.estados.filter(function(estados) {
    		return (estados.estado.toLowerCase().indexOf($scope.searchTextEstado.toLowerCase()) !== -1);
    	});

    	return results;
    };

    $scope.$watch('selectedItemPais', function() {
        //console.log('País seleccionado!');
        //console.log($scope.selectedItemPais);
        if ($scope.selectedItemPais) {
            $scope.estadosDisabled = true;
        	catalog.getStateSByCountry($scope.selectedItemPais.pais_id).then(
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
        	$scope.selectedItemEstado = null;
        };
        
    });

    // IMAGENES
    
    $scope.sendProyecto = function(){
        if($scope.imagenCausa == null){
            $rootScope.alerta = 'Debes seleccionar una imagen de la causa.';
        }else{
            var formData = new FormData();
            formData.append("avatar", $scope.imagenCausa);

            image.setImagenProyecto(formData).then(
                function(resImagen){
                    $rootScope.exito = '!Imágen principal guardada!';
                    saveProject(resImagen);
                },
                function(errImagen){
                    $rootScope.error = 'No se pudo subir la imágen principal. Intenta más tarde.';
                }
            );
        }
  	};
    
    $scope.showImagenCausa = function (files) {
    	if(files.length == 1){
    		$scope.imagenCausa = files[0];
    	}
    };

    $scope.removeImagenCausa = function() {
    	$scope.imagenCausa = null;
    	$scope.project.imagencausa_path = '';
    };

    // IMAGENES AUXILIARES -------------------

    $scope.imagenesPorQueImportante = [];
    $scope.showPorQueImportante = function (files, errFiles) {
        if (errFiles.length > 0) {
            showAlerts(errFiles);
        }
        if(files.length > 0 && $scope.imagenesPorQueImportante.length <= 0){
            $scope.imagenesPorQueImportante = files;
        }else if($scope.imagenesPorQueImportante.length > 0){
            angular.forEach(files, function(file){
                $scope.imagenesPorQueImportante.push(file);
            });
        }
    };
    $scope.removePorQueImportante = function(index) {
        $scope.imagenesPorQueImportante.splice(index, 1);
    };


    $scope.imagenesUsoDinero = [];
    $scope.showUsoDinero = function (files, errFiles) {
        if (errFiles.length > 0) {
            showAlerts(errFiles);
        }
        if(files.length > 0 && $scope.imagenesUsoDinero.length <= 0){
            $scope.imagenesUsoDinero = files;
        }else if($scope.imagenesUsoDinero.length > 0){
            angular.forEach(files, function(file){
                $scope.imagenesUsoDinero.push(file);
            });
        }
    };

    $scope.removeUsoDinero = function(index) {
        $scope.imagenesUsoDinero.splice(index, 1);
    };



    $scope.imagenesBeneficiara = [];
    $scope.showBeneficiara = function (files, errFiles) {
        if (errFiles.length > 0) {
            showAlerts(errFiles);
        }
        if(files.length > 0 && $scope.imagenesBeneficiara.length <= 0){
            $scope.imagenesBeneficiara = files;
        }else if($scope.imagenesBeneficiara.length > 0){
            angular.forEach(files, function(file){
                $scope.imagenesBeneficiara.push(file);
            });
        }
    };

    $scope.removeBeneficiara = function(index) {
        $scope.imagenesBeneficiara.splice(index, 1);
    };


    $scope.imagenesEquipoVoluntarios = [];
    $scope.showEquipoVoluntarios = function (files, errFiles) {
        if (errFiles.length > 0) {
            showAlerts(errFiles);
        }
        if(files.length > 0 && $scope.imagenesEquipoVoluntarios.length <= 0){
            $scope.imagenesEquipoVoluntarios = files;
        }else if($scope.imagenesEquipoVoluntarios.length > 0){
            angular.forEach(files, function(file){
                $scope.imagenesEquipoVoluntarios.push(file);
            });
        }
    };

    $scope.removeEquipoVoluntarios = function(index) {
        $scope.imagenesEquipoVoluntarios.splice(index, 1);
    };


    //-------------------------


    function showAlerts(errFiles) {
        $rootScope.alerta = '<strong>¡Ups! </strong>Algunas de las imágenes que intentas cargar no cumplen las especificaciones permitidas:<br/>';
        angular.forEach(errFiles, function(errObj){
            switch(errObj.$error){
                case 'maxHeight':
                    $rootScope.alerta += 'La imagen <strong>' + errObj.name + '</strong> debe medir menos de 1080px de alto.';
                break;
                case 'maxSize':
                    $rootScope.alerta += 'La imagen <strong>' + errObj.name + '</strong> debe pesar menos de 5MB.';
                break;
            }
            $rootScope.alerta += '<br/>';
        });
        $rootScope.alerta += 'Por favor, revísalas e ¡Intenta de nuevo!';
    };

    // GUARDAR PROYECTO

    $scope.project = {};
    $scope.project.fechainicio = $scope.minInitDate;
    $scope.project.fechafin = $scope.minEndDate;

    function saveProject(imagenData) {
    	$scope.project.imagencausa_path = '';
    	var updateImage = '';
    	if (imagenData) {
    		var updateImage = imagenData.avatar;
    		$scope.project.imagencausa_path = updateImage;
    	}

    	if ($localStorage.user) {
    		$scope.project.userid = $localStorage.user.id;
            //$scope.project.autor = $localStorage.user.id;
    		$scope.project.creado_usuario_id = $localStorage.user.id;
    		$scope.project.modificado_usuario_id = $localStorage.user.id;

    		$scope.project.categoria_id = $scope.selectedItemCategoria.id;
    		$scope.project.pais_id = $scope.selectedItemPais.pais_id;
    		$scope.project.ciudad_id = $scope.selectedItemEstado.estado_id;
    		$scope.project.multiregion = false;

    		$scope.project.estatus = true;
            $scope.project.borrador = true;

    		project.setProyecto($scope.project).then(
    			function(resProyecto){
                    $rootScope.exito += '<br><strong>ÉXITO!</strong> !Datos del proyecto guardados!';
                    $('#myModal').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    saveExtraImages(resProyecto.proyectoid);
    			},
    			function(errProyecto){
    				$rootScope.error = 'No se pudo subir la información del proyecto. Intentalo de nuevo.';
    			});

    	};

    };

    //$scope.totalExtraImagenes = 0;
    $scope.totalImagenesSubidas = 0;

    function saveExtraImages(proyectoid) {

        $scope.totalExtraImagenes = $scope.imagenesPorQueImportante.length + $scope.imagenesUsoDinero.length + $scope.imagenesBeneficiara.length + $scope.imagenesEquipoVoluntarios.length; 

        if ($scope.imagenesPorQueImportante.length > 0) {
            angular.forEach($scope.imagenesPorQueImportante, function(imagenPorQueImportante){
                var formDataImagenPorQueImportante = new FormData();

                formDataImagenPorQueImportante.append("proyectoid", proyectoid);
                formDataImagenPorQueImportante.append("imagen", imagenPorQueImportante);
                formDataImagenPorQueImportante.append("creado_usuario_id", $localStorage.user.id);
                formDataImagenPorQueImportante.append("modificado_usuario_id",  $localStorage.user.id);

                image.setImagenPorQueImportante(formDataImagenPorQueImportante).then(
                    function(resImagen){
                        $scope.totalImagenesSubidas ++;
                        $scope.imagenesPorQueImportante = [];

                        //$rootScope.exito += '<br><strong>ÉXITO!</strong> !Imágen subida! ('+$scope.totalImagenesSubidas+'/'+$scope.totalExtraImagenes+')';
                    },
                    function(errImagen){
                        $rootScope.alert = 'No se pudieron subir las imágenes sobre la importancia del proyecto.';
                    }
                );
            });
        };

        if ($scope.imagenesUsoDinero.length > 0) {
            angular.forEach($scope.imagenesUsoDinero, function(imagenUsoDinero){
                var formDataImagenUsoDinero = new FormData();

                formDataImagenUsoDinero.append("proyectoid", proyectoid);
                formDataImagenUsoDinero.append("imagen", imagenUsoDinero);
                formDataImagenUsoDinero.append("creado_usuario_id", $localStorage.user.id);
                formDataImagenUsoDinero.append("modificado_usuario_id",  $localStorage.user.id);

                image.setImagenUsoDinero(formDataImagenUsoDinero).then(
                    function(resImagen){
                        $scope.totalImagenesSubidas ++;
                        $scope.imagenesUsoDinero = [];
                        //$rootScope.exito += '<br><strong>ÉXITO!</strong> !Imágen subida! ('+$scope.totalImagenesSubidas+'/'+$scope.totalExtraImagenes+')';
                    },
                    function(errImagen){
                        $rootScope.alert = 'No se pudieron subir las imágenes sobre la utilizacion del dinero.';

                    }
                );
            });
        };

        if ($scope.imagenesBeneficiara.length > 0) {
            angular.forEach($scope.imagenesBeneficiara, function(imagenBeneficiara){
        
                var formDataImagenBeneficiara = new FormData();

                formDataImagenBeneficiara.append("proyectoid", proyectoid);
                formDataImagenBeneficiara.append("imagen", imagenBeneficiara);
                formDataImagenBeneficiara.append("creado_usuario_id", $localStorage.user.id);
                formDataImagenBeneficiara.append("modificado_usuario_id",  $localStorage.user.id);

                image.setImagenBeneficiara(formDataImagenBeneficiara).then(
                    function(resImagen){
                        $scope.totalImagenesSubidas ++;
                        $scope.imagenesBeneficiara = [];
                        //$rootScope.exito += '<br><strong>ÉXITO!</strong> !Imágen subida! ('+$scope.totalImagenesSubidas+'/'+$scope.totalExtraImagenes+')';
                    },
                    function(errImagen){
                        $rootScope.alert = 'No se pudieron subir las imágenes sobre la comunidad beneficiada.';
                    }
                );
            });

        };
        
        if ($scope.imagenesEquipoVoluntarios.length > 0) {
            angular.forEach($scope.imagenesEquipoVoluntarios, function(imagenEquipoVoluntarios){
                var formDataImagenEquipoVoluntarios = new FormData();

                formDataImagenEquipoVoluntarios.append("proyectoid", proyectoid);
                formDataImagenEquipoVoluntarios.append("imagen", imagenEquipoVoluntarios);
                formDataImagenEquipoVoluntarios.append("creado_usuario_id", $localStorage.user.id);
                formDataImagenEquipoVoluntarios.append("modificado_usuario_id",  $localStorage.user.id);

                image.setImagenEquipoVoluntarios(formDataImagenEquipoVoluntarios).then(
                    function(resImagen){
                        $scope.totalImagenesSubidas ++;
                        $scope.imagenesEquipoVoluntarios = [];
                        //$rootScope.exito += '<br><strong>ÉXITO!</strong> !Imágen subida! ('+$scope.totalImagenesSubidas+'/'+$scope.totalExtraImagenes+')';
                    },
                    function(errImagen){
                        $rootScope.alert = 'No se pudieron subir las imágenes sobre el equipo de voluntarios.';
                    }
                );
            });
        };


    };

    $scope.openModal = function(){
        $scope.resetTime();
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    };

    $scope.modalDisabled = true;


    $scope.$watch('totalImagenesSubidas', function(newValue, oldValue){

        if (newValue != 0) {
            $scope.resetTime();
            $scope.countDownTime();

            $scope.logImagenesSubidas = '('+newValue+'/'+$scope.totalExtraImagenes+')';

            if (newValue >= $scope.totalExtraImagenes) {
                $scope.stopTime();
            }
        }
    });

    $scope.modalAcceptClass = 'btn-default';
    var stopTheTime;
    $scope.countDownTime = function() {
        // Don't start a new timer if we are already init
        if ( angular.isDefined(stopTheTime) ) return;
        console.log('Inicia Conteo!');
        stopTheTime = $interval(function() {
            if ($scope.limitTime > 0) {
                $scope.limitTime = $scope.limitTime - 1000;
            } else {
                $scope.stopTime();
            }
        }, 1000);
    };

    $scope.stopTime = function() {
        if (angular.isDefined(stopTheTime)) {
            $interval.cancel(stopTheTime);
            stopTheTime = undefined;

            $scope.modalDisabled = false;
            $scope.modalAcceptClass = 'btn-success';

            $('#myModal').on('hidden.bs.modal', function (e) {
                $state.go('publico.home');
            });
        }
    };

    $scope.resetTime = function() {
        $scope.limitTime = 10000;
    };

});


