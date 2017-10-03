'use strict';

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:conekta
 * @description
 * # Conekta directives
 */
angular.module('ideastechoApp')
	.directive('conektaValidateNumber', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {

                ctrl.$parsers.unshift(function(viewValue) {
                    ctrl.$setValidity('cardNumber', Conekta.card.validateNumber(viewValue));
                    return viewValue;
                });
            }
        }
    })
    .directive('conektaValidateExpirationDate', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    ctrl.$setValidity('expirationDate', Conekta.card.validateExpirationDate(viewValue));
                    return viewValue;
                });
            }
        }
    })
    .directive('conektaValidateCvc', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attr, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    //console.log(ctrl);
                    ctrl.$setValidity('cvc', Conekta.card.validateCVC(viewValue));
                    return viewValue;
                });
            }
        }
    })
    .directive('conektaGetBrand', function(){
        
    });
