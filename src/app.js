(function (ng) {
    'use strict';

    var app = ng.module('guildOfGames.app', [
        // Other dependencies
        'ui.router',

        // Templates
        'guildOfGames.templates'

        // Directives

        // Controllers
    ]);

    app.controller('HeaderController', ['$rootScope', '$scope', '$state',
        function ($rootScope, $scope, $state) {
        }
    ]);

    app.controller('HomeController', ['$scope', '$state',
        function ($scope, $state) {
        }
    ]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            //$urlRouterProvider.when('/', '/dashboard');
            $urlRouterProvider.when('', '/');

            $stateProvider
                .state('app', {
                    url: '/',
                    views: {
                        'header@': {
                            templateUrl: 'header.html',
                            controller: 'HeaderController'
                        },
                        'main@': {
                            templateUrl: 'home.html',
                            controller: 'HomeController'
                        }
                    }
                });
        }
    ]);
})(angular);
