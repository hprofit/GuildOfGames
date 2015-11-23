describe('User Create Controller', function () {
    'use strict';

    var scope, $state, $dialogs, UserService;

    beforeEach(function () {
        module('guildOfGames.controllers.user');

        inject(function ($controller, $rootScope, _$state_, _$dialogs_, _UserService_, $injector) {
            scope = $rootScope.$new();
            $state = _$state_;
            $dialogs = _$dialogs_;
            UserService = $injector.get('UserService');

            $controller('UserCreateController', {
                $scope: scope,
                $state: $state,
                $dialogs: $dialogs,
                UserService: UserService
            });
        });

        spyOn(scope, '$emit');
    });

    it("should handle the result of UserService.createUser", function() {
        spyOn($state, 'go').and.callFake(function(toState) {
            expect(toState).toBe('app');
        });

        scope.handleCreateUser({});

        expect($state.go).toHaveBeenCalled();
    });

    it("should handle the result of UserService.validateUserName if the name does NOT exist", function () {
        var result = {};

        spyOn(UserService, 'createUser').and.callFake(function (user) {
            expect(user).toBe(scope.user);

            return {
                then: function (fn) {
                    fn(result);
                }
            };
        });
        spyOn(scope, 'handleCreateUser').and.callFake(function (response) {
            expect(response).toBe(result);
        });

        scope.handleValidateUserName(false);

        expect(UserService.createUser).toHaveBeenCalled();
        expect(scope.handleCreateUser).toHaveBeenCalled();
    });

    it("should handle the result of UserService.validateUserName if the name does exist", function () {
        spyOn($dialogs, 'error').and.callFake(function (head, msg) {
            expect(head).toBe('Oops!');
            expect(msg).toBe('Username has already been taken!');
        });

        scope.handleValidateUserName(true);

        expect($dialogs.error).toHaveBeenCalled();
    });

    it("should call the UserService to validate a user and then call the UserService to validate the username isn't taken", function () {
        var errors = {
                errorMessages: []
            },
            result = 'dummy';

        spyOn(UserService, 'validateUser').and.callFake(function (user, password) {
            expect(user).toBe(scope.user);
            expect(password).toBe(scope.passwordMatch);
            return errors;
        });
        spyOn(UserService, 'validateUserNameDoesNotExist').and.callFake(function (username) {
            expect(username).toBe(scope.user.username);
            return {
                then: function (fn) {
                    fn(result);
                }
            };
        });
        spyOn(scope, 'handleValidateUserName').and.callFake(function (response) {
            expect(response).toBe(result);
        });

        scope.submit();

        expect(UserService.validateUser).toHaveBeenCalled();
        expect(UserService.validateUserNameDoesNotExist).toHaveBeenCalled();
        expect(scope.handleValidateUserName).toHaveBeenCalled();
    });

    it("should call the UserService to validate a user and launch a dialog with errors", function () {
        var errors = {
            errorMessages: ['Error']
        };

        spyOn(UserService, 'validateUser').and.callFake(function (user, password) {
            expect(user).toBe(scope.user);
            expect(password).toBe(scope.passwordMatch);
            return errors;
        });
        spyOn($dialogs, 'error').and.callFake(function (head, msg) {
            expect(head).toBe('Oops!');
            expect(msg).toBe(errors);
        });

        scope.submit();

        expect(UserService.validateUser).toHaveBeenCalled();
        expect($dialogs.error).toHaveBeenCalled();
    });
});
