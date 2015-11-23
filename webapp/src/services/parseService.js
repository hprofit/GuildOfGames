(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.parseService', [
        'guildOfGames.parse',
        'guildOfGames.models.guild',
        'guildOfGames.models.user'
    ])
        .factory('ParseService', ['$log', '$q', 'parse', 'User', 'Guild',
            function ($log, $q, parse, User, Guild) {
                var service = {};

                service.logout = function () {
                    parse.User.logOut();
                };

                service._login = function (parseUser, userParams, promise) {
                    parseUser.logIn(userParams.username, userParams.password, {
                        success: function(user) {
                            promise.resolve(new User(user));
                        },
                        error: function(user, error) {
                            $log.error("Error: " + error.code + " " + error.message);
                            promise.resolve(error.code);
                        }
                    });
                };

                service.login = function(userParams) {
                    var deferred = $q.defer();

                    service._login(parse.User, userParams, deferred);

                    return deferred.promise;
                };

                service.getCurrentUser = function () {
                    return new User(parse.User.current());
                };

                service._signUp = function (parseUser, promise) {
                    parseUser.signUp(null, {
                        success: function (user) {
                            promise.resolve(user);
                        },
                        error: function (user, error) {
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
                    user.set("userType", userParams.lastName);
                    user.set("phoneNumber", userParams.phoneNumber);

                    service._signUp(user, deferred);

                    return deferred.promise;
                };

                service.getUsersByUsername = function (username, promise) {
                    var query = new parse.Query(parse.User);
                    query.equalTo("username", username);
                    query.find({
                        success: function (users) {
                            promise.resolve(users.length !== 0);
                        }
                    });
                };




                service._findGuilds = function (query, promise) {
                    query.find({
                        success: function (guilds) {
                            promise.resolve(guilds.map(Guild.build));
                        },
                        error: function (guilds, error) {
                            $log.error("Error: " + error.code + " " + error.message);
                            promise.resolve(null);
                        }
                    });
                };

                service.getGuilds = function () {
                    var deferred = $q.defer(),
                        ParseGuild = parse.Object.extend("Guild"),
                        query = new parse.Query(ParseGuild);

                    // Retrieve the most recent ones
                    query.descending("updatedAt");

                    // Only retrieve the last ten
                    query.limit(10);

                    service._findGuilds(query, deferred);

                    return deferred.promise;
                };


                service._getGuildById = function(query, guildId, promise) {
                    query.get(guildId, {
                        success: function(guild) {
                            promise.resolve(new Guild(guild));
                        },
                        error: function(object, error) {
                            $log.error("Error: " + error.code + " " + error.message);
                            promise.resolve(null);
                        }
                    });
                };

                service.getGuild = function(guildId) {
                    var deferred = $q.defer(),
                        ParseGuild = parse.Object.extend("Guild"),
                        query = new parse.Query(ParseGuild);

                    service._getGuildById(query, guildId, deferred);

                    return deferred.promise;
                };

                return service;
            }
        ]);
})(angular);