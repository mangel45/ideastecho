'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.image
 * @description
 * # image
 * Service in the ideastechoApp.
 */
 angular.module('ideastechoApp')
 .service('image', function ($http, $q, $localStorage, URL) {
 	return{
 		setImagenUsuario: function( _IMAGEN ) {
 			var _defer = $q.defer();
 			$http({
 				url: URL.API_USER_PATH + 'UsuarioAvatar/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _IMAGEN,
                transformRequest: angular.identity,
                headers: { 
                	'Authorization': 'token ' + $localStorage.token,
                	'Content-Type': undefined
                }
            }).then(
            function (data) {
            	_defer.resolve(data.data);
            },
            function (e) {
            	console.log(e);
            	_defer.reject(e);
            });

            return _defer.promise;
        },
        setImagenProyecto: function( _IMAGEN ) {
 			var _defer = $q.defer();
 			$http({
 				url: URL.API_USER_PATH + 'ImagenCausa/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _IMAGEN,
                transformRequest: angular.identity,
                headers: { 
                	'Authorization': 'token ' + $localStorage.token,
                	'Content-Type': undefined
                }
            }).then(
            function (data) {
            	_defer.resolve(data.data);
            },
            function (e) {
            	console.log(e);
            	_defer.reject(e);
            });

            return _defer.promise;
        },
        setImagenPorQueImportante: function(_DATA) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreProyectoList/',
                method: 'POST',
                data: _DATA,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        getImagenesPorQueImportante: function(_PROYECTOID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImgProyectoById/' + _PROYECTOID + '/',
                method: 'GET'
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        /*
        http://apitest.ideastecho.org/usuarios/ImagenSobreProyectoDetail/31/
        http://apitest.ideastecho.org/usuarios/ImagenSobreDineroDetail/31/
        http://apitest.ideastecho.org/usuarios/ImagenSobreComunidadDetail/31/
        http://apitest.ideastecho.org/usuarios/ImagenSobreVoluntariosDetail/31/
        */
        deleteImagenPorQueImportante: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreProyectoDetail/'+_ID+'/',
                method: 'DELETE',
                //data: _DATA,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setImagenUsoDinero: function(_DATA) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreDineroList/',
                method: 'POST',
                data: _DATA,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        getImagenesUsoDinero: function(_PROYECTOID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImgDineroById/' + _PROYECTOID + '/',
                method: 'GET'
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        deleteImagenUsoDinero: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreDineroDetail/'+_ID+'/',
                method: 'DELETE',
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setImagenBeneficiara: function(_DATA) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreComunidadList/',
                method: 'POST',
                data: _DATA,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        getImagenesBeneficiara: function(_PROYECTOID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImgComunidadById/' + _PROYECTOID + '/',
                method: 'GET'
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        deleteImagenBeneficiara: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreComunidadDetail/'+_ID+'/',
                method: 'DELETE',
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setImagenEquipoVoluntarios: function(_DATA) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreVoluntariosList/',
                method: 'POST',
                data: _DATA,
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        getImagenesEquipoVoluntarios: function(_PROYECTOID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImgVoluntariosById/' + _PROYECTOID + '/',
                method: 'GET'
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
        deleteImagenEquipoVoluntarios: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreVoluntariosDetail/'+_ID+'/',
                method: 'DELETE',
                transformRequest: angular.identity,
                headers: {
                    'Authorization': 'token ' + $localStorage.token,
                    'Content-Type': undefined
                }
            }).then(
            function(data) {
                _defer.resolve(data.data);
            },
            function(e){
                _defer.reject(e);
            });

            return _defer.promise;
        },
    }
});
