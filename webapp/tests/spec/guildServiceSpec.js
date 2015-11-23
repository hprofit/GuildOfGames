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
        spyOn(ParseService, 'getGuilds').and.callFake(function () {
            return guilds;
        });

        var result = GuildService.getGuilds();

        expect(result).toBe(guilds);
        expect(ParseService.getGuilds).toHaveBeenCalled();
    });


    it("should call parseService and retrieve a specific Guild", function () {
        var guild = {};
        spyOn(ParseService, 'getGuild').and.callFake(function () {
            return guild;
        });

        var result = GuildService.getGuild(123);

        expect(result).toBe(guild);
        expect(ParseService.getGuild).toHaveBeenCalled();
    });
});