describe('Header Controller', function () {
    'use strict';

    var scope, $window, $state, UserService, currentUser,
        User;

    beforeEach(function () {
        module('guildOfGames.controllers.header',
            'guildOfGames.models.user');

        inject(function ($controller, $rootScope, _$window_, _$state_, _UserService_, _User_, $injector) {
            scope = $rootScope.$new();
            $window = _$window_;
            $state = _$state_;
            UserService = $injector.get('UserService');
            User = _User_;

            currentUser = new User(new Parse.User());
            currentUser.id = 1;

            $controller('HeaderController', {
                $scope: scope,
                $window: $window,
                $state: $state,
                UserService: UserService,
                currentUser: currentUser
            });
        });

        spyOn(scope, '$emit');
    });

    it("should put the currentUser on the scope ahd have userParams for login", function () {
        expect(scope.user).toBe(currentUser);
        expect(scope.userParams.username).toBe('');
        expect(scope.userParams.password).toBe('');
    });

    it("should call UserService.logout and $window.location.reload()", function () {
        spyOn(UserService, 'logout').and.callFake(function () {
        });
        spyOn($window.location, 'reload').and.callFake(function () {
        });

        scope.logout();

        expect(UserService.logout).toHaveBeenCalled();
        expect($window.location.reload).toHaveBeenCalled();
    });

    it("should handle the UserService.login response", function () {
        spyOn($state, 'go').and.callFake(function (which, params, opts) {
            expect(which).toBe('app');
            expect(params).toBe($state.params);
            expect(opts.reload).toBeTruthy();
        });

        expect(scope.loginError).toBeFalsy();

        scope.handleLogin({code: 101});

        expect(scope.loginError).toBeTruthy();
        expect($state.go).not.toHaveBeenCalled();


        scope.handleLogin({code: 0});

        expect($state.go).toHaveBeenCalled();
    });

    it("should UserService.login and pass the scope's handleLogin method to the result's then method", function () {
        var event = {
            stopPropagation: function () {
            }
        };

        spyOn(event, 'stopPropagation').and.callThrough();
        spyOn(scope, 'handleLogin').and.callFake(function (response) {
        });
        spyOn(UserService, 'login').and.callFake(function (params) {
            expect(params).toBe(scope.userParams);
            return {
                then: function (fn) {
                    expect(fn).toBe(scope.handleLogin);
                    fn({});
                }
            }
        });

        scope.login(event);

        expect(event.stopPropagation).toHaveBeenCalled();
        expect(UserService.login).toHaveBeenCalled();
        expect(scope.handleLogin).toHaveBeenCalled();
    });

    it("should stop propogation of an event", function () {
        var event = {
            stopPropagation: function () {
            }
        };

        spyOn(event, 'stopPropagation').and.callThrough();

        scope.cancelClose(event);

        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it("should go to the user profile if a user exists", function () {
        spyOn($state, 'go').and.callFake(function (which, params, opts) {
            expect(which).toBe('app.user.dashboard');
            expect(params.userId).toBe(scope.user.id);
            expect(opts.reload).toBeTruthy();
            expect(opts.inherit).toBeTruthy();
        });

        scope.goToUserProfile();

        expect($state.go.calls.count()).toBe(1);


        scope.user = null;
        scope.goToUserProfile();

        expect($state.go.calls.count()).toBe(1);
    });

    it("should go to the user creation page", function () {
        spyOn($state, 'go').and.callFake(function (which) {
            expect(which).toBe('app.user.create');
        });

        scope.goToUserCreate();

        expect($state.go.calls.count()).toBe(1);
    });

    it("should go to the guild creation page", function () {
        spyOn($state, 'go').and.callFake(function (which) {
            expect(which).toBe('app.guild.create');
        });

        scope.goToGuildCreate();

        expect($state.go.calls.count()).toBe(1);
    });
});
