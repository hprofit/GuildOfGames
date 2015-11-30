describe('User Dashboard Controller', function () {
    'use strict';

    var scope, $state, $dialogs, UserService, currentUser, userGuilds,
        User, Guild;

    beforeEach(function () {
        module('guildOfGames.controllers.user.dashboard',
            'guildOfGames.models.user', 'guildOfGames.models.guild');

        inject(function ($controller, $rootScope, _$state_, _$dialogs_, _UserService_, _User_, _Guild_, $injector) {
            scope = $rootScope.$new();
            $state = _$state_;
            $dialogs = _$dialogs_;
            UserService = $injector.get('UserService');
            User = _User_;
            Guild = _Guild_;

            currentUser = new User(new Parse.User());
            userGuilds = [new Guild()];

            $controller('UserDashboardController', {
                $scope: scope,
                $state: $state,
                $dialogs: $dialogs,
                UserService: UserService,
                currentUser: currentUser,
                userGuilds: userGuilds
            });
        });

        spyOn(scope, '$emit');
    });

    it("should have the user and guilds on the scope", function() {
        expect(scope.user).toBe(currentUser);
        expect(scope.guilds).toBe(userGuilds);
    });
});
