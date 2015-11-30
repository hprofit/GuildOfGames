(function (ng) {
    'use strict';

    ng.module('guildOfGames.controllers.header', [
        'ui.router',
        'ui.bootstrap',
        'dialogs',
        'guildOfGames.services.userService'
    ])
        .controller('HeaderController', ['$scope', '$window', '$state', 'UserService', 'currentUser',
            function ($scope, $window, $state, UserService, currentUser) {
                $scope.user = currentUser.id === 0 ? null : currentUser;
                $scope.userParams = {
                    username: '',
                    password: ''
                };

                $scope.logout = function () {
                    UserService.logout();
                    $window.location.reload();
                };

                $scope.handleLogin = function (response) {
                    // TODO: 101 is a tight coupling with Parse's error codes
                    if (response.code === 101) {
                        $scope.loginError = true;
                    }
                    else {
                        $state.go('app', $state.params, {reload: true});
                    }
                };

                $scope.login = function (event) {
                    $scope.cancelClose(event);
                    UserService.login($scope.userParams)
                        .then($scope.handleLogin);
                };

                $scope.cancelClose = function (event) {
                    event.stopPropagation();
                };

                $scope.goToUserProfile = function () {
                    if ($scope.user) {
                        $state.go('app.user.dashboard',
                            {userId: $scope.user.id},
                            {reload: true, inherit: true}
                        );
                    }
                };

                $scope.goToUserCreate = function () {
                    $state.go('app.user.create');
                };

                $scope.goToGuildCreate = function () {
                    $state.go('app.guild.create');
                };
            }
        ]);
}(angular));