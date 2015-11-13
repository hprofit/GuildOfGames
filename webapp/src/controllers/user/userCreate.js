(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.user', [
        'ui.router',
        'guildOfGames.services.userService'
    ])
        .controller("UserCreateController", ['$scope', 'UserService',
            function ($scope, UserService) {


                $scope.submit = function() {

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