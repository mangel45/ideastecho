'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:EditarProyectoCtrl
 * @description
 * # EditarProyectoCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('EditarProyectoCtrl', function ($scope, $stateParams, $rootScope, $localStorage, project, auth, catalog, users, image, paises, categorias) {

  	$scope.paises = paises;
    $scope.estados = [];
    $scope.categorias = categorias;

    $scope.estadosDisabled = true;

    $scope.accessLevels = auth.accessLevels;

    $scope.toggleMultiregion = function(){
        if ($scope.project.multiregion == true) {
            $scope.estadosDisabled = true;
            $scope.selectedItemEstado = null;
            $scope.searchTextEstado = '';
        }else{
            $scope.estadosDisabled = false;
        }
    }

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

    $scope.doItemCategoriaSelection = function(item){
        console.log('Item categoría seleccionado');
        console.log(item);
    };

    $scope.doItemPaisSelection = function(item){
        console.log('Item país seleccionado');
        console.log(item);
        if ($scope.selectedItemPais) {
            $scope.toggleMultiregion();
            //$scope.estadosDisabled = true;
            catalog.getStateSByCountry($scope.selectedItemPais.pais_id).then(
                function(resStatesByCountryId){
                    $scope.estados = resStatesByCountryId;
                    $scope.toggleMultiregion();
                    //$scope.estadosDisabled = false;
                    if ($scope.searchTextEstado != '') {
                        catalog.getStateById($scope.project.ciudad_id).then(
                            function(resEstado){
                                $scope.proyectoParsedData.nombreEstado = resEstado.estado;
                                $scope.searchTextEstado = resEstado.estado;

                                var resultQuery = $scope.estados.filter(function(estados) {
                                    return (estados.estado.toLowerCase().indexOf(String(resEstado.estado).toLowerCase()) !== -1);
                                });
                                
                                if (resultQuery.length == 1) {
                                    $scope.selectedItemEstado = resultQuery[0];
                                }
                            },
                            function(errEstado){

                            }
                        );
                    }
                },
                function(errStatesByCountryId){
                    console.log(errStatesByCountryId);
                }
            );
        
        }else{
            $scope.toggleMultiregion();
            //$scope.estadosDisabled = true;
            $scope.selectedItemEstado = null;
            $scope.searchTextEstado = '';
        };
    };


    // IMAGENES

    //Guardan las imágenes que se deben borrar
    var borrarImagenesPorQueImportante = [];
    var borrarImagenesUsoDinero = [];
    var borrarImagenesBeneficiara = [];
    var borrarImagenesEquipoVoluntarios = [];
    
    $scope.sendProyecto = function(){
    	if ($scope.imagenCausa == $scope.project.imagencausa_path) {
    		saveProject($scope.imagenCausa);
    	}else if($scope.imagenCausa == null){
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
            	var imgPath = {
            		imagen: file
            	};
                $scope.imagenesPorQueImportante.push(imgPath);
            });
        }
    };
    $scope.removePorQueImportante = function(index) {
        borrarImagenesPorQueImportante.push($scope.imagenesPorQueImportante[index]);
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
            	var imgPath = {
            		imagen: file
            	};
                $scope.imagenesUsoDinero.push(imgPath);
            });
        }
    };

    $scope.removeUsoDinero = function(index) {
        borrarImagenesUsoDinero.push($scope.imagenesUsoDinero[index]);
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
            	var imgPath = {
            		imagen: file
            	};
                $scope.imagenesBeneficiara.push(imgPath);
            });
        }
    };

    $scope.removeBeneficiara = function(index) {
        borrarImagenesBeneficiara.push($scope.imagenesBeneficiara[index]);
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
            	var imgPath = {
            		imagen: file
            	};
                $scope.imagenesEquipoVoluntarios.push(imgPath);
            });
        }
    };

    $scope.removeEquipoVoluntarios = function(index) {
        borrarImagenesEquipoVoluntarios.push($scope.imagenesEquipoVoluntarios[index]);
        $scope.imagenesEquipoVoluntarios.splice(index, 1);
    };

    $scope.proyectoParsedData = {};

    function getNombres(_proyecto){
        catalog.getCountryById(_proyecto.pais_id).then(
            function(resPais){
                $scope.proyectoParsedData.nombrePais = resPais.pais;
                $scope.searchTextPais = resPais.pais;

                var resultQuery = $scope.paises.filter(function(paises) {
                    return (paises.pais.toLowerCase().indexOf(String(resPais.pais).toLowerCase()) !== -1);
                });

                if (resultQuery.length == 1) {
                    $scope.selectedItemPais = resultQuery[0];
                }
            },
            function(errPais){

            }
        );
        catalog.getStateById(_proyecto.ciudad_id).then(
            function(resEstado){
                $scope.proyectoParsedData.nombreEstado = resEstado.estado;
                $scope.searchTextEstado = resEstado.estado;

                var resultQuery = $scope.estados.filter(function(estados) {
                    return (estados.estado.toLowerCase().indexOf(String(resEstado.estado).toLowerCase()) !== -1);
                });
                
                if (resultQuery.length == 1) {
                    $scope.selectedItemEstado = resultQuery[0];
                }
            },
            function(errEstado){

            }
        );
        catalog.getCategorieById(_proyecto.categoria_id).then(
            function(resCategoria){
                $scope.proyectoParsedData.nombreCategoria = resCategoria.categoria;
                $scope.searchTextCategoria = resCategoria.categoria;

                var resultQuery = $scope.categorias.filter(function(categorias) {
                    return (categorias.categoria.toLowerCase().indexOf(String(resCategoria.categoria).toLowerCase()) !== -1);
                });
                
                if (resultQuery.length == 1) {
                    $scope.selectedItemCategoria = resultQuery[0];
                }
            },
            function(errCategoria){

            }
        );
    }


    function getExtraImages(proyectoid){
        image.getImagenesPorQueImportante(proyectoid).then(
            function(resImagen){
                if (resImagen.length > 0) {
                    $scope.imagenesPorQueImportante = resImagen;    
                }
            },
            function(serrImagen){

            }
        );
        image.getImagenesUsoDinero(proyectoid).then(
            function(resImagen){
                if (resImagen.length > 0) {
                    $scope.imagenesUsoDinero = resImagen;    
                }
            },
            function(serrImagen){

            }
        );
        image.getImagenesBeneficiara(proyectoid).then(
            function(resImagen){
                if (resImagen.length > 0) {
                    $scope.imagenesBeneficiara  = resImagen;
                }
            },
            function(serrImagen){

            }
        );
        image.getImagenesEquipoVoluntarios(proyectoid).then(
            function(resImagen){
                if (resImagen.length > 0) {
                    $scope.imagenesEquipoVoluntarios = resImagen;
                }
            },
            function(serrImagen){

            }
        );
    }

    function saveProject(imagenData) {
    	var updateImage = '';
    	if (imagenData != $scope.project.imagencausa_path) {
    		var updateImage = imagenData.avatar;
    		$scope.project.imagencausa_path = updateImage;
    	}

    	if ($localStorage.user) {

    		$scope.project.modificado_usuario_id = $localStorage.user.id;

    		$scope.project.categoria_id = $scope.selectedItemCategoria.id;
    		$scope.project.pais_id = $scope.selectedItemPais.pais_id;
    		$scope.project.ciudad_id = $scope.selectedItemEstado == null ? '' : $scope.selectedItemEstado.estado_id;

    		project.updateProyecto($scope.project).then(
    			function(resProyecto){
                    $rootScope.exito += '<br><strong>ÉXITO!</strong> !Datos del proyecto guardados!';
                    $('#myModal').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    deleteExtraImages();
                    saveExtraImages(resProyecto.proyectoid);
    			},
    			function(errProyecto){
    				$rootScope.error = 'No se pudo subir la información del proyecto. Intentalo de nuevo.';
    			});

    	}

    }
    
    if ($stateParams.id) {
    	project.getProyecto($stateParams.id).then(
    		function(resProyecto){
    			$scope.proyecto = resProyecto;

    			$scope.proyecto.monto = Number($scope.proyecto.monto);

    			$scope.proyecto.fechafin = new Date($scope.proyecto.fechafin);
    			$scope.proyecto.fechainicio = new Date($scope.proyecto.fechainicio);

    			if ($scope.proyecto.imagencausa_path != '') {
    				$scope.imagenCausa = $scope.proyecto.imagencausa_path;	
    			}

    			$scope.project = $scope.proyecto;

    			getNombres($scope.project);
    			
                getExtraImages($scope.project.proyectoid);
                
                if ($localStorage.user) {
                    if ($scope.project.userid == $localStorage.user.id) {
                        $scope.isOwner = true;    
                    }
                }
                
                
    		},
    		function(erProyecto){
    			$rootScope.error = 'No se encontró el proyecto';
    		}
    	);
    }


    //IMÁGENES EXTRA

    function deleteExtraImages() {
        
        if (borrarImagenesPorQueImportante.length > 0) {
            angular.forEach(borrarImagenesPorQueImportante, function(imagenPorQueImportante){
                //console.log('Borrar: ', imagenPorQueImportante);
                image.deleteImagenPorQueImportante(imagenPorQueImportante.id).then(
                    function(resDelete){
                        console.log('Imagen correctamente eliminada: ', resDelete);
                    },
                    function(errDelete){
                        console.log('La imagen no se pudo eliminar: ', errDelete);
                    }
                );
            });
        }

        if (borrarImagenesUsoDinero.length > 0) {
            angular.forEach(borrarImagenesUsoDinero, function(imagenUsoDinero){
                //console.log('Borrar: ', imagenPorQueImportante);
                image.deleteImagenUsoDinero(imagenUsoDinero.id).then(
                    function(resDelete){
                        console.log('Imagen correctamente eliminada: ', resDelete);
                    },
                    function(errDelete){
                        console.log('La imagen no se pudo eliminar: ', errDelete);
                    }
                );
            });
        }

        if (borrarImagenesBeneficiara.length > 0) {
            angular.forEach(borrarImagenesBeneficiara, function(imagenBeneficiara){
                //console.log('Borrar: ', imagenPorQueImportante);
                image.deleteImagenBeneficiara(imagenBeneficiara.id).then(
                    function(resDelete){
                        console.log('Imagen correctamente eliminada: ', resDelete);
                    },
                    function(errDelete){
                        console.log('La imagen no se pudo eliminar: ', errDelete);
                    }
                );
            });
        }

        if (borrarImagenesEquipoVoluntarios.length > 0) {
            angular.forEach(borrarImagenesEquipoVoluntarios, function(imagenEquipoVoluntarios){
                //console.log('Borrar: ', imagenPorQueImportante);
                image.deleteImagenEquipoVoluntarios(imagenEquipoVoluntarios.id).then(
                    function(resDelete){
                        console.log('Imagen correctamente eliminada: ', resDelete);
                    },
                    function(errDelete){
                        console.log('La imagen no se pudo eliminar: ', errDelete);
                    }
                );
            });
        }

    }

    $scope.totalImagenesSubidas = 0;

    function saveExtraImages(proyectoid) {
        console.log('Comienza subida de imagenes!', $scope.imagenesPorQueImportante.length );
        $scope.totalExtraImagenes = $scope.imagenesPorQueImportante.length + $scope.imagenesUsoDinero.length + $scope.imagenesBeneficiara.length + $scope.imagenesEquipoVoluntarios.length; 

        if ($scope.imagenesPorQueImportante.length > 0) {
            angular.forEach($scope.imagenesPorQueImportante, function(imagenPorQueImportante){
                console.log('Tipo de archivo: ', imagenPorQueImportante);
                if(typeof imagenPorQueImportante.imagen == 'object' || imagenPorQueImportante.type == "image/jpeg"){

                    var formDataImagenPorQueImportante = new FormData();

                    formDataImagenPorQueImportante.append("proyectoid", proyectoid);
                    formDataImagenPorQueImportante.append("imagen", imagenPorQueImportante.imagen);
                    formDataImagenPorQueImportante.append("creado_usuario_id", $localStorage.user.id);
                    formDataImagenPorQueImportante.append("modificado_usuario_id",  $localStorage.user.id);

                    image.setImagenPorQueImportante(formDataImagenPorQueImportante).then(
                        function(resImagen){
                            $scope.totalImagenesSubidas ++;
                        },
                        function(errImagen){
                            $rootScope.alert = 'No se pudieron subir las imágenes sobre la importancia del proyecto.';
                        }
                    );
                }
            });
        }
        
        if ($scope.imagenesUsoDinero.length > 0) {
            angular.forEach($scope.imagenesUsoDinero, function(imagenUsoDinero){

                if(typeof imagenUsoDinero.imagen == 'object' || imagenUsoDinero.type == "image/jpeg"){
                    var formDataImagenUsoDinero = new FormData();

                    formDataImagenUsoDinero.append("proyectoid", proyectoid);
                    formDataImagenUsoDinero.append("imagen", imagenUsoDinero.imagen);
                    formDataImagenUsoDinero.append("creado_usuario_id", $localStorage.user.id);
                    formDataImagenUsoDinero.append("modificado_usuario_id",  $localStorage.user.id);

                    image.setImagenUsoDinero(formDataImagenUsoDinero).then(
                        function(resImagen){
                            $scope.totalImagenesSubidas ++;
                        },
                        function(errImagen){
                            $rootScope.alert = 'No se pudieron subir las imágenes sobre la utilizacion del dinero.';

                        }
                    );
                }
            });
        }

        if ($scope.imagenesBeneficiara.length > 0) {
            angular.forEach($scope.imagenesBeneficiara, function(imagenBeneficiara){
                if(typeof imagenBeneficiara.imagen == 'object' || imagenBeneficiara.type == "image/jpeg"){
                    var formDataImagenBeneficiara = new FormData();

                    formDataImagenBeneficiara.append("proyectoid", proyectoid);
                    formDataImagenBeneficiara.append("imagen", imagenBeneficiara.imagen);
                    formDataImagenBeneficiara.append("creado_usuario_id", $localStorage.user.id);
                    formDataImagenBeneficiara.append("modificado_usuario_id",  $localStorage.user.id);

                    image.setImagenBeneficiara(formDataImagenBeneficiara).then(
                        function(resImagen){
                            $scope.totalImagenesSubidas ++;
                        },
                        function(errImagen){
                            $rootScope.alert = 'No se pudieron subir las imágenes sobre la comunidad beneficiada.';
                        }
                    );
                }
            });

        }
        
        if ($scope.imagenesEquipoVoluntarios.length > 0) {
            angular.forEach($scope.imagenesEquipoVoluntarios, function(imagenEquipoVoluntarios){
                if(typeof imagenEquipoVoluntarios.imagen == 'object' || imagenEquipoVoluntarios.type == "image/jpeg"){
                    var formDataImagenEquipoVoluntarios = new FormData();

                    formDataImagenEquipoVoluntarios.append("proyectoid", proyectoid);
                    formDataImagenEquipoVoluntarios.append("imagen", imagenEquipoVoluntarios.imagen);
                    formDataImagenEquipoVoluntarios.append("creado_usuario_id", $localStorage.user.id);
                    formDataImagenEquipoVoluntarios.append("modificado_usuario_id",  $localStorage.user.id);

                    image.setImagenEquipoVoluntarios(formDataImagenEquipoVoluntarios).then(
                        function(resImagen){
                            $scope.totalImagenesSubidas ++;
                        },
                        function(errImagen){
                            $rootScope.alert = 'No se pudieron subir las imágenes sobre el equipo de voluntarios.';
                        }
                    );
                }
            });
        }


    };
    
  });
