(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.user', [
        'ui.router',
        'ui.bootstrap',
        'dialogs',
        'guildOfGames.services.userService'
    ])
        .controller("UserCreateController", ['$scope', '$state', '$dialogs', 'UserService',
            function ($scope, $state, $dialogs, UserService) {
                $scope.user = {
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                };
                $scope.passwordMatch = '';

                $scope.handleCreateUser = function(response) {
                    $state.go('app');
                };

                $scope.handleValidateUserName = function(usernameExists) {
                    if (usernameExists) {
                        $dialogs.error('Oops!', 'Username has already been taken!');
                    }
                    else {
                        UserService.createUser($scope.user)
                            .then($scope.handleCreateUser);
                    }
                };

                $scope.submit = function() {
                    var errors = UserService.validateUser($scope.user, $scope.passwordMatch);

                    if (errors.errorMessages.length > 0) {
                        $dialogs.error('Oops!', errors);
                    }
                    else {
                        UserService.validateUserNameDoesNotExist($scope.user.username)
                            .then($scope.handleValidateUserName);
                    }
                };
            }
        ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.user.create', {
                    url: 'create',

                    resolve: {},

                    views: {
                        'main@': {
                            templateUrl: 'user/create.html',
                            controller: 'UserCreateController'
                        }
                    }
                });
        }]);
}(angular));