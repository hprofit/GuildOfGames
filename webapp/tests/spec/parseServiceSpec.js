describe("User Service", function () {
    var ParseService, $log, $q, parse;

    beforeEach(function () {
        module('guildOfGames.services.parseService');

        inject(function (_ParseService_, _$log_, _$q_, _parse_, $injector) {
            $log = _$log_;
            $q = _$q_;
            parse = _parse_;
            ParseService = _ParseService_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should call parse.User.current for the current user", function () {
        var parseUser = {
            id: 123
        };
        spyOn(parse.User, 'current').and.callFake(function () {
            return parseUser;
        });

        var user = ParseService.getCurrentUser();

        expect(user).toBe(parseUser);
        expect(parse.User.current).toHaveBeenCalled();
    });

    it("should call user.signUp and handle a success", function() {
        var user = new Parse.User(),
            promise = {
                resolve: function(){}
            };

        spyOn(user, 'signUp').and.callFake(function(a, b) {
            b.success(user);
        });
        spyOn(promise, 'resolve').and.callFake(function(data) {
            expect(data).toBe(user);
        });

        ParseService._signUp(user, promise);

        expect(user.signUp).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
    });

    it("should call user.signUp and handle an error", function() {
        var user = new Parse.User(),
            promise = {
                resolve: function(){}
            },
            error = {
                code: 123,
                message: 'error'
            };

        spyOn(user, 'signUp').and.callFake(function(a, b) {
            b.error(user, error);
        });
        spyOn(promise, 'resolve').and.callFake(function(data) {
            expect(data).toBe(null);
        });
        spyOn($log, 'error').and.callFake(function(msg){
            expect(msg).toBe('Error: 123 error');
        });

        ParseService._signUp(user, promise);

        expect(user.signUp).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
        expect($log.error).toHaveBeenCalled();
    });

    it("should create a user", function () {
        var parseUser = {
            username: 'Test',
            password: 'password',
            email: 'email@mail.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '123-456-7890'
        };

        spyOn(parse, 'User').and.callThrough();
        spyOn(ParseService, '_signUp').and.callFake(function (user, promise) {
            expect(user.username).toBe(parseUser.username);
            expect(user.password).toBe(parseUser.password);
            expect(user.email).toBe(parseUser.email);
            expect(user.firstName).toBe(parseUser.firstName);
            expect(user.lastName).toBe(parseUser.lastName);
            expect(user.phone).toBe(parseUser.phone);

            expect(promise).toBeDefined();
        });

        ParseService.createUser(parseUser);

        expect(parse.User).toHaveBeenCalled();
        expect(ParseService._signUp).toHaveBeenCalled();
    });
});