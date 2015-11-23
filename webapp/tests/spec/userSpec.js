describe("User Model", function () {
    var User, defaultOptions;

    beforeEach(function () {
        module('guildOfGames.models.user');

        inject(function (_User_) {
            User = _User_;

            defaultOptions = {
                id: 123,
                createdAt: new Date(),
                updatedAt: new Date(),
                email: 'test@mail.com',
                firstName: 'First',
                lastName: 'Last',
                username: 'Username',
                phoneNumber: '1234567890',
                guilds: [],
                profilePicture: '',

                get: function (which) {
                    return this[which];
                }
            };
        });
    });

    it("should instantiate properly", function () {
        var guild = new User(defaultOptions);

        expect(guild.id).toEqual(defaultOptions.id);
        expect(guild.createdAt).toEqual(defaultOptions.createdAt);
        expect(guild.updatedAt).toEqual(defaultOptions.updatedAt);

        expect(guild.description).toEqual(defaultOptions.description);
        expect(guild.guildImage).toEqual(defaultOptions.guildImage);
        expect(guild.guildName).toEqual(defaultOptions.guildName);
        expect(guild.members).toEqual(defaultOptions.members);
        expect(guild.tags).toEqual(defaultOptions.tags);
    });

});