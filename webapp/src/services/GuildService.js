(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.guildService', [
        'guildOfGames.services.parseService'
    ])
        .factory('GuildService', ['$log', '$q', 'ParseService',
            function ($log, $q, ParseService) {
                var service = {};

                service.getTenMostRecentlyUpdatedGuilds = function() {
                    return ParseService.getTenMostRecentlyUpdatedGuilds();
                };

                service.getGuild = function(guildId) {
                    return ParseService.getGuild(guildId);
                };

                service.getGuildsForUser = function(user) {
                    return ParseService.getGuildsForUser(user);
                };

                service.getGuildMembers = function(guild) {
                    return ParseService.getGuildMembers(guild);
                };

                return service;
            }
        ]);
})(angular);