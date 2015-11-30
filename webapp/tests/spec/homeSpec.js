describe('Home Controller', function () {
    'use strict';

    var scope, $state, UserService, currentUser, guilds,
        User;

    beforeEach(function () {
        module('guildOfGames.controllers.home',
            'guildOfGames.models.user');

        inject(function ($controller, $rootScope, _$state_, _UserService_, _User_, $injector) {
            scope = $rootScope.$new();
            $state = _$state_;
            UserService = $injector.get('UserService');
            User = _User_;

            currentUser = new User(new Parse.User());
            currentUser.id = 1;
            guilds = [{},{}];

            $controller('HomeController', {
                $scope: scope,
                $state: $state,
                UserService: UserService,
                currentUser: currentUser,
                guilds: guilds
            });
        });

        spyOn(scope, '$emit');
    });

    it("should have guilds on the scope", function() {
        expect(scope.guilds).toBe(guilds);
    });
});
