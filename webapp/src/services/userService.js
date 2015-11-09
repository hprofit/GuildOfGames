(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.userService', [
        'restangular'
    ])
        .factory('UserService', ['$log', '$q', 'Restangular',
            function ($log, $q, Restangular) {
                /**
                 * "/users/me" GET and retrieves the current user
                 * @returns {*}
                 */
                var getCurrentUser = function () {
                    var deferred = $q.defer();

                    Restangular.all('users').customGET('me')
                        .then(function success(response) {
                            deferred.resolve(response);
                        })
                        .catch(function (response) {
                            $log.error('Failed to retrieve user info: ', response);
                            deferred.resolve(null);
                        }
                    );

                    return deferred.promise;
                };

                return {
                    getCurrentUser: getCurrentUser
                }
            }
        ]);
})(angular);