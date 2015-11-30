beforeEach(function () {
    // This will run before any it function.
    // Resetting a global state so the change in this function is testable
    Parse = {
        initialize: function (a, b) {
        },
        User: function () {
            var self = this;
            this.set = function (a, b) {
                self[a] = b;
            };
            this.signUp = function (a, b) {
            };
            this.get = function (a) {
                return self[a];
            };
        },
        Object: {
            extend: function (a) {
                return {};
            },
            save: function () {
            }
        },
        Query: function () {
            var self = this;
            this.descending = function (a) {
            };
            this.limit = function (a) {
            };
            this.find = function () {
            };
            this.equalTo = function (a, b) {
            };
            this.get = function (a, b) {
            };
        }
    };

    Parse.User.current = function () {
    };
    Parse.User.logOut = function () {
    };
    Parse.User.logIn = function () {
    };
    Parse.User.get = function (a) {
    };
});