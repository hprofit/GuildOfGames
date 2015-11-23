(function (ng) {
    'use strict';

    ng.module('guildOfGames.models.guild', [
    ])
        .factory('Guild', [
            function () {
                function Guild(params) {
                    params = params || {};

                    this.id = params.id || 0;
                    this.createdAt = params.createdAt || {};
                    this.updatedAt = params.updatedAt || {};

                    this.description = params.get('description') || '';
                    this.guildImage = params.get('guildImage') || '';
                    this.guildName = params.get('guildName') || '';
                    this.members = params.get('members') || [];
                    this.tags = params.get('tags') || [];
                }

                Guild.build = function (params) {
                    return new Guild(params);
                };

                return Guild;
            }
        ]);
})(angular);