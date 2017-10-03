'use strict';

/**
 * @ngdoc factory
 * @name ideastechoApp.auth
 * @description
 * # auth
 * Service in the ideastechoApp.
 */
angular.module('ideastechoApp')
  .factory('auth', function ($http, $q, $localStorage, users, URL) {

    var accessLevels = routingConfig.accessLevels;
    var userRoles = routingConfig.userRoles;
    var currentUser = $localStorage.user || { username: '', role: userRoles.publico };

    function changeUser(_USER) {
        angular.extend(currentUser, _USER);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(_USER) {
            if(_USER === undefined) {
                _USER = currentUser;
            }
            return _USER.role.title === userRoles.donador.title || _USER.role.title === userRoles.administrador.title;
        },
        register: function(_USER) {
            var _defer = $q.defer();
            $http({
                url: URL.API_REGISTER_PATH,
                method: 'POST',
                data: _USER,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                _defer.reject(e);
            });

            return _defer.promise;
        },
        login: function(_USER) {

            var _defer = $q.defer();
            $http({
                url: URL.API_LOGIN_PATH,
                method: 'POST',
                data: _USER,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).then(
            function (data) {
                _defer.resolve(data.data);
            },
            function (e) {
                _defer.reject(e);
            });

            return _defer.promise;
        },
        logout: function() {
            var _defer = $q.defer();
            $http({
                url: URL.API_AUTH_PATH + 'logout/',
                method: 'POST',
                data: {},
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            }).then(
            function (data) {
                changeUser({
                    username: '',
                    role: userRoles.publico
                });
                _defer.resolve(data.data);
            },
            function (e) {
                _defer.reject(e);
            });

            return _defer.promise;
        },
        changeUser: function(_USER) {
            changeUser(_USER);
        },
        isAuthorized: function(_USER, _ROLE){
            var authorized = false;
            if (_USER.role.title == _ROLE) {
                authorized = true;
            }
            return authorized;
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };

  });
