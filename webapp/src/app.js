(function (ng) {
    'use strict';

    var app = ng.module('guildOfGames.app', [
        // Other dependencies
        'ui.router',
        'ui.bootstrap',
        'dialogs',

        // Templates
        'guildOfGames.templates',

        // Services
        'guildOfGames.services.userService',

        // Directives

        // Controllers
        'guildOfGames.controllers.user'
    ]);

    app.controller('HeaderController', ['$rootScope', '$scope', '$state', 'currentUser',
        function ($rootScope, $scope, $state, currentUser) {
            $scope.user = currentUser;
        }
    ]);

    app.controller('HomeController', ['$scope', '$state', 'UserService', 'currentUser',
        function ($scope, $state, UserService, currentUser) {
            if (!currentUser) {
                $state.go('app.user.create');
            }
        }
    ]);

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/');

            $stateProvider
                .state('app', {
                    url: '/',
                    resolve: {
                        currentUser: ['UserService', function (UserService) {
                            return UserService.getCurrentUser();
                        }]
                    },
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
                })
                .state('app.user', {url: 'user/'});
        }
    ]);
})(angular);

