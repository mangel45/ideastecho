'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.users
 * @description
 * # users
 * Service in the ideastechoApp.
 */
angular.module('ideastechoApp')
  .service('users', function ($http, $q, $localStorage, URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

        //------------------------ROLES----------------------------        

        setRole: function( _ROLEOBJ ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioRoleList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _ROLEOBJ,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        getRole: function(_USERID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioRoleDetail/' + _USERID + '/',
                method: 'GET',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        getRoleByUserId: function(_USERID) {
          var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'GetRoleByUserid/' + _USERID + '/',
                method: 'GET'/*,
                headers: { 'Authorization': 'token ' + $localStorage.token }*/
            }).then(
            function (data) {
                _defer.resolve(data.data[0]);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        //-----------------------USUARIOS---------------------------

        getDetail: function( ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_AUTH_PATH + 'UserDetail/', //Aquí la ruta es a AUTH
                method: 'GET',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        //-----------------------DONADORES---------------------------

        getDonadorData: function( _USERID ) {
            var _defer = $q.defer(); //UsuarioDonanteDetail/1/
            $http({
                url: URL.API_USER_PATH + 'UsuarioDonanteDetail/' + _USERID + '/',
                method: 'GET'//,
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setDonadorData: function( _DONADOR ) {
        	var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioDonanteList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _DONADOR,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        updateDonadorData: function( _USERID, _DONADOR ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioDonanteDetail/' + _USERID + '/',
                method: 'PUT', //Puede ser GET, PUT, DELETE.
                data: _DONADOR,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        //-----------------------VOLUNTARIOS---------------------------

        getVoluntarioData: function ( _USERID ) {
            var _defer = $q.defer(); //UsuarioDonanteDetail/1/
            $http({
                url: URL.API_USER_PATH + 'UsuarioVoluntarioDetail/' + _USERID + '/',
                method: 'GET'//,
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setVoluntarioData: function( _VOLUNTARIO ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioVoluntarioList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _VOLUNTARIO,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        updateVoluntarioData: function( _USERID, _VOLUNTARIO ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioVoluntarioDetail/' + _USERID + '/',
                method: 'PUT', //Puede ser GET, PUT, DELETE.
                data: _VOLUNTARIO,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

        //-----------------------EMPRESAS---------------------------

        getEmpresaData: function ( _USERID ) {
            var _defer = $q.defer(); //UsuarioDonanteDetail/1/
            $http({
                url: URL.API_USER_PATH + 'UsuarioEmpresaDetail/' + _USERID + '/',
                method: 'GET'//,
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        setEmpresaData: function( _EMPRESA  ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioEmpresaList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _EMPRESA,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },
        updateEmpresaData: function( _USERID, _EMPRESA ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'UsuarioEmpresaDetail/' + _USERID + '/',
                method: 'PUT', //Puede ser GET, PUT, DELETE.
                data: _EMPRESA,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                //console.log(e);
                _defer.reject(e);
            });

            return _defer.promise;
        },

    };


  });
