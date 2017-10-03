'use strict';

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:itmaterial
 * @description
 * # itmaterial
 */
angular.module('ideastechoApp')
	.directive('mdAutocompleteRequired',  function ($timeout) {
        return {
            restrict: 'A',
            require: '^form',
            link: function(scope, element, attr, ctrl) {
                $timeout(function() {
                    var realModel,
                        elemCtrl = ctrl[attr.mdInputName],
                        realValidation = function (model) {
                            elemCtrl.$setValidity('selectedItem', !! realModel);
                            return model;
                        };
                    if ( !! attr.mdSelectedItem && !! attr.mdInputName) {
                        scope.$watchCollection(attr.mdSelectedItem, function (obj) {
                            realModel = obj;
                            realValidation()
                        });
                        elemCtrl.$parsers.push(realValidation);
                    }
                })
            }
        }
    })
    .directive('mdCompare', function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=mdCompare"
            },
            link: function(scope, element, attributes, ngModel) {
                 
                ngModel.$validators.mdCompare = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
     
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    });
