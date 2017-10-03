'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.donar
 * @description
 * # donar
 * Service in the ideastechoApp.
 */
angular.module('ideastechoApp')
  .service('donar', function ($http, $q, $localStorage, URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {

        //------------------------DONAR----------------------------        

        enviarDatos: function( _CDATA ) {
            var _defer = $q.defer();
            $http({
                url: URL.API_USER_PATH + 'charge/',
                method: 'POST', //Puede ser GET, POST, HEAD, OPTIONS.
                data: _CDATA,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: { 'Authorization': 'token ' + $localStorage.token }
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

        

    };


  });
