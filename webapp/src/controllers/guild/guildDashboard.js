(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.guild.dashboard', [
        'ui.router',
        'ui.bootstrap',
        'dialogs',
        'guildOfGames.services.userService',
        'guildOfGames.services.guildService'
    ])
        .controller("GuildDashboardController", ['$scope', '$state', '$dialogs', 'UserService', 'GuildService', 'selectedGuild',
            function ($scope, $state, $dialogs, UserService, GuildService, selectedGuild) {
                $scope.selectedGuild = selectedGuild;
            }
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.guild', {
                    url: 'guild/:guildId',

                    resolve: {
                        selectedGuild: ['GuildService', '$stateParams', function(GuildService, $stateParams) {
                            return GuildService.getGuild($stateParams.guildId);
                        }]
                    },

                    views: {
                        'main@': {
                            templateUrl: 'guild/dashboard.html',
                            controller: 'GuildDashboardController'
                        }
                    }
                });
        }]);
}(angular));