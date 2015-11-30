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
        'guildOfGames.controllers.header',
        'guildOfGames.controllers.home',

        'guildOfGames.controllers.user.dashboard',
        'guildOfGames.controllers.user.create',

        'guildOfGames.controllers.guild.dashboard'
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
                            return GuildService.getTenMostRecentlyUpdatedGuilds();
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

    app.run(['$rootScope', '$window', '$log', '$state', 'UserService',
        function ($rootScope, $window, $log, $state, UserService) {
            var isRouteException = function (stateName) {
                /**
                 * These are routes the user can navigate to without having signed in
                 */
                var routeExecptions = [
                    "app",
                    "app.user.create"
                ];

                return _.findIndex(routeExecptions, function (exception) {
                        return exception === stateName;
                    }) !== -1;
            };

            $rootScope.$watch('error', function (newError, oldError) {
                if (newError === oldError) {
                    return;
                }
                if (newError.code === 209) {//} && $state.current.name !== '') {
                    $state.go('app', {}, {reload: true});
                }
            });

            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (UserService.getCurrentUser().id === 0 && !isRouteException((toState.name))) {
                        event.preventDefault();
                        $state.go('app.user.create');
                    }
                }
            );

            $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    $log.error('StateChangeError occurred: fromState:' + fromState +
                        'toState: ' + toState, error);
                }
            );

            $rootScope.$on('$stateNotFound',
                function (event, unfoundState, fromState, fromParams) {
                    $log.error("StateNotFound Error: ", unfoundState);
                }
            );
        }]);
})(angular);

