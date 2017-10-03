'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:DonarCtrl
 * @description
 * # DonarCtrl
 * Controller of the ideastechoApp
 */
angular.module('ideastechoApp')
  .controller('DonarCtrl', function ($scope, $state, $stateParams, $localStorage, $rootScope, project, catalog, users, donar, URL) {

    //METLIFE

    catalog.getStateSByCountry(4).then( //4 es México en la API, si esto cambia ya valió.
        function(resStatesByCountryId){
            $scope.estados = resStatesByCountryId;
        },
        function(errStatesByCountryId){
            console.log(errStatesByCountryId);
        }
    );

    $scope.querySearchEstado = function(query) {
        var results = $scope.estados.filter(function(estados) {
            return (estados.estado.toLowerCase().indexOf($scope.searchTextEstado.toLowerCase()) !== -1);
        });

        return results;
    };
  	
    //USUARIO ACTUAL:

    if ($localStorage.user) {
        $scope.currentUser = $localStorage.user.id;
    }

    //DONACIÓN DEFAULT
    /*$scope.data = {
        donativo: 50
    };*/

    $scope.facturacion = {
        direccion: {
            noint: ''
        }
    };

    $scope.donativo = {};

  	//DONACIONES CONEKTA:

  	//Conekta.setPublishableKey("key_DUGyw5sNdLA2XQLJJHBq9xA"); //Testing Key

    Conekta.setPublishableKey("key_biq54dqmyjGCBkoE7rkbNEg"); 
    
	var successResponseHandler = function(token) {

        //console.log('Token recibido: ', token);

        //console.log('Metlife: ', $scope.metlife);
        //console.log('Radio: ', $scope.metlifeoptions);
        //console.log('Estado Metlife: ', $scope.selectedItemEstado);

        var chargeData = {
            conektaTokenId: token.id,
            card_name: $scope.card.tarjetaname,
            card_donativo: $scope.data.donativo,
            userid: $scope.currentUser,
            proyectoid: $stateParams.proyectoId,
            factura: false,
            razonsocial: "",
            rfc: "",
            calle: "",
            noext: "",
            noint: "",
            cp: "",
            colonia: "",
            municipio: "",
            estado: "",
            pais: "",
            isoficina: false,
            oficina: "",
            estadooficina: null
        };

        if ($scope.factura) {
            chargeData.factura = true;
            chargeData.razonsocial = $scope.facturacion.nombre;
            chargeData.rfc = $scope.facturacion.rfc;
            chargeData.calle = $scope.facturacion.direccion.calle;
            chargeData.noext = $scope.facturacion.direccion.noext;
            if ($scope.facturacion.direccion.noint != '') {
                chargeData.noint = $scope.facturacion.direccion.noint;
            }
            chargeData.cp = $scope.facturacion.direccion.cp;
            chargeData.colonia = $scope.facturacion.direccion.colonia;
            chargeData.municipio = $scope.facturacion.direccion.municipio;
            chargeData.estado = $scope.facturacion.direccion.estado;
            chargeData.pais = $scope.facturacion.direccion.pais;
        }

        if ($scope.isoficina) {
            chargeData.isoficina = true,
            chargeData.oficina = $scope.isoficina,
            chargeData.estadooficina = $scope.selectedItemEstado.estado_id
        } else {
            chargeData.isoficina = false,
            chargeData.oficina = '',
            chargeData.estadooficina = ''
        }

        //console.log('Datos de cargo: ', chargeData);

        donar.enviarDatos(chargeData).then(
            function(resCargo){
                //console.log('Llamada exitosa: ', resCargo);
                if (resCargo.response) {
                    //$rootScope.info = resCargo.response;
                    switch(resCargo.response){
                        case 'This card has insufficient funds to complete the purchase.':
                            $rootScope.error = 'Esta tarjeta no tiene suficientes fondos para completar la compra.';
                        break;
                        case 'The card issuing bank declined to process this charge.':
                            $rootScope.error = 'La tarjeta ingresada ha sido declinada. Por favor intenta con otro método de pago.';
                        break;
                        case 'paid':
                            $rootScope.exito = '¡Donativo realizado!';
                            if ($stateParams.proyectoId != 32) {
                                $state.go('donador.gracias');
                            }else{
                                $state.go('donador.graciasmetlife');
                            }
                        break;
                    }

                }
            },
            function(errCargo){
                //console.log('ERROR DE COMUNICACIÓN: ', errCargo);
                $rootScope.error = 'El donativo no se puede realizar, revisa la información de la tarjeta';
            }

        );
        
        
        
        /*
        return $.post('/process_payment?token_id=' + token.id, function() {
            return document.location = 'payment_succeeded';
        });
        */
	};

	var errorResponseHandler = function(error) {
        $rootScope.error = error.message;
        //return console.log(error.message);
	};

    //$scope.procesoPago = true;
	

	$scope.tokenizarDatosTarjeta = function(){
        $scope.procesoPago = true;

        var tokenParams = {
            card: {
                number: $scope.card.tarjeta,
                name: $scope.card.tarjetaname,
                exp_year: $scope.card.anio,
                exp_month: $scope.card.mes,
                cvc: $scope.card.cvc,
                address: {
                    street1: "",
                    street2: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: ""
                }
            }
        };
		// Tokenizar una tarjeta en Conekta
		Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);

        // Test
        //$scope.testPago();
	};

    $scope.testPago = function(){
        
        var chargeData = {
            conektaTokenId: $scope.card.tarjetaname,
            card_name: $scope.card.tarjetaname,
            card_donativo: $scope.data.donativo,
            userid: $scope.currentUser,
            proyectoid: $stateParams.proyectoId,
            factura: false,
            razonsocial: "",
            rfc: "",
            calle: "",
            noext: "",
            noint: "",
            cp: "",
            colonia: "",
            municipio: "",
            estado: "",
            pais: "",
            isoficina: false,
            oficina: "",
            estadooficina: null
        };

        if ($scope.factura) {
            chargeData.factura = true;
            chargeData.razonsocial = $scope.facturacion.nombre;
            chargeData.rfc = $scope.facturacion.rfc;
            chargeData.calle = $scope.facturacion.direccion.calle;
            chargeData.noext = $scope.facturacion.direccion.noext;
            if ($scope.facturacion.direccion.noint != '') {
                chargeData.noint = $scope.facturacion.direccion.noint;
            }
            chargeData.cp = $scope.facturacion.direccion.cp;
            chargeData.colonia = $scope.facturacion.direccion.colonia;
            chargeData.municipio = $scope.facturacion.direccion.municipio;
            chargeData.estado = $scope.facturacion.direccion.estado;
            chargeData.pais = $scope.facturacion.direccion.pais;
        }

        if ($scope.isoficina) {
            chargeData.isoficina = true,
            chargeData.oficina = $scope.isoficina,
            chargeData.estadooficina = $scope.selectedItemEstado.estado_id
        }

        console.log('Datos de cargo: ', chargeData);
        
        donar.enviarDatos(chargeData).then(
            function(resCargo){
                console.log('Llamada exitosa: ', resCargo);
                if (resCargo.response) {
                    switch(resCargo.response){
                        case 'This card has insufficient funds to complete the purchase.':
                            $rootScope.error = 'Esta tarjeta no tiene suficientes fondos para completar la compra.';
                        break;
                        case 'The card issuing bank declined to process this charge.':
                            $rootScope.error = 'La tarjeta ingresada ha sido declinada. Por favor intenta con otro método de pago.';
                        break;
                        case 'paid':
                            $rootScope.exito = '¡Donativo realizado!';
                            if ($stateParams.proyectoId != 32) {
                                $state.go('donador.gracias');
                            }else{
                                $state.go('donador.graciasmetlife');
                            }
                            
                        break;
                    }

                }
            },
            function(errCargo){
                //console.log('ERROR DE COMUNICACIÓN: ', errCargo);
                $rootScope.error = 'El donativo no se puede realizar, revisa la información de la tarjeta';
            }
        );
    }


    //var monthFormat =  buildLocaleProvider("MMM-YYYY");
    $scope.buildLocaleProvider = function(formatString) {
        //console.log('Teen');
        return {
            formatDate: function (date) {
                if (date) return moment(date).format(formatString);
                else return null;
            },
            parseDate: function (dateString) {
                if (dateString) {
                    var m = moment(dateString, formatString, true);
                    return m.isValid() ? m.toDate() : new Date(NaN);
                }
                else return null;
            }
        };
    }


	//TEMP
  	/*
  	if ($stateParams.proyectoId !== null) {
  		window.location.href = URL.API_USER_PATH + 'donativo/'+ $stateParams.proyectoId +'&'+ $localStorage.user.id +'/';
  	}else{
  		$rootScope.error = 'Ocurrió un error, intantalo de nuevo.'
  		$state.go('publico.proyectos');
  	};*/

  	$scope.proyecto = {};
    $scope.proyecto.porcentaje = 0;

  	//PROYECTO

  	if ($stateParams.proyectoId) {

    	project.getProyecto($stateParams.proyectoId).then(
    		function(resProyecto){
    			$scope.proyecto = resProyecto;
    			
                getNombres($scope.proyecto);

                getAutorInfo($scope.proyecto.userid);

                getDonacionesInfo($scope.proyecto.proyectoid);
				
                moment.locale('es');
                var contador = moment($scope.proyecto.fechafin).diff(moment());
                var espera = moment.duration(contador);
                var restante = Math.round(espera.asDays());
                $scope.proyectoParsedData.fromNow = restante;
				
                /*
                if ($localStorage.user) {
                    if ($scope.proyecto.userid == $localStorage.user.id) {
                        $scope.isOwner = true;    
                    }
                }
                */
    		},
    		function(erProyecto){
    			$rootScope.error = 'No se encontró el proyecto';
    		}
    	);

        

    }else{

    };

    //NOMBRES Y CATÁLOGOS
    //NOMBRES

    $scope.proyectoParsedData = {};

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
                });

                $scope.donativo.porcentaje = Math.round($scope.donativo.total * 100 / $scope.proyecto.monto);
            },
            function(errDonantes){

            }
        );
    };


    //HANDLERS

    $scope.factura = false;

    $scope.facturaFormHandler = function(){
    	console.log('Factura: ', $scope.factura);
    	$scope.factura != $scope.factura;
    };

  });


