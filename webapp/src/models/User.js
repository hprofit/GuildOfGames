(function (ng) {
    'use strict';

    ng.module('guildOfGames.models.user', [
        'guildOfGames.models.guild'
    ])
        .factory('User', ['Guild',
            function (Guild) {
                function User(params) {
                    params = params || {
                            get: function (property) {
                            }
                        };

                    this.id = params.id || 0;
                    this.createdAt = params.createdAt || {};
                    this.updatedAt = params.updatedAt || {};

                    this.email = params.get('email') || '';
                    this.firstName = params.get('firstName') || '';
                    this.lastName = params.get('lastName') || '';
                    this.username = params.get('username') || '';
                    this.phoneNumber = params.get('phoneNumber') || '';
                    this.guilds = params.get('guilds') || [];

                    this.profilePicture = params.get('profilePicture') || '';
                    this.profilePicture = _.isFunction(this.profilePicture.url) ? this.profilePicture.url() : this.profilePicture;

                    this.parseObj = params;
                }

                User.build = function (params) {
                    return new User(params);
                };

                User.prototype.getFullName = function() {
                    return this.lastName + ", " + this.firstName;
                };

                return User;
            }
        ]);
})(angular);