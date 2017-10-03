'use strict';

/**
 * @ngdoc function
 * @name ideastechoApp.controller:EntrarCtrl
 * @description
 * # EntrarCtrl
 * Controller of the ideastechoApp
 */
 angular.module('ideastechoApp')
 .controller('EntrarCtrl', function ($scope, $rootScope, $localStorage, $state, auth, users, areas, oficinas ) {

	$scope.areastecho = areas;
	$scope.oficinastecho = oficinas;

	$scope.userPrefs = {
		newsletter:false,
		terminos:false
	};

	$scope.companyPrefs = {
		newsletter:false,
		terminos:false
	};

	$scope.volunteerPrefs = {
		newsletter:false,
		terminos:false
	};

	var accessLevelArray = new Array();
	accessLevelArray['administrador'] = 16 ;
	accessLevelArray['anonimo'] = 1 ;
	accessLevelArray['donador'] = 18 ;
	accessLevelArray['empresa'] = 20 ;
	accessLevelArray['publico'] = 31 ;
	accessLevelArray['voluntario'] = 24;

	$scope.currentUser = '';

	var userRoles = ['null', 'publico', 'anonimo', 'donador', 'voluntario', 'empresa', 'administrador' ];

	console.log('Estado Previo: ', $localStorage.prevStage);

	$scope.doLogin = function() {
		auth.login({
			username: $scope.login.username,
			email: $scope.login.email,
			password: $scope.login.pass
		}).then(
		function(res) {
			if (res.key !== undefined) {

				$localStorage.token = res.key;

				users.getDetail().then( 
					function(userDetail) {
						console.log('User Detail: ');
						console.log(userDetail);
						$scope.currentUser = userDetail.username;
						
						users.getRoleByUserId(userDetail.id).then(
							function(resRole){
								console.log('Rol: ');
								console.log(resRole);
								var loguedUser = {
									id: resRole.userid,
									role:{
										bitMask: accessLevelArray[userRoles[resRole.roleid]],
										title: userRoles[resRole.roleid]
									},
									username: $scope.currentUser
								};

								$localStorage.user = loguedUser;
								auth.changeUser(loguedUser);

								if ($localStorage.proyectoDonar && loguedUser.role.title == 'donador') {
									var idProyecto = $localStorage.proyectoDonar;
									delete $localStorage.proyectoDonar;
									window.location = '/donar/'+idProyecto;
								}else{
									window.location = '/';
								}

							},
							function(errRole){
								$rootScope.error = 'Ocurrió un problema al obtener el rol del usuario';
							});
						
					},
					function(errDetail) {
						console.log(errDetail);
						if(errDetail.non_field_errors !== undefined){
							$rootScope.error = '!Usuario o contraseña incorrecto(s)!';
						}else{
							$rootScope.error = "!Error en la comunicación! :( Intenta más tarde.";
						}
					});

				
			}else{
				$rootScope.error = '!Usuario o contraseña incorrecto(s)!';
			}
		},
		function(err) {
			console.log('Error en login:', err);
			if(err.data.non_field_errors[0] !== undefined){
				//if(err.data.non_field_errors[0])
				$rootScope.error = err.data.non_field_errors[0];
			}else{
				$rootScope.error = "!Error en la comunicación! :(  Intenta más tarde.";
			}
		});
	};


	$scope.doDonadorRegistration = function( ){
		if ($scope.userPrefs.terminos !== false) {
			$scope.user.email = $scope.user.username;

			var _donador = {
				tipo_ususario: 'd',
				nombrempresa: '',
				nombre: '',
				paterno: '',
				materno: '',
				cuentanosdeti: '',
				areatecho: 0,
				oficinatecho: 0,
				descripcionempresa: '',
				estado_id: 0,
				pais_id: 0,
				celular: '',
				tel_fijo: '',
				telefono: '',
				avatar_path: '',
				newsletter: $scope.userPrefs.newsletter ? 1 : 0,
				estatus: 1,
				aprovado: 1,
				username: $scope.user.email,
				email: $scope.user.email,
				password1: $scope.user.password1,
				password2: $scope.user.password2
			};

			auth.register(
				_donador).then( 
				function(resRegistro){
					console.log('Registro: ');
					console.log(resRegistro);

					$rootScope.exito = '¡Registro Completo!. Ahora puedes iniciar sesión.';

					delete $localStorage.token;
					delete $localStorage.user;

					$scope.login = {};

					$scope.login.username = $scope.user.username;
					$scope.login.email = $scope.user.username;
					$scope.login.pass = $scope.user.password1;

					$scope.doLogin();

				},
				function(err){
			//console.log(err);
			if (err.data.email != undefined) {
				$rootScope.error = err.data.email;
			}
		});
			}else{
				$rootScope.alerta = 'Debes aceptar los Terminos y Condiciones para registrarte.';
			}

		};

		$scope.doEmpresaRegistration = function ( ){
			if ($scope.companyPrefs.terminos !== false) {
				$scope.company.email = $scope.company.username;

				var _empresa = {
					tipo_ususario: 'e',
					nombrempresa: $scope.companyPrefs.nombrempresa,
					nombre: $scope.companyPrefs.nombre,
					paterno: $scope.companyPrefs.paterno,
					materno: $scope.companyPrefs.materno == undefined ? '' : $scope.companyPrefs.materno, 
					cuentanosdeti: '',
					areatecho: 0,
					oficinatecho: 0,
					descripcionempresa: '',
					estado_id: 0,
					pais_id: 0,
					celular: '',
					tel_fijo: '',
					telefono: $scope.companyPrefs.telefono,
					avatar_path: '',
					newsletter: $scope.companyPrefs.newsletter ? 1 : 0,
					estatus: 1,
					aprovado: 1,
					username: $scope.company.username,
					email: $scope.company.username,
					password1: $scope.company.password1,
					password2: $scope.company.password2
				};

				auth.register(_empresa).then(
					function(resRegistro){
						console.log('Registro: ');
						console.log(resRegistro);

						$rootScope.exito = '¡ Gracias por registrarte en ideasTECHO.org !';

						delete $localStorage.token;
						delete $localStorage.user;

						$state.go('anonimo.gracias');

					},
					function(err){
						if (err.data.email != undefined) {
							$rootScope.error = err.data.email;
						}
					});

			}else{
				$rootScope.alerta = 'Debes aceptar los Terminos y Condiciones para registrarte.';
			}
		};


		$scope.doVoluntarioRegistration = function(){
			if ($scope.volunteerPrefs.terminos !== false) {
				$scope.volunteer.email = $scope.volunteer.username;

				var _volunteer = {
					tipo_ususario: 'v',
					nombrempresa: '',
					nombre: $scope.volunteerPrefs.nombre,
					paterno: $scope.volunteerPrefs.paterno,
					materno: $scope.volunteerPrefs.materno == undefined ? '' : $scope.volunteerPrefs.materno,
					cuentanosdeti: '',
					areatecho: $scope.volunteerPrefs.areatecho,
					oficinatecho: $scope.volunteerPrefs.oficinatecho,
					descripcionempresa: '',
					estado_id: 0,
					pais_id: 0,
					celular: '',
					tel_fijo: '',
					telefono: '',
					avatar_path: '',
					newsletter: $scope.volunteerPrefs.newsletter ? 1 : 0,
					estatus: 1,
					aprovado: 1,
					username: $scope.volunteer.username,
					email: $scope.volunteer.username,
					password1: $scope.volunteer.password1,
					password2: $scope.volunteer.password2
				};

				auth.register(_volunteer).then(
					function(resRegistro){
						console.log('Registro: ');
						console.log(resRegistro);

			//$localStorage.token = resRegistro.key;

			$rootScope.exito = '¡ Gracias por registrarte en ideasTECHO.org !';

			delete $localStorage.token;
			delete $localStorage.user;

			$state.go('anonimo.gracias');
		},
		function(err){
			if (err.data.email != undefined) {
				$rootScope.error = err.data.email;
			}
		  }); // <- registerUser
			}else{
				$rootScope.alerta = 'Debes aceptar los Términos y Condiciones para registrarte.';
			}
		};


		function resetRegisterForm() {
		//$scope.person = angular.copy(oriPerson);
		$scope.registerForm.$setPristine();
	};
	
});
