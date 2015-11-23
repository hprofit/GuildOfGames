(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.guildService', [
        'guildOfGames.services.parseService'
    ])
        .factory('GuildService', ['$log', '$q', 'ParseService',
            function ($log, $q, ParseService) {
                var service = {};

                service.getGuilds = function() {
                    return ParseService.getGuilds();
                };

                return service;
            }
        ]);
})(angular);