describe("Parse Service", function () {
    var ParseService, $log, $q, parse, User, Guild;

    beforeEach(function () {
        module('guildOfGames.services.parseService');

        inject(function (_ParseService_, _$log_, _$q_, _parse_, _User_, _Guild_, $injector) {
            ParseService = _ParseService_;
            $log = _$log_;
            $q = _$q_;
            parse = _parse_;
            User = _User_;
            Guild = _Guild_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should call parse.User.logOut", function () {
        spyOn(parse.User, 'logOut').and.callThrough();

        ParseService.logout();

        expect(parse.User.logOut).toHaveBeenCalled();
    });

    it("should call _login and return a promise", function () {
        var params = {
            username: 'Test',
            password: 'testing123'
        };

        spyOn(ParseService, '_login').and.callFake(function(pu, up, d) {
            expect(pu).toBe(Parse.User);
            expect(up).toBe(params);
            expect(d).toBeDefined();
        });

        var promise = ParseService.login(params);

        expect(ParseService._login).toHaveBeenCalled();
        expect(promise).toBeDefined();
    });

    it("should call user.logIn and handle a success", function () {
        var userParams = {
                username: 'Test',
                password: 'testing123'
            },
            parseUser = Parse.User,
            promise = {
                resolve: function () {
                }
            },
            response = Parse.User;

        spyOn(parseUser, 'logIn').and.callFake(function (a, b, c) {
            expect(a).toBe(userParams.username);
            expect(b).toBe(userParams.password);
            c.success(response);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBeDefined();
        });

        ParseService._login(parseUser, userParams, promise);

        expect(parseUser.logIn).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
    });

    it("should call user.logIn and handle an error", function () {
        var userParams = {
                username: 'Test',
                password: 'testing123'
            },
            parseUser = Parse.User,
            promise = {
                resolve: function () {
                }
            },
            error = {
                code: 123,
                message: 'error'
            };

        spyOn(parseUser, 'logIn').and.callFake(function (a, b, c) {
            expect(a).toBe(userParams.username);
            expect(b).toBe(userParams.password);
            c.error(null, error);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBe(null);
        });
        spyOn($log, 'error').and.callFake(function (msg) {
            expect(msg).toBe('Error: 123 error');
        });

        ParseService._login(parseUser, userParams, promise);

        expect(parseUser.logIn).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
        expect($log.error).toHaveBeenCalled();
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

    it("should call user.signUp and handle a success", function () {
        var user = new Parse.User(),
            promise = {
                resolve: function () {
                }
            };

        spyOn(user, 'signUp').and.callFake(function (a, b) {
            b.success(user);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBe(user);
        });

        ParseService._signUp(user, promise);

        expect(user.signUp).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
    });

    it("should call user.signUp and handle an error", function () {
        var user = new Parse.User(),
            promise = {
                resolve: function () {
                }
            },
            error = {
                code: 123,
                message: 'error'
            };

        spyOn(user, 'signUp').and.callFake(function (a, b) {
            b.error(user, error);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBe(null);
        });
        spyOn($log, 'error').and.callFake(function (msg) {
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
            phoneNumber: '123-456-7890'
        };

        spyOn(parse, 'User').and.callThrough();
        spyOn(ParseService, '_signUp').and.callFake(function (user, promise) {
            expect(user.username).toBe(parseUser.username);
            expect(user.password).toBe(parseUser.password);
            expect(user.email).toBe(parseUser.email);
            expect(user.firstName).toBe(parseUser.firstName);
            expect(user.lastName).toBe(parseUser.lastName);
            expect(user.phoneNumber).toBe(parseUser.phoneNumber);

            expect(promise).toBeDefined();
        });

        ParseService.createUser(parseUser);

        expect(parse.User).toHaveBeenCalled();
        expect(ParseService._signUp).toHaveBeenCalled();
    });

    it("should call query.find and handle a success for username retrieval", function () {
        var username = "thisName",
            promise = {
                resolve: function () {
                }
            },
            query = new Parse.Query();

        spyOn(Parse, 'Query').and.callFake(function (obj) {
            expect(obj).toBe(Parse.User);
            return query;
        });
        spyOn(query, 'equalTo').and.callFake(function (field, match) {
            expect(field).toBe('username');
            expect(match).toBe(username);
        });
        spyOn(query, 'find').and.callFake(function (obj) {
            obj.success([]);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBeFalsy();
        });

        ParseService.getUsersByUsername(username, promise);

        expect(query.find).toHaveBeenCalled();
        expect(query.equalTo).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
    });


    it("should call query.find and handle a success for guild list retrieval", function () {
        var query = new Parse.Query(),
            guilds = [{
                name: 'test', get: function () {
                }
            }],
            promise = {
                resolve: function () {
                }
            };

        spyOn(guilds, 'map').and.callThrough();
        spyOn(Guild, 'build').and.callThrough();
        spyOn(query, 'find').and.callFake(function (obj) {
            obj.success(guilds);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data[0] instanceof Guild).toBeTruthy();
        });

        ParseService._findGuilds(query, promise);

        expect(guilds.map).toHaveBeenCalled();
        expect(Guild.build).toHaveBeenCalled();
        expect(query.find).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
    });

    it("should call query.find and handle an error for guild list retrieval", function () {
        var query = new Parse.Query(),
            guilds = [{
                name: 'test', get: function () {
                }
            }],
            promise = {
                resolve: function () {
                }
            },
            error = {
                code: 123,
                message: 'error'
            };

        spyOn(query, 'find').and.callFake(function (obj) {
            obj.error(guilds, error);
        });
        spyOn(promise, 'resolve').and.callFake(function (data) {
            expect(data).toBe(null);
        });
        spyOn($log, 'error').and.callFake(function (msg) {
            expect(msg).toBe('Error: 123 error');
        });

        ParseService._findGuilds(query, promise);

        expect(query.find).toHaveBeenCalled();
        expect(promise.resolve).toHaveBeenCalled();
        expect($log.error).toHaveBeenCalled();
    });

    it("should retrieve a list of 10 guilds ordered by updatedAt", function () {
        var query = new Parse.Query();

        spyOn(parse.Object, 'extend').and.callThrough();
        spyOn(parse, 'Query').and.callFake(function (obj) {
            expect(obj).toBeDefined();

            return query;
        });
        spyOn(query, 'descending').and.callFake(function (str) {
            expect(str).toBe('updatedAt');
        });
        spyOn(query, 'limit').and.callFake(function (amt) {
            expect(amt).toBe(10);
        });
        spyOn(ParseService, '_findGuilds').and.callFake(function (queryObj, promise) {
            expect(queryObj).toBe(query);
            expect(promise).toBeDefined();
        });

        ParseService.getGuilds();

        expect(parse.Object.extend).toHaveBeenCalled();
        expect(parse.Query).toHaveBeenCalled();
        expect(query.descending).toHaveBeenCalled();
        expect(query.limit).toHaveBeenCalled();
        expect(ParseService._findGuilds).toHaveBeenCalled();
    });
});