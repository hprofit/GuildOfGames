(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.userService', [
        'guildOfGames.services.parseService'
    ])
        .factory('UserService', ['ParseService',
            function (ParseService) {

                var service = {};


                return service;
            }
        ]);
})(angular);