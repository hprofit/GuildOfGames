describe("User Service", function () {
    var UserService, $log, $q, Restangular, $httpBackend;

    beforeEach(function () {
        module('guildOfGames.services.userService');

        inject(function (_UserService_, _$log_, _$q_, _Restangular_, $injector) {
            UserService = _UserService_;

            $log = _$log_;
            $q = _$q_;
            Restangular = _Restangular_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should get the current user", function () {
        spyOn(Restangular, "all").and.callThrough();
        $httpBackend.whenGET('/users/me').respond(200, {});

        UserService.getCurrentUser();

        expect(Restangular.all).toHaveBeenCalled();
        $httpBackend.flush();
    });

    it("should get the current user and handle an error", function () {
        spyOn(Restangular, "all").and.callThrough();

        $httpBackend.whenGET('/users/me').respond(400, '');

        UserService.getCurrentUser();

        expect(Restangular.all).toHaveBeenCalled();
        $httpBackend.flush();
    });
});