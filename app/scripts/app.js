'use strict';

/**
 * @ngdoc overview
 * @name ideastechoApp
 * @description
 * # ideastechoApp
 *
 * Main module of the application.
 */
angular
    .module('ideastechoApp', [
        'ngAnimate',
        'ngMeta',
        'ui.router',
        'ngSanitize',
        'ngStorage',
        'ngMaterial',
        'ngFileUpload',
        'youtube-embed',
        '720kb.socialshare',
        'angular-loading-bar',
        'ui.bootstrap',
        'angularMoment'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        var access = routingConfig.accessLevels;
        // Rutas Publicas
        $stateProvider
            .state('publico', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.publico
                }
            })
            .state('publico.home', {
                url: '/',
                views: {
                    'MainContent@': {
                         templateUrl: 'views/main.html',
                         controller: 'MainCtrl',
                         resolve: {
                            proyectos: function(project) {
                                return project.getAllProyectos();
                            }
                        }
                     }
                },
                
            })/*
            .state('publico.pruebas', {
                url: '/pruebas/',
                templateUrl: 'views/pruebas.html',
                controller: 'PruebasCtrl'
            })*/
            .state('publico.404', {
                url: '/404/',
                views: {
                    'MainContent@': {
                         templateUrl: '404.html',
                     }
                },
            })
            .state('publico.proyectos', {
                url: '/proyectos/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/proyectos.html',
                        controller: 'ProyectosCtrl',
                        params: {
                            lugar: null,
                            interaccion: null,
                            categoría: null,
                            nombre: null
                        },
                        resolve: {
                            proyectos: function(project) {
                                return project.getAllProyectos();
                            },
                            paises: function(catalog) {
                                return catalog.getCountries();
                            },
                            estados: function(catalog) {
                                return catalog.getStates();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                     }
                }
                
            })
            .state('publico.comofunciona', {
                url: '/comofunciona/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/comofunciona.html',
                        controller: 'ComoFuncionaCtrl'
                    }
                },
                
            })
            .state('publico.proyecto', {
                url: '/proyecto/:id',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/proyecto.html',
                        controller: 'ProyectoCtrl',
                        resolve: {
                            proyecto: function(project, $stateParams) {
                                if ($stateParams.id == 'metlife' || $stateParams.id == 'metlifefoundation' ) {
                                    $stateParams.id = 32;
                                }
                                return project.getProyecto($stateParams.id);
                            }
                        }
                     }
                },
            })
            .state('publico.proyectometlifefoundation',{
                url: '/metlife/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/proyecto.html',
                        controller: 'ProyectoCtrl',
                        resolve: {
                            proyecto: function(project) {
                                return project.getProyecto(32);
                            }
                        }
                    }
                }
            })
            .state('publico.terminosycondiciones', {
                url: '/terminosycondiciones/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/terminosycondiciones.html'
                    }
                }
            })
            .state('publico.avisodeprivacidad', {
                url: '/avisodeprivacidad/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/avisodeprivacidad.html'
                    }
                }
            });

        // Rutas para Visitantes
        $stateProvider
            .state('anonimo', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.anonimo
                }
            })
            .state('anonimo.entrar', {
                url: '/entrar/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/entrar.html',
                        controller: 'EntrarCtrl',
                        resolve: {
                            areas: function(catalog) {
                              return catalog.getAreas();
                            },
                            oficinas: function(catalog) {
                                return catalog.getOffices();
                            }
                        }
                    }
                }
            })
            .state('anonimo.voluntarios', {
                url: '/entrar/voluntarios/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/entrarvoluntario.html',
                        controller: 'EntrarCtrl',
                        resolve: {
                            areas: function(catalog) {
                              return catalog.getAreas();
                            },
                            oficinas: function(catalog) {
                                return catalog.getOffices();
                            }
                        }
                    }
                }
            })
            .state('anonimo.empresas', {
                url: '/entrar/empresas/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/entrarempresa.html',
                        controller: 'EntrarCtrl',
                        resolve: {
                            areas: function(catalog) {
                              return catalog.getAreas();
                            },
                            oficinas: function(catalog) {
                                return catalog.getOffices();
                            }
                        }
                    }
                }
            })
            .state('anonimo.gracias', {
                url: '/entrar/gracias/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/graciasregistro.html'
                    }
                }
            })
            .state('anonimo.olvidecontrasena', {
                url: '/entrar/olvidecontrasena/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/olvidecontrasena.html',
                        controller: 'OlvideContrasenaCtrl'
                    }
                }
            });

        // Rutas para Usuarios (Donadores)
        $stateProvider
            .state('donador', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.donador
                }
            })
            .state('donador.miperfil', {
                url: '/miperfil/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/miperfil.html',
                        controller: 'MiPerfilCtrl',
                        resolve: {
                            paises: function(catalog) {
                              return catalog.getCountries();
                            }
                        }
                    }
                }
            })
            .state('donador.donar', {
                url: '/donar/:proyectoId',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/donar.html',
                        controller: 'DonarCtrl',
                        params: {
                            proyectoId: null,
                            lugar: null,
                            interaccion: null,
                            categoría: null,
                            nombre: null
                        },
                        resolve: {
                            proyectos: function(project) {
                                return project.getAllProyectos();
                            },
                            paises: function(catalog) {
                                return catalog.getCountries();
                            },
                            estados: function(catalog) {
                                return catalog.getStates();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            })
            .state('donador.gracias', {
                url: '/gracias/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/gracias.html'
                    }
                }
            })
            .state('donador.graciasmetlife', {
                url: '/gracias/metlife/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/graciasmetlife.html'
                    }
                }
            }); 

        // Rutas para Empresas
        $stateProvider
            .state('empresa', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.empresa
                }
            })
            .state('empresa.miperfil', {
                url: '/miperfil/empresa/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/miperfilempresa.html',
                        controller: 'MiPerfilEmpresaCtrl'
                    }
                }
            })
            .state('empresa.publicarproyecto', {
                url: '/publicarproyecto/empresa/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/publicarproyecto.html',
                        controller: 'PublicarProyectoCtrl',
                        resolve: {
                            paises: function(catalog) {
                              return catalog.getCountries();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            })
            .state('empresa.editarproyecto', {
                url: 'editar/proyecto/:id',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/editarproyecto.html',
                        controller: 'EditarProyectoCtrl',
                        resolve: {
                            paises: function(catalog) {
                              return catalog.getCountries();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            });

        // Rutas para Voluntarios
        $stateProvider
            .state('voluntario', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.voluntario
                }
            })
            .state('voluntario.miperfil', {
                url: '/miperfil/voluntario/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/miperfilvoluntario.html',
                        controller: 'MiPerfilVoluntarioCtrl',
                        resolve: {
                            paises: function(catalog) {
                                return catalog.getCountries();
                            },
                            areas: function(catalog) {
                                return catalog.getAreas();
                            },
                            oficinas: function(catalog) {
                                return catalog.getOffices();
                            }
                        }
                    }
                }
            })
            .state('voluntario.publicarproyecto', {
                url: '/publicarproyecto/voluntario/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/publicarproyecto.html',
                        controller: 'PublicarProyectoCtrl',
                        resolve: {
                            paises: function(catalog) {
                              return catalog.getCountries();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            })
            .state('voluntario.editarproyecto', {
                url: '/editar/proyecto/:id',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/editarproyecto.html',
                        controller: 'EditarProyectoCtrl',
                        params: {
                            id: null
                        },
                        resolve: {
                            paises: function(catalog) {
                              return catalog.getCountries();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            })
            .state('voluntario.proyectos', {
                url: '/proyectos/voluntario/:usuario',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/proyectos.html',
                        controller: 'ProyectosCtrl',
                        params: {
                            usuario: null
                        },
                        resolve: {
                            proyectos: function(project) {
                                return project.getAllProyectos();
                            },
                            paises: function(catalog) {
                                return catalog.getCountries();
                            },
                            estados: function(catalog) {
                                return catalog.getStates();
                            },
                            categorias: function(catalog) {
                                return catalog.getCategories();
                            }
                        }
                    }
                }
            })
            .state('voluntario.crearproyecto', {
                url:'/crearproyecto/',
                views: {
                    'MainContent@': {
                        templateUrl: 'views/crearproyecto/crearproyecto.html'
                    }
                }
            })
            ;

        // Rutas para Administradores PENDIENTE ---------!
        /*
        $stateProvider
        .state('administrador', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.admin
            }
        })
        .state('administrador.admin', {
            url: '/admin/',
            templateUrl: 'admin',
            controller: 'AdminCtrl'
        });
        */

        $urlRouterProvider.otherwise('/404');

        // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
        $urlRouterProvider.rule(function($injector, $location) {
            if($location.protocol() === 'file'){
                return;
            }

            var path = $location.path();
            // Note: misnomer. This returns a query object, not a search string
            var search = $location.search();
            var params;

            // check to see if the path already ends in '/'
            if (path[path.length - 1] === '/') {
                return;
            }

            // If there was no search string / query params, return with a `/`
            if (Object.keys(search).length === 0) {
                return path + '/';
            }

            // Otherwise build the search string and return a `/?` prefix
            params = [];
            angular.forEach(search, function(v, k){
                params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
        });

        $locationProvider.html5Mode(true).hashPrefix('*');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $httpProvider.interceptors.push(function($q, $location) {
            return {
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/entrar/');

                    }
                    return $q.reject(response);
                }
            };
        });


    })

    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])

    .config(function($mdDateLocaleProvider) {  
        $mdDateLocaleProvider.formatDate = function(date) {  
            return moment(date).format('DD/MM/YYYY');  
        };

        $mdDateLocaleProvider.months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        $mdDateLocaleProvider.shortMonths = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        $mdDateLocaleProvider.days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        $mdDateLocaleProvider.shortDays = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'];
    })

    .config(function($stateProvider, ngMetaProvider){
        $stateProvider.decorator('data', ngMetaProvider.mergeNestedStateData);

        ngMetaProvider.setDefaultTitle('Ideas TECHO');
        ngMetaProvider.useTitleSuffix(true);
        ngMetaProvider.setDefaultTitleSuffix(' | Dona, Construye, Transforma.');

        ngMetaProvider.setDefaultTag('author', 'Ideas TECHO');
    })

    .run(function ($rootScope, $localStorage, $state, ngMeta, auth) {

        ngMeta.init();
        
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            
            if(!('data' in toState) || !('access' in toState.data)){
                $rootScope.error = "Acceso no definido para este estado";
                event.preventDefault();
            }
            else if (!auth.authorize(toState.data.access)) {
                event.preventDefault();

                if (toState.name === 'donador.donar') {
                    
                    if (toParams.proyectoId != '') {
                        $localStorage.proyectoDonar = toParams.proyectoId;
                    }

                    $localStorage.prevStage = fromState;
                    $state.go('anonimo.entrar');
                }

                if(fromState.url === '^') {
                    if(auth.isLoggedIn()) {
                        $state.go('publico.home');
                    } else {
                        $rootScope.alerta = "Área restringida - No es posible cargar el contenido con las credenciales proporcionadas.";
                        $rootScope.error = null;
                        $state.go('anonimo.entrar');
                    }
                }

            }
        });

        $rootScope.$on('$stateChangeSuccess',function(){
            $("html, body").animate({ scrollTop: 0 }, 500);
        });

        

});

