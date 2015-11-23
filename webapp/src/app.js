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
        'guildOfGames.controllers.user',
        'guildOfGames.controllers.guild.dashboard'
    ]);

    app.controller('HeaderController', ['$rootScope', '$scope', '$window', '$state', 'UserService', 'currentUser',
        function ($rootScope, $scope, $window, $state, UserService, currentUser) {
            $scope.user = currentUser.id === 0 ? null : currentUser;
            $scope.userParams = {
                username: '',
                password: ''
            };

            $scope.logout = function () {
                UserService.logout();
                $window.location.reload();
            };

            $scope.handleLogin = function(response) {
                // TODO: 101 is a tight coupling with Parse's error codes
                if (response === 101) {
                    $scope.loginError = true;
                }
                else {
                    $state.go('app', $state.params, {reload: true});
                }
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
            if (currentUser.id === 0) {
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

