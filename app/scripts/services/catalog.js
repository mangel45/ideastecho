'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.catalog
 * @description
 * # catalog
 * Service in the ideastechoApp.
 */
angular.module('ideastechoApp')
  .service('catalog', function ($http, $q, $localStorage, URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
        //-----------------------PAÍSES---------------------------
        getCountries: function () {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'PaisList/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getCountryById: function (_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'PaisDetail/'+ _ID +'/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        //-----------------------ESTADOS---------------------------
        getStates: function () {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'EstadoList/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getStateById: function (_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'EstadoDetail/' + _ID + '/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getStateSByCountry: function (_COUNTRY) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'GetEstadoByPaisid/' + _COUNTRY + '/',
                method: 'GET',
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
        updateState: function(_ESTADO) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'EstadoDetail/' + _ESTADO.estado_id + '/',
                data: _ESTADO,
                method: 'PUT',
                headers: { 'Authorization': $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });
        },
        deleteState: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'EstadoDetail/' + _ID + '/',
                method: 'DELETE',
                headers: { 'Authorization': $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });
        },
        //-----------------------CATEGORIAS---------------------------
        getCategories: function() {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'CategoriaProyectoList/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getCategorieById: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'CategoriaProyectoDetail/' + _ID + '/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        //-----------------------ÁREAS---------------------------
        getAreas: function() {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'AreaTechoList/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getAreaById: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'AreaTechoDetail/' + _ID + '/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        updateAreaTecho: function(_ID, _AREA, _ESTATUS) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'AreaTechoDetail/' + _ID + '/',
                method: 'PUT',
                data: {
                    area: _AREA,
                    estatus: _ESTATUS
                },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': $localStorage.token }
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                console.log(e);
                _defer.reject();
            });
        },
        //-----------------------OFICINAS---------------------------
        getOffices: function() {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'OficinaTechoList/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        getOfficeById: function(_ID) {
            var _defer = $q.defer();
            $http({
                url: URL.API_CATALOG_PATH + 'OficinaTechoDetail/' + _ID + '/',
                method: 'GET',
                headers: { 'Authorization': $localStorage.token }
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
        //-----------------------??---------------------------

    };

    
  });
