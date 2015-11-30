describe("Parse Service", function () {
    var ParseService, $rootScope, $log, $q, $httpBackend, parse, User, Guild;

    beforeEach(function () {
        module('guildOfGames.services.parseService');

        inject(function (_ParseService_, _$rootScope_, _$log_, _$q_, _parse_, _User_, _Guild_, $injector) {
            ParseService = _ParseService_;
            $rootScope = _$rootScope_;
            $log = _$log_;
            $q = _$q_;
            parse = _parse_;
            User = _User_;
            Guild = _Guild_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    describe("General Functionality", function () {

        it("should handle a success for an array result", function () {
            var promise = {
                    resolve: function () {
                    }
                },
                data = [];

            spyOn(_, 'isArray').and.callThrough();
            spyOn(promise, 'resolve').and.callFake(function (what) {
                expect(what instanceof Array).toBeTruthy();
            });
            spyOn(data, 'map').and.callFake(function (fn) {
                return [];
            });

            ParseService.success(data, User, promise);

            expect(_.isArray).toHaveBeenCalled();
            expect(promise.resolve).toHaveBeenCalled();
            expect(data.map).toHaveBeenCalled();
        });

        it("should handle a success for an non-array result", function () {
            var promise = {
                    resolve: function () {
                    }
                },
                data = null;

            spyOn(_, 'isArray').and.callThrough();
            spyOn(promise, 'resolve').and.callFake(function (what) {
                expect(what instanceof User).toBeTruthy();
            });

            ParseService.success(data, User, promise);

            expect(_.isArray).toHaveBeenCalled();
            expect(promise.resolve).toHaveBeenCalled();
        });

        it("should handle an error result", function () {
            var promise = {
                    resolve: function () {
                    }
                },
                error = {
                    code: 101,
                    message: 'error'
                };

            spyOn(promise, 'resolve').and.callFake(function (data) {
                expect(data).toBe(error);
            });
            spyOn($log, 'error').and.callFake(function (msg) {
                expect(msg).toBe('Error: 101 error');
            });

            ParseService.error(null, error, promise);

            expect(promise.resolve).toHaveBeenCalled();
            expect($log.error).toHaveBeenCalled();
            expect($rootScope.error).toBe(error);
        });


        it("should call query.find and handle a success for data retrieval", function () {
            var query = new Parse.Query(),
                result = {},
                promise = {
                    resolve: function () {
                    }
                };

            spyOn(query, 'find').and.callFake(function (obj) {
                obj.success(result);
            });
            spyOn(ParseService, 'success').and.callFake(function (obj, objToMap, pro) {
                expect(obj).toBe(result);
                expect(objToMap).toBe(User);
                expect(pro).toBe(promise);
            });

            ParseService.queryFind(query, User, promise);

            expect(query.find).toHaveBeenCalled();
            expect(ParseService.success).toHaveBeenCalled();
        });

        it("should call query.find and handle an error for data retrieval", function () {
            var query = new Parse.Query(),
                result = {},
                promise = {
                    resolve: function () {
                    }
                },
                error = {
                    code: 123,
                    message: 'error'
                };

            spyOn(query, 'find').and.callFake(function (obj) {
                obj.error(error, result);
            });
            spyOn(ParseService, 'error').and.callFake(function (obj, err, pro) {
                expect(obj).toBe(result);
                expect(err).toBe(error);
                expect(pro).toBe(promise);
            });

            ParseService.queryFind(query, User, promise);

            expect(query.find).toHaveBeenCalled();
            expect(ParseService.error).toHaveBeenCalled();
        });


        it("should call query.get and handle a success for object retrieval", function () {
            var query = new Parse.Query(),
                result = {},
                objId = 123,
                promise = {
                    resolve: function () {
                    }
                };

            spyOn(query, 'get').and.callFake(function (id, obj) {
                expect(id).toBe(objId);
                obj.success(result);
            });
            spyOn(ParseService, 'success').and.callFake(function (obj, objToMap, pro) {
                expect(obj).toBe(result);
                expect(objToMap).toBe(User);
                expect(pro).toBe(promise);
            });

            ParseService.queryGet(query, objId, User, promise);

            expect(query.get).toHaveBeenCalled();
            expect(ParseService.success).toHaveBeenCalled();
        });

        it("should call query.get and handle an error for object retrieval", function () {
            var query = new Parse.Query(),
                result = {},
                objId = 123,
                promise = {
                    resolve: function () {
                    }
                },
                error = {
                    code: 123,
                    message: 'error'
                };

            spyOn(query, 'get').and.callFake(function (id, obj) {
                expect(id).toBe(objId);
                obj.error(error, result);
            });
            spyOn(ParseService, 'error').and.callFake(function (obj, err, pro) {
                expect(obj).toBe(result);
                expect(err).toBe(error);
                expect(pro).toBe(promise);
            });

            ParseService.queryGet(query, objId, User, promise);

            expect(query.get).toHaveBeenCalled();
            expect(ParseService.error).toHaveBeenCalled();
        });


        it("should call object.save and handle a success", function () {
            var object = Parse.Object,
                result = {},
                promise = {
                    resolve: function () {
                    }
                };

            spyOn(object, 'save').and.callFake(function (obj) {
                obj.success(result);
            });
            spyOn(ParseService, 'success').and.callFake(function (obj, objToMap, pro) {
                expect(obj).toBe(result);
                expect(objToMap).toBe(User);
                expect(pro).toBe(promise);
            });

            ParseService.objectSave(object, User, promise);

            expect(object.save).toHaveBeenCalled();
            expect(ParseService.success).toHaveBeenCalled();
        });

        it("should call object.save and handle an error", function () {
            var object = Parse.Object,
                result = {},
                promise = {
                    resolve: function () {
                    }
                },
                error = {
                    code: 123,
                    message: 'error'
                };

            spyOn(object, 'save').and.callFake(function (obj) {
                obj.error(error, result);
            });
            spyOn(ParseService, 'error').and.callFake(function (obj, err, pro) {
                expect(obj).toBe(result);
                expect(err).toBe(error);
                expect(pro).toBe(promise);
            });

            ParseService.objectSave(object, User, promise);

            expect(object.save).toHaveBeenCalled();
            expect(ParseService.error).toHaveBeenCalled();
        });
    });

    describe("User Functionality", function () {
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

            spyOn(ParseService, '_login').and.callFake(function (pu, up, d) {
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
                    code: 101,
                    message: 'error'
                };

            spyOn(parseUser, 'logIn').and.callFake(function (a, b, c) {
                expect(a).toBe(userParams.username);
                expect(b).toBe(userParams.password);
                c.error(null, error);
            });
            spyOn(ParseService, 'error').and.callFake(function (obj, err, pro) {
                expect(obj).toBe(null);
                expect(err).toBe(error);
                expect(pro).toBe(promise);
            });

            ParseService._login(parseUser, userParams, promise);

            expect(parseUser.logIn).toHaveBeenCalled();
            expect(ParseService.error).toHaveBeenCalled();
        });

        it("should call parse.User.current for the current user", function () {
            var parseUser = new Parse.User();
            spyOn(parse.User, 'current').and.callFake(function () {
                return parseUser;
            });

            var user = ParseService.getCurrentUser();

            expect(user instanceof User).toBeTruthy();
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
            spyOn(ParseService, 'success').and.callFake(function (obj, objToMap, pro) {
                expect(obj).toBe(user);
                expect(objToMap).toBe(User);
                expect(pro).toBe(promise);
            });

            ParseService._signUp(user, promise);

            expect(user.signUp).toHaveBeenCalled();
            expect(ParseService.success).toHaveBeenCalled();
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
            spyOn(ParseService, 'error').and.callFake(function (obj, err, pro) {
                expect(obj).toBe(user);
                expect(err).toBe(error);
                expect(pro).toBe(promise);
            });

            ParseService._signUp(user, promise);

            expect(user.signUp).toHaveBeenCalled();
            expect(ParseService.error).toHaveBeenCalled();
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
    });

    describe("Guild Functionality", function () {
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
            spyOn(ParseService, 'queryFind').and.callFake(function (queryObj, objToMap, promise) {
                expect(queryObj).toBe(query);
                expect(objToMap).toBe(Guild);
                expect(promise).toBeDefined();
            });

            ParseService.getTenMostRecentlyUpdatedGuilds();

            expect(parse.Object.extend).toHaveBeenCalled();
            expect(parse.Query).toHaveBeenCalled();
            expect(query.descending).toHaveBeenCalled();
            expect(query.limit).toHaveBeenCalled();
            expect(ParseService.queryFind).toHaveBeenCalled();
        });

        it("should retrieve specific Guild object", function () {
            var query = new Parse.Query(),
                guildId = 'ABC123';

            spyOn(parse.Object, 'extend').and.callThrough();
            spyOn(parse, 'Query').and.callFake(function (obj) {
                expect(obj).toBeDefined();

                return query;
            });
            spyOn(ParseService, 'queryGet').and.callFake(function (queryObj, id, objToMap, promise) {
                expect(queryObj).toBe(query);
                expect(id).toBe(guildId);
                expect(objToMap).toBe(Guild);
                expect(promise).toBeDefined();
            });

            ParseService.getGuild(guildId);

            expect(parse.Object.extend).toHaveBeenCalled();
            expect(parse.Query).toHaveBeenCalled();
            expect(ParseService.queryGet).toHaveBeenCalled();
        });

        it("should retrieve a list of Guilds a User belongs to", function () {
            var user = new User(),
                queryObj = new Parse.Query(),
                relationReturnObj = {
                    query: function(){
                        return queryObj;
                    }
                },
                relation = function (which) {
                    expect(which).toBe('guilds');
                    return relationReturnObj;
                };

            user.parseObj = {
                relation: relation
            };

            spyOn(user.parseObj, 'relation').and.callThrough();
            spyOn(relationReturnObj, 'query').and.callThrough();
            spyOn(ParseService, 'queryFind').and.callFake(function (query, objToMap, promise) {
                expect(query).toBe(queryObj);
                expect(objToMap).toBe(Guild);
                expect(promise).toBeDefined();
            });


            ParseService.getGuildsForUser(user);

            expect(user.parseObj.relation).toHaveBeenCalled();
            expect(relationReturnObj.query).toHaveBeenCalled();
            expect(ParseService.queryFind).toHaveBeenCalled();
        });

        it("should add a User to a Guild", function () {
            var user = new User(),
                guild = new Guild(),
                relationReturnObj = {
                    add: function (what) {
                        expect(what).toBe(user);
                    }
                },
                relation = function (which) {
                    expect(which).toBe('members');
                    return relationReturnObj;
                };

            guild.parseObj = {
                relation: relation,
                save: function () {
                }
            };

            spyOn(guild.parseObj, 'relation').and.callThrough();
            spyOn(relationReturnObj, 'add').and.callThrough();
            spyOn(ParseService, 'objectSave').and.callFake(function (parseObj, objToMap, promise) {
                expect(parseObj).toBe(guild.parseObj);
                expect(objToMap).toBe(Guild);
                expect(promise).toBeDefined();
            });


            ParseService.addUserToGuild(user, guild);

            expect(guild.parseObj.relation).toHaveBeenCalled();
            expect(relationReturnObj.add).toHaveBeenCalled();
            expect(ParseService.objectSave).toHaveBeenCalled();
        });

        it("should retrieve a list of Guild members as Users", function () {
            var users = [new User()],
                guild = new Guild(),
                queryObj = new Parse.Query(),
                relationReturnObj = {
                    query: function(){
                        return queryObj;
                    }
                },
                relation = function (which) {
                    expect(which).toBe('members');
                    return relationReturnObj;
                };

            guild.parseObj = {
                relation: relation,
                save: function () {
                }
            };

            spyOn(guild.parseObj, 'relation').and.callThrough();
            spyOn($q, 'defer').and.callThrough();
            spyOn(ParseService, 'queryFind').and.callFake(function (query, objToMap, promise) {
                expect(query).toBe(queryObj);
                expect(objToMap).toBe(User);
                expect(promise).toBeDefined();
            });


            ParseService.getGuildMembers(guild);

            expect(guild.parseObj.relation).toHaveBeenCalled();
            expect($q.defer).toHaveBeenCalled();
            expect(ParseService.queryFind).toHaveBeenCalled();
        });
    });
});