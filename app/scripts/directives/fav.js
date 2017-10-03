'use strict';

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:favButton
 * @description
 * # favButton
 */
angular.module('ideastechoApp')
  .directive('favButton', function ($rootScope, project) {
    return {
	    template: 	'<a href="" ng-click="onClick()" >'+
	    				'<i class="fa fa-heart" ng-class="isFavClass"></i>'+
	    			'</a>',
	    restrict: 'E',
	    scope: {
	 		proyectoId: "=proyecto",
	 		usuarioId: "=usuario"
	 	},
	    link: function postLink(scope, element, attrs) {
	    	var isFav = false;
	    	var favDisponible = false;
	    	scope.isFavClass = 'off';
	    	if (scope.usuarioId) {
	            project.isFav(scope.usuarioId).then(
	                function(resIsFav){
	                	favDisponible = true;
	                    angular.forEach(resIsFav, function(fav) {
	                        if (fav.proyectoid == scope.proyectoId) {
	                            isFav = true;
	                            scope.isFavClass = 'on';
	                            return;
	                        };
	                    });
	                },
	                function(errIsFav){
	                    //console.log('Error al obtener lista de favoritos');
	                    //console.log(errIsFav);
	                }
	            );
            };

	    	scope.onClick = function(){
	    		if (favDisponible) {
	    			if (!isFav) {
	    				project.doFav(scope.usuarioId, scope.proyectoId).then(
		                    function(resFav){
		                    	scope.isFavClass = 'on';
		                        $rootScope.info = '!Proyecto agregado a tus favoritos!';
		                    },
		                    function(errFav){

		                    }
		                );
	    			}else{
	    				project.removeFav(scope.usuarioId, scope.proyectoId).then(
		                    function(resRemoveFav){
		                    	scope.isFavClass = 'off';
		                        $rootScope.info = '!Proyecto eliminado de tus favoritos!';
		                    },
		                    function(errRemoveFav){

		                    }
		                );
	    			};
	    		};
	    	};

	    }
    };
  });
