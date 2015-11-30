(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.user.dashboard', [
        'ui.router',
        'ui.bootstrap',
        'dialogs',
        'guildOfGames.services.userService'
    ])
        .controller("UserDashboardController", ['$scope', '$state', '$dialogs', 'UserService', 'currentUser', 'userGuilds',
            function ($scope, $state, $dialogs, UserService, currentUser, userGuilds) {
                $scope.user = currentUser;
                $scope.guilds = userGuilds;

                $scope.goToGuild = function (guildId) {
                    $state.go('app.guild',
                        {guildId: guildId},
                        {reload: true, inherit: true}
                    );
                }
            }
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.user.dashboard', {
                    url: ':userId',

                    resolve: {
                        userGuilds: ['GuildService', 'currentUser', function (GuildService, currentUser) {
                            if (currentUser.id !== 0) {
                                return GuildService.getGuildsForUser(currentUser);
                            }
                            else {
                                return null;
                            }
                        }]
                    },

                    views: {
                        'main@': {
                            templateUrl: 'user/dashboard.html',
                            controller: 'UserDashboardController'
                        }
                    }
                });
        }]);
}(angular));