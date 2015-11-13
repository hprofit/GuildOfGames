describe("User Service", function () {
    var UserService, $log, ParseService, $httpBackend;

    beforeEach(function () {
        module('guildOfGames.services.userService');

        inject(function (_UserService_, _$log_, _ParseService_, $injector) {
            UserService = _UserService_;

            $log = _$log_;
            ParseService = _ParseService_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should call parseService for the current user", function () {
        var parseUser = {};
        spyOn(ParseService, 'getCurrentUser').and.callFake(function() {
            return parseUser;
        });

        var user = UserService.getCurrentUser();

        expect(user).toBe(parseUser);
        expect(ParseService.getCurrentUser).toHaveBeenCalled();
    });
});