'use strict';

/**
 * @ngdoc service
 * @name ideastechoApp.URL
 * @description
 * # URL
 * Constant in the ideastechoApp.
 */
angular.module('ideastechoApp')
	/*.constant('URL', {
		API: 'http://apitest.ideastecho.org/',
		API_AUTH_PATH: 'http://apitest.ideastecho.org/rest-auth/',
		API_USER_PATH: 'http://apitest.ideastecho.org/usuarios/',
		API_CATALOG_PATH: 'http://apitest.ideastecho.org/catalogos/',
		API_LOGIN_PATH: 'http://apitest.ideastecho.org/sesion/login/',
		API_REGISTER_PATH: 'http://apitest.ideastecho.org/registration/'
	})*/
	
	.constant('URL', {
		API: 'https://api.ideastecho.org/',
		API_AUTH_PATH: 'https://api.ideastecho.org/rest-auth/',
		API_USER_PATH: 'https://api.ideastecho.org/usuarios/',
		API_CATALOG_PATH: 'https://api.ideastecho.org/catalogos/',
		API_LOGIN_PATH: 'https://api.ideastecho.org/sesion/login/',
		API_REGISTER_PATH: 'https://api.ideastecho.org/registration/'
   	});
