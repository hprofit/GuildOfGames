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
        'guildOfGames.services.guildService',

        // Directives

        // Controllers
        'guildOfGames.controllers.user'
    ]);

    app.controller('HeaderController', ['$rootScope', '$scope', '$state', 'UserService', 'currentUser',
        function ($rootScope, $scope, $state, UserService, currentUser) {
            $scope.user = currentUser;
            $scope.userParams = {
                username: '',
                password: ''
            };
            console.log($scope.user);


            $scope.logout = function () {
                UserService.logout();
            };

            $scope.handleLogin = function(response) {
                $state.go('app');
            };

            $scope.login = function () {
                UserService.login($scope.userParams)
                    .then($scope.handleLogin);
            };

            $scope.cancelClose = function(event) {
                event.stopPropagation();
            }
        }
    ]);

    app.controller('HomeController', ['$scope', '$state', 'UserService', 'currentUser', 'guilds',
        function ($scope, $state, UserService, currentUser, guilds) {
            if (!currentUser) {
                $state.go('app.user.create');
            }

            $scope.guilds = guilds;
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
                        }],
                        guilds: ['GuildService', function (GuildService) {
                            return GuildService.getGuilds();
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

