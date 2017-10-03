'use strict';

/**
 * @ngdoc filter
 * @name ideastechoApp.filter:daysFromNow
 * @function
 * @description
 * # daysFromNow
 * Filter in the ideastechoApp.
 */
angular.module('ideastechoApp')
	.filter('daysFromNow', function () {
		return function (input) {
			moment.locale('es');
		    var contador = moment(input).diff(moment());
		    var espera = moment.duration(contador);
		    var restante = Math.round(espera.asDays());
		    return restante;
		};
	})
	.filter('passwordMask', function() {
	    return function (input, num) {
	        if (isNaN(num) || num < 1) {
	            return String(input).replace(/./g, '*');
	        }
	        var mask = RegExp('(.{1,' + num + '}$)|.', 'g');
	        return String(input).replace(mask, function(hide, show) {
	            return show || '*';
	        });
	    };
  });
