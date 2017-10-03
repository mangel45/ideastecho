'use strict';

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:accsessLevel
 * @description
 * # accsessLevel
 */
angular.module('ideastechoApp')
    .directive('restrict', function(auth){
        return{
            restrict: 'A',
            prioriry: 100000,
            scope: {
                access: '='
            },
            link: function(scope, element){
                var currentUserRole = auth.user.role;
                var accessDenied = true;

                if(angular.isArray(scope.access)) {

                    angular.forEach(scope.access, function(access){
                        if(auth.authorize(access, currentUserRole)){
                            accessDenied = false;
                        }
                    });
                }else{
                    if(auth.authorize(scope.access, currentUserRole)){
                        accessDenied = false;
                    }
                }

                if(accessDenied){
                    element.children().remove();
                    element.remove();           
                }
            }
        };
    });
