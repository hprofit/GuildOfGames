(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.parseService', [
        'guildOfGames.parse'
    ])
        .factory('ParseService', ['$log', '$q', 'parse',
            function ($log, $q, parse) {
                var service = {};

                service.getCurrentUser = function () {
                    return parse.User.current();
                };

                service._signUp = function (parseUser, promise) {
                    parseUser.signUp(null, {
                        success: function(user) {
                            promise.resolve(user);
                        },
                        error: function(user, error) {
                            $log.error("Error: " + error.code + " " + error.message);
                            promise.resolve(null);
                        }
                    });
                };

                service.createUser = function (userParams) {
                    var deferred = $q.defer(),
                        user = new parse.User();

                    user.set("username", userParams.username);
                    user.set("password", userParams.password);
                    user.set("email", userParams.email);
                    user.set("firstName", userParams.firstName);
                    user.set("lastName", userParams.lastName);
                    //user.set("userType", userParams.lastName);
                    user.set("phone", userParams.phone);

                    service._signUp(user, deferred);

                    return deferred.promise;
                };

                return service;
            }
        ]);
})(angular);