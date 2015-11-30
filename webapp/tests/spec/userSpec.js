describe("User Model", function () {
    var User, Guild, defaultOptions;

    beforeEach(function () {
        module('guildOfGames.models.user');

        inject(function (_User_, _Guild_) {
            User = _User_;
            Guild = _Guild_;

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
        var user = new User(defaultOptions);

        expect(user.id).toEqual(defaultOptions.id);
        expect(user.createdAt).toEqual(defaultOptions.createdAt);
        expect(user.updatedAt).toEqual(defaultOptions.updatedAt);

        expect(user.email).toEqual(defaultOptions.email);
        expect(user.firstName).toEqual(defaultOptions.firstName);
        expect(user.lastName).toEqual(defaultOptions.lastName);
        expect(user.phoneNumber).toEqual(defaultOptions.phoneNumber);
        expect(user.guilds).toEqual(defaultOptions.guilds);
        expect(user.profilePicture).toEqual(defaultOptions.profilePicture);
    });

    it("should build a new User", function () {
        var user = User.build(defaultOptions);

        expect(user instanceof User).toBeTruthy();
    });

    it("should return 'lastName, firstName' as a string", function () {
        var user = User.build(defaultOptions);

        var fullName = user.getFullName();

        expect(fullName).toBe("Last, First");
    });
});