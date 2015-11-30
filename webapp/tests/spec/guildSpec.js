describe("Guild Model", function () {
    var Guild, defaultOptions;

    beforeEach(function () {
        module('guildOfGames.models.guild');

        inject(function (_Guild_) {
            Guild = _Guild_;

            defaultOptions = {
                id: 123,
                createdAt: new Date(),
                updatedAt: new Date(),
                description: 'Test Description',
                guildImage: 'image',
                guildName: 'Guild Name',
                members: [],
                tags: [],
                get: function (which) {
                    return this[which];
                }
            };
        });
    });

    it("should instantiate properly", function () {
        var guild = new Guild(defaultOptions);

        expect(guild.id).toEqual(defaultOptions.id);
        expect(guild.createdAt).toEqual(defaultOptions.createdAt);
        expect(guild.updatedAt).toEqual(defaultOptions.updatedAt);

        expect(guild.description).toEqual(defaultOptions.description);
        expect(guild.guildImage).toEqual(defaultOptions.guildImage);
        expect(guild.guildName).toEqual(defaultOptions.guildName);
        expect(guild.members).toEqual(defaultOptions.members);
        expect(guild.tags).toEqual(defaultOptions.tags);
    });

    it("should build a new Guild", function () {
        var guild = Guild.build(defaultOptions);

        expect(guild instanceof Guild).toBeTruthy();
    });
});