describe("Guild Service", function () {
    var GuildService, $log, $q, ParseService, $httpBackend;

    beforeEach(function () {
        module('guildOfGames.services.guildService');

        inject(function (_GuildService_, _$log_, _$q_, _ParseService_, $injector) {
            GuildService = _GuildService_;

            $log = _$log_;
            $q = _$q_;
            ParseService = _ParseService_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should call parseService and retrieve a list of Guilds", function () {
        var guilds = [{}];
        spyOn(ParseService, 'getTenMostRecentlyUpdatedGuilds').and.callFake(function () {
            return guilds;
        });

        var result = GuildService.getTenMostRecentlyUpdatedGuilds();

        expect(result).toBe(guilds);
        expect(ParseService.getTenMostRecentlyUpdatedGuilds).toHaveBeenCalled();
    });

    it("should call parseService and retrieve a specific Guild", function () {
        var guild = {},
            guildId = 123;
        spyOn(ParseService, 'getGuild').and.callFake(function (id) {
            expect(id).toBe(guildId);
            return guild;
        });

        var result = GuildService.getGuild(guildId);

        expect(result).toBe(guild);
        expect(ParseService.getGuild).toHaveBeenCalled();
    });

    it("should call parseService and retrieve a list of Guilds that a member belongs to", function () {
        var guilds = [{}, {}],
            userId = 123;
        spyOn(ParseService, 'getGuildsForUser').and.callFake(function (id) {
            expect(id).toBe(userId);
            return guilds;
        });

        var result = GuildService.getGuildsForUser(userId);

        expect(result).toBe(guilds);
        expect(ParseService.getGuildsForUser).toHaveBeenCalled();
    });

    it("should call parseService and retrieve a list of Users that are in a Guild's members", function () {
        var members = [{}, {}],
            guild = {};
        spyOn(ParseService, 'getGuildMembers').and.callFake(function (g) {
            expect(g).toBe(guild);
            return members;
        });

        var result = GuildService.getGuildMembers(guild);

        expect(result).toBe(members);
        expect(ParseService.getGuildMembers).toHaveBeenCalled();
    });
});