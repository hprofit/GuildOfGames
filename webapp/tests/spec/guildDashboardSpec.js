describe('Guild Dashboard Controller', function () {
    'use strict';

    var scope, $state, $dialogs, UserService, GuildService,
        selectedGuild, guildMembers;

    beforeEach(function () {
        module('guildOfGames.controllers.guild.dashboard');

        inject(function ($controller, $rootScope, _$state_, _$dialogs_, _UserService_, _GuildService_, $injector) {
            scope = $rootScope.$new();
            $state = _$state_;
            $dialogs = _$dialogs_;
            GuildService = $injector.get('GuildService');
            UserService =  $injector.get('UserService');

            selectedGuild = {};
            guildMembers = [];

            $controller('GuildDashboardController', {
                $scope: scope,
                $state: $state,
                $dialogs: $dialogs,
                UserService: UserService,
                GuildService: GuildService,
                selectedGuild: selectedGuild,
                guildMembers: guildMembers
            });
        });

        spyOn(scope, '$emit');
    });

    it("should have certain objects on the scope", function() {
        expect(scope.selectedGuild).toBeDefined();
        expect(scope.guildMembers).toBeDefined();
    });
});
