(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.userService', [
        'guildOfGames.services.parseService'
    ])
        .factory('UserService', ['$log', 'ParseService',
            function ($log, ParseService) {
                var getCurrentUser = function () {
                    return ParseService.getCurrentUser();
                };

                return {
                    getCurrentUser: getCurrentUser
                }
            }
        ]);
})(angular);