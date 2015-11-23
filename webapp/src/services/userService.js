(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.userService', [
        'guildOfGames.services.parseService'
    ])
        .factory('UserService', ['$log', '$q', 'ParseService',
            function ($log, $q, ParseService) {
                var service = {};

                service.getCurrentUser = function () {
                    return ParseService.getCurrentUser();
                };

                service._validatePasswordsMatch = function (first, second) {
                    return first !== second ? 'Both passwords must match!' : undefined;
                };

                /**
                 * Given a string and a regex, evaluates whether or not the string contains the regex
                 * @param string - String to test against
                 * @param regex - Regex string
                 * @returns {boolean} -True if the string contains the regex, false if not
                 * @private
                 */
                service._isRegexInString = function (string, regex) {
                    var characterInArray = regex.exec(string);

                    return _.isArray(characterInArray);
                };

                /**
                 * Given a string, calls _isRegexInString for a number, lower case letter, and upper
                 * case letter and returns the result as a collective boolean
                 * @param password - String to test against
                 * @returns {boolean} - True if any the criteria are NOT found, false if they are all present
                 * @private
                 */
                service._validatePasswordContents = function (password) {
                    var number = service._isRegexInString(password, /([0-9])+/g),
                        upperCaseLetter = service._isRegexInString(password, /([A-Z])+/g),
                        lowerCaseLetter = service._isRegexInString(password, /([a-z])+/g);

                    return !(number && upperCaseLetter && lowerCaseLetter) ?
                        'Password must contain at least one lower case letter, upper case letter, and number!' : undefined;
                };

                service._validatePasswordLength = function (password) {
                    return password.length < 8 ? 'Password must contain at least 8 characters!' : undefined;
                };

                service._validateFirstAndLastName = function (firstName, lastName) {
                    return firstName.length === 0 || lastName.length === 0 ?
                        'You must enter a first and last name!' : undefined;
                };

                service._validateEmail = function (email) {
                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    return !re.test(email) ? 'Email must be valid!' : undefined;
                };

                service.validateUser = function (user, passwordMatch) {
                    var errors = [
                        service._validatePasswordsMatch(user.password, passwordMatch),
                        service._validatePasswordContents(user.password),
                        service._validatePasswordLength(user.password),
                        service._validateFirstAndLastName(user.firstName, user.lastName),
                        service._validateEmail(user.email)
                    ];

                    return {
                        errorMessages: _.without(errors, undefined)
                    };
                };

                service.validateUserNameDoesNotExist = function (username) {
                    var deferred = $q.defer();

                    ParseService.getUsersByUsername(username, deferred);

                    return deferred.promise;
                };

                service.createUser = function (user) {
                    return ParseService.createUser(user);
                };

                service.logout = function(){
                    return ParseService.logout();
                };

                service.login = function(userParams){
                    return ParseService.login(userParams);
                };

                return service;
            }
        ]);
})(angular);