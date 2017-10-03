'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.project
 * @description
 * # project
 * Service in the ideastechoApp.
 */
angular.module('ideastechoApp')
  .service('project', function ( $http, $q, $localStorage, URL ) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

        //------------------------PROYECTO----------------------------

        getProyecto: function( _PROYECTOID ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ProyectoDetail/' + _PROYECTOID + '/',
                method: 'GET'
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        setProyecto: function( _PROYECTO ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ProyectoList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _PROYECTO,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 
                    'Authorization': 'token ' + $localStorage.token,
                }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },

        updateProyecto: function( _PROYECTO ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ProyectoDetail/' + _PROYECTO.proyectoid + '/',
                method: 'PUT', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _PROYECTO,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 
                    'Authorization': 'token ' + $localStorage.token,
                }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },

        setImagenEquipoProyecto: function( _IMAGEN ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ImagenSobreVoluntariosList/',
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
                _defer.reject();
            });

            return _defer.promise;
        },
        doFav: function( _USUARIOID, _PROYECTOID ){
            // Proyecto_favoritosList/
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'Proyecto_favoritosList/',
                method: 'POST',
                data: {
                    proyectoid: _PROYECTOID,
                    userid: _USUARIOID
                },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 
                    'Authorization': 'token ' + $localStorage.token,
                }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        isFav: function( _USUARIOID ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'GetfavoritosByUserId/'+ _USUARIOID +'/',
                method: 'GET',
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        removeFav: function( _USUARIOID, _PROYECTOID ){
            // Proyecto_favoritosList/
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'Proyecto_favoritosList/',
                method: 'DELETE', //Puede ser GET, POST, HEAD, OPTIONS.
                data: {
                    proyectoid: _PROYECTOID,
                    userid: _USUARIOID
                },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        getDonantes: function( _PROYECTOID ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'GetDonantesByProyectoId/'+ _PROYECTOID +'/',
                method: 'GET'
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        setComentario: function( _COMENTARIO ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ComentarioProyectoList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _COMENTARIO,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 
                    'Authorization': 'token ' + $localStorage.token,
                }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        getComentarios: function( _PROYECTOID ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'GetComentariosByProyecto/'+ _PROYECTOID +'/',
                method: 'GET'
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        setActualizacion: function( _ACTUALIZACION ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ActualizacionProyectoList/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _ACTUALIZACION,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 
                    'Authorization': 'token ' + $localStorage.token,
                }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        getActualizaciones: function( _PROYECTOID ){
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'GetActualizacionByProyecto/'+ _PROYECTOID +'/',
                method: 'GET'
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },
        

        //------------------------PROYECTOS----------------------------

        getAllProyectos: function( ) {

            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'ProyectoList/',
                method: 'GET'
                //headers: { 'Authorization': 'token ' + $localStorage.token }
            }).then(function (data) {
                _defer.resolve(data.data);
            },function (e) {
                console.log(e);
                _defer.reject();
            });

            return _defer.promise;
        },

    };

  });
