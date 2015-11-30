(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.home', [
        'ui.router',
        'ui.bootstrap',
        'dialogs',
        'guildOfGames.services.userService'
    ])
        .controller('HomeController', ['$scope', '$state', 'UserService', 'currentUser', 'guilds',
            function ($scope, $state, UserService, currentUser, guilds) {
                $scope.guilds = guilds;
            }
        ]);
}(angular));