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
            this.signUp = function(a, b) {}
        }
    };

    Parse.User.current = function() {}
});