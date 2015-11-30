(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.parseService', [
        'guildOfGames.parse',
        'guildOfGames.models.guild',
        'guildOfGames.models.user'
    ])
        .factory('ParseService', ['$rootScope', '$log', '$q', 'parse', 'User', 'Guild',
            function ($rootScope, $log, $q, parse, User, Guild) {
                var service = {};

                /**
                 * General Parse Methods
                 */

                service.success = function(object, objectToMap, promise) {
                    if (_.isArray(object)) {
                        promise.resolve(object.map(objectToMap.build));
                    }
                    else {
                        promise.resolve(new objectToMap(object));
                    }
                };

                service.error = function(object, error, promise) {
                    $rootScope.error = error;
                    $rootScope.$apply();
                    $log.error("Error: " + error.code + " " + error.message);
                    promise.resolve(error);
                };

                /**
                 * Calls a Parse Query's find method and handles the results by resolving a given promise
                 * @param query - Parse Query to call find() with
                 * @param objectToMap - Model to map the returned result(s) to
                 * @param promise - $q.defer() result to resolve upon completion
                 */
                service.queryFind = function(query, objectToMap, promise) {
                    query.find({
                        success: function (obj) {
                            service.success(obj, objectToMap, promise);
                        },
                        error: function (error, obj) {
                            service.error(obj, error, promise);
                        }
                    });
                };

                /**
                 * Calls a Parse Query's get method and handles the results by resolving a given promise
                 * @param query - Parse Query to call get() with
                 * @param objectId - ID of the object to be retrieved
                 * @param objectToMap - Model to map the returned result to
                 * @param promise - $q.defer() result to resolve upon completion
                 */
                service.queryGet = function(query, objectId, objectToMap, promise) {
                    query.get(objectId, {
                        success: function (obj) {
                            service.success(obj, objectToMap, promise);
                        },
                        error: function (error, obj) {
                            service.error(obj, error, promise);
                        }
                    });
                };

                /**
                 * Calls a Parse object's save method and handles the results by resolving a given promise
                 * @param object - Parse object to call save() with
                 * @param objectToMap - Model to map the returned result to
                 * @param promise - $q.defer() result to resolve upon completion
                 */
                service.objectSave = function(object, objectToMap, promise) {
                    object.save({
                        success: function (updatedObject) {
                            service.success(updatedObject, objectToMap, promise);
                        },
                        error: function (error, updatedObject) {
                            service.error(updatedObject, error, promise);
                        }
                    });
                };


                /**
                 * User Related Methods
                 */

                service.logout = function () {
                    parse.User.logOut();
                };

                service._login = function (parseUser, userParams, promise) {
                    parseUser.logIn(userParams.username, userParams.password, {
                        success: function (user) {
                            service.success(user, User, promise);
                        },
                        error: function (user, error) {
                            service.error(user, error, promise);
                        }
                    });
                };

                service.login = function (userParams) {
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
                            service.success(user, User, promise);
                        },
                        error: function (user, error) {
                            service.error(user, error, promise);
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
                    //user.set("userType", parse.Object.extend('Role'));
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


                /**
                 * Guild Related Methods
                 */

                service.getTenMostRecentlyUpdatedGuilds = function () {
                    var deferred = $q.defer(),
                        ParseGuild = parse.Object.extend("Guild"),
                        query = new parse.Query(ParseGuild);

                    query.descending("updatedAt");
                    query.limit(10);

                    service.queryFind(query, Guild, deferred);

                    return deferred.promise;
                };

                service.getGuild = function (guildId) {
                    var deferred = $q.defer(),
                        ParseGuild = parse.Object.extend("Guild"),
                        query = new parse.Query(ParseGuild);

                    service.queryGet(query, guildId, Guild, deferred);

                    return deferred.promise;
                };

                service.getGuildsForUser = function (user) {
                    var deferred = $q.defer(),
                        relation = user.parseObj.relation("guilds"),
                        query = relation.query();

                    service.queryFind(query, Guild, deferred);

                    return deferred.promise;
                };

                service.addUserToGuild = function (user, guild) {
                    var deferred = $q.defer(),
                        relation = guild.parseObj.relation("members");

                    relation.add(user);

                    service.objectSave(guild.parseObj, Guild, deferred);

                    return deferred.promise;
                };

                service.getGuildMembers = function (guild) {
                    var deferred = $q.defer(),
                        relation = guild.parseObj.relation("members"),
                        query = relation.query();

                    service.queryFind(query, User, deferred);

                    return deferred.promise;
                };

                return service;
            }
        ]);
})(angular);