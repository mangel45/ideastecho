'use strict';

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:nombrePais
 * @description
 * # nombrePais
 */
 angular.module('ideastechoApp')
 .directive('nombrePais', function (catalog) {
 	return {
 		template: '<span>{{nombre}}</span>',
 		restrict: 'E',
 		scope: {
 			paisId: "=id"
 		},
 		link: function postLink(scope, element, attrs) {
 			catalog.getCountryById(scope.paisId).then(
 				function(result) {
			        scope.nombre = result.pais;
			    }, function(err) {
			        scope.nombre = "???";
			    });
 		}
 	};
 });

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:nombreEstado
 * @description
 * # nombreEstado
 */
 angular.module('ideastechoApp')
 .directive('nombreEstado', function (catalog) {
 	return {
 		template: '<span>{{nombre}}</span>',
 		restrict: 'E',
 		scope: {
 			estadoId: "=id"
 		},
 		link: function postLink(scope, element, attrs) {
 			catalog.getStateById(scope.estadoId).then(
 				function(result) {
			        scope.nombre = result.estado;
			    }, function(err) {
			        scope.nombre = "Multiregión";
			    });
 		}
 	};
 });

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:nombreCategoria
 * @description
 * # nombreCategoria
 */
 angular.module('ideastechoApp')
 .directive('nombreCategoria', function (catalog) {
 	return {
 		template: '<span>{{nombre}}</span>',
 		restrict: 'E',
 		scope: {
 			categoriaId: "=id"
 		},
 		link: function postLink(scope, element, attrs) {
 			catalog.getCategorieById(scope.categoriaId).then(
 				function(result) {
			        scope.nombre = result.categoria;
			    }, function(err) {
			        scope.nombre = "???";
			    });
 		}
 	};
 });

 /**
 * @ngdoc directive
 * @name ideastechoApp.directive:cantidadDonada
 * @description
 * # cantidadDonada
 */
 angular.module('ideastechoApp')
 .directive('cantidadDonada', function (project) {
 	return {
 		template: "<span>{{donado | currency : '$' : 0 }}</span>",
 		restrict: "E",
 		scope: {
 			proyectoId: "=id"
 		},
 		link: function postLink(scope, element, attrs) {
 			project.getDonantes(scope.proyectoId).then(
 			//catalog.getCategorieById(scope.categoriaId).then(
 				function(result) {
 					var total = 0;
 					angular.forEach(result, function(donante){
 						total = total + donante.donativo;
 					});
			        scope.donado = total;
			    }, function(err) {
			        scope.donado = 0;
			    });
 		}
 	};
 });

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:porcentajeDonado
 * @description
 * # porcentajeDonado
 */
 angular.module('ideastechoApp')
 .directive('porcentajeDonado', function (project) {
 	return {
 		template: 	'<div class="progress">'+
						'<div class="progress-bar {{success}}" role="progressbar" aria-valuenow="{{porcentaje}}" aria-valuemin="0" aria-valuemax="100" style="width: {{porcentaje}}%;">'+
							'{{porcentaje}}%'+
						'</div>'+
					'</div>',
 		restrict: 'E',
 		scope: {
 			proyectoId: "=id",
 			proyectoMonto: "=monto",
 			proyectoFinalizado: "=finalizado",
 		},
 		link: function postLink(scope, element, attrs) {

 			project.getDonantes(scope.proyectoId).then(
 				function(result) {
 					var total = 0;
 					angular.forEach(result, function(donante){
 						total = total + donante.donativo;
 					});
			        scope.porcentaje = Math.round(total * 100 / scope.proyectoMonto);
			    	scope.success = '';
			        if (scope.proyectoFinalizado == true) {
			        	scope.success = 'progress-bar-success';
			        }

			    }, function(err) {
			        scope.porcentaje = 0;
			    });
 		}
 	};
 });

 /**
 * @ngdoc directive
 * @name ideastechoApp.directive:porcentajeDonadoText
 * @description
 * # porcentajeDonadoText
 */
 angular.module('ideastechoApp')
 .directive('porcentajeDonadoText', function (project) {
 	return {
 		template: 	'{{porcentaje}}%',	
 		restrict: 'E',
 		scope: {
 			proyectoId: "=id",
 			proyectoMonto: "=monto"
 		},
 		link: function postLink(scope, element, attrs) {

 			project.getDonantes(scope.proyectoId).then(
 				function(result) {
 					var total = 0;
 					angular.forEach(result, function(donante){
 						total = total + donante.donativo;
 					});
			        scope.porcentaje = Math.round(total * 100 / scope.proyectoMonto);
			    }, function(err) {
			        scope.porcentaje = 0;
			    });
 		}
 	};
 });

/**
 * @ngdoc directive
 * @name ideastechoApp.directive:nombreAutor
 * @description
 * # nombreAutor
 */
 angular.module('ideastechoApp')
 .directive('nombreAutor', function (users) {
 	return {
 		template: 	'{{nombre}}',
 		restrict: 'E',
 		scope: {
 			usuarioId: "=id"
 		},
 		link: function postLink(scope, element, attrs) {
 			users.getRoleByUserId(scope.usuarioId).then(
 				function(resRole){
 					//console.log('Rol del Publicador: ', resRole);
 					//scope.nombre = 'Autor';
 					switch(resRole.roleid){
 						case 4: //voluntario
 							users.getVoluntarioData(scope.usuarioId).then(
					            function(resVoluntario){
					                scope.nombre = resVoluntario.nombre + ' ' + resVoluntario.paterno + ' ' +  resVoluntario.materno;
					            },
					            function(errVoluntario){
					                //console.log(errVoluntario);
					            }
					        );
 						break;
 						case 5: //empresa
 							users.getEmpresaData(scope.usuarioId).then(
			                    function(resEmpresa){
			                        scope.nombre = resEmpresa.nombrempresa;
			                    },
			                    function(errEmpresa){
			                        //console.log(errEmpresa);
			                    }
			                );
 						break;
 					}
 				},
 				function(errRole){

 				}
 			);
 		}
 	};
 });



/**
 * @ngdoc directive
 * @name ideastechoApp.directive:inputCreditCard
 * @description
 * # inputCreditCard
 */
angular.module('ideastechoApp')
.directive("inputCreditCard", function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
			scope.$watch(attrs['ngModel'], function (v) {
				scope.cc = attrs['ngModel'];
				console.log('value changed, new value is: ' + v);
			});
        } 
    }
});