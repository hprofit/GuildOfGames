describe("User Service", function () {
    var UserService, $log, $q, ParseService, $httpBackend;

    beforeEach(function () {
        module('guildOfGames.services.userService');

        inject(function (_UserService_, _$log_, _$q_, _ParseService_, $injector) {
            UserService = _UserService_;

            $log = _$log_;
            $q = _$q_;
            ParseService = _ParseService_;

            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should call parseService for the current user", function () {
        var parseUser = {};
        spyOn(ParseService, 'getCurrentUser').and.callFake(function () {
            return parseUser;
        });

        var user = UserService.getCurrentUser();

        expect(user).toBe(parseUser);
        expect(ParseService.getCurrentUser).toHaveBeenCalled();
    });

    it("should validate that two given passwords match", function() {
        var result = UserService._validatePasswordsMatch('first', 'first');

        expect(result).not.toBeDefined();


        result = UserService._validatePasswordsMatch('first', 'second');

        expect(result).toBe('Both passwords must match!');
    });

    it("should test to see if a string contains characters from a regex", function() {
        var regex = /([0-9])+/g;

        spyOn(_, 'isArray').and.callThrough();

        var result = UserService._isRegexInString('0', regex);

        expect(result).toBeTruthy();
        expect(_.isArray.calls.count()).toBe(1);

        result = UserService._isRegexInString('a', regex);

        expect(result).toBeFalsy();
        expect(_.isArray.calls.count()).toBe(2);
    });

    it("should a password has a number, lower, and upper case letters", function () {
        var pass = 'Testing123';

        spyOn(UserService, '_isRegexInString').and.callFake(function (password, regex) {
            expect(password).toBe(pass);
            expect(regex).toBeDefined();
            return true;
        });

        var result = UserService._validatePasswordContents(pass);

        expect(result).not.toBeDefined();
        expect(UserService._isRegexInString.calls.count()).toBe(3);
    });

    it("should a password has a number, lower, and upper case letters and return an error when it's missing one", function () {
        var pass = '';

        spyOn(UserService, '_isRegexInString').and.callFake(function (password, regex) {
            expect(password).toBe(pass);
            expect(regex).toBeDefined();
            return false;
        });

        var result = UserService._validatePasswordContents(pass);

        expect(result).toBe('Password must contain at least one lower case letter, upper case letter, and number!');
        expect(UserService._isRegexInString.calls.count()).toBe(3);
    });

    it("should validate a password's length", function() {
        var result = UserService._validatePasswordLength('testtest');

        expect(result).not.toBeDefined();


        result = UserService._validatePasswordLength('testtes');

        expect(result).toBe('Password must contain at least 8 characters!');
    });

    it("should test for a valid first and last name", function() {
        var first = 'First', last = 'Last';

        var result = UserService._validateFirstAndLastName(first, last);

        expect(result).not.toBeDefined();


        result = UserService._validateFirstAndLastName('', last);

        expect(result).toBe('You must enter a first and last name!');


        result = UserService._validateFirstAndLastName(first, '');

        expect(result).toBe('You must enter a first and last name!');


        result = UserService._validateFirstAndLastName('', '');

        expect(result).toBe('You must enter a first and last name!');
    });

    it("should test for a valid email", function() {
        var email = "test@mail.com";

        var result = UserService._validateEmail(email);

        expect(result).not.toBeDefined();


        result = UserService._validateEmail('');

        expect(result).toBe('Email must be valid!');
    });

    it("should validate a user and return an object with an errorMessages property", function () {
        var user = {
                password: 'Testing123',
                firstName: 'John', lastName: 'Doe',
                email: 'test@mail.com'
            },
            paswordMatch = 'test';

        spyOn(UserService, '_validatePasswordsMatch').and.callFake(function (pass, pass2) {
            expect(pass).toBe(user.password);
            expect(pass2).toBe(paswordMatch);
            return undefined;
        });
        spyOn(UserService, '_validatePasswordContents').and.callFake(function (pass) {
            expect(pass).toBe(user.password);
            return undefined;
        });
        spyOn(UserService, '_validatePasswordLength').and.callFake(function (pass) {
            expect(pass).toBe(user.password);
            return undefined;
        });
        spyOn(UserService, '_validateFirstAndLastName').and.callFake(function (first, last) {
            expect(first).toBe(user.firstName);
            expect(last).toBe(user.lastName);
            return undefined;
        });
        spyOn(UserService, '_validateEmail').and.callFake(function (email) {
            expect(email).toBe(user.email);
            return undefined;
        });

        var result = UserService.validateUser(user, paswordMatch);

        expect(result.errorMessages).toBeDefined();
        expect(UserService._validatePasswordsMatch).toHaveBeenCalled();
        expect(UserService._validatePasswordContents).toHaveBeenCalled();
        expect(UserService._validatePasswordLength).toHaveBeenCalled();
        expect(UserService._validateFirstAndLastName).toHaveBeenCalled();
        expect(UserService._validateEmail).toHaveBeenCalled();
    });

    it("should call parseService to validate a username does not exist", function () {
        var name = 'Name';
        spyOn(ParseService, 'getUsersByUsername').and.callFake(function (username, promise) {
            return promise;
        });

        var result = UserService.validateUserNameDoesNotExist(name);

        expect(result).toBeDefined();
        expect(ParseService.getUsersByUsername).toHaveBeenCalled();
    });

    it("should call parseService to create a user", function () {
        var parseUser = {};
        spyOn(ParseService, 'createUser').and.callFake(function () {
            return parseUser;
        });

        var user = UserService.createUser();

        expect(user).toBe(parseUser);
        expect(ParseService.createUser).toHaveBeenCalled();
    });
});