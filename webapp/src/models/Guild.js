(function (ng) {
    'use strict';

    ng.module('guildOfGames.models.guild', [])
        .factory('Guild', [
            function () {
                function Guild(params) {
                    params = params || {
                            get: function (property) {
                            }
                        };

                    this.id = params.id || 0;
                    this.createdAt = params.createdAt || {};
                    this.updatedAt = params.updatedAt || {};

                    this.description = params.get('description') || '';
                    this.guildName = params.get('guildName') || '';
                    this.members = params.get('members') || [];
                    this.tags = params.get('tags') || [{name: 'ios'}, {name: 'apple'}];

                    this.guildImage = params.get('guildImage') || '';
                    this.guildImage = _.isFunction(this.guildImage.url) ? this.guildImage.url() : this.guildImage;

                    this.parseObj = params;
                }

                Guild.build = function (params) {
                    return new Guild(params);
                };

                return Guild;
            }
        ]);
})(angular);