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

                service.getGuild = function(guildId) {
                    return ParseService.getGuild(guildId);
                };

                return service;
            }
        ]);
})(angular);