(function (ng) {
    'use strict';

    ng.module('guildOfGames.models.user', [
    ])
        .factory('User', [
            function () {
                function User(params) {
                    params = params || {
                            get: function(property) {}
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
                }

                return User;
            }
        ]);
})(angular);