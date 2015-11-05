describe("AStar Service", function () {
    var ParseService, Parse;

    beforeEach(function () {
        module('guildOfGames.services.parseService');

        inject(function (_ParseService_) {
            ParseService = _ParseService_;
        });
    });

    //it('should load some data from parse', function () {
    //    var stub = Parse.Mock.stubQueryFind(function (options) {
    //        return [new Parse.Object('User', {name: 'Antony'})]
    //    });
    //
    //    expect(getUser()).toBeUndefined();
    //
    //    loadUser(); //function that invokes Query.find
    //
    //    expect(getUser()).toBeDefined();
    //    expect(stub.callCount).toEqual(1); //do assertions on stub object if necessary
    //}));
    //
    //afterEach(inject(function () {
    //    Parse.Mock.clearStubs(); //manually dispose of stubs
    //}));

    it("should create a new user", function() {
//        var user = new Parse.User();
//        user.set("username", "my name");
//        user.set("password", "my pass");
//        user.set("email", "email@example.com");
//
//// other fields can be set just like with Parse.Object
//        user.set("phone", "650-555-0000");
//
//        user.signUp(null, {
//            success: function(user) {
//                // Hooray! Let them use the app now.
//            },
//            error: function(user, error) {
//                // Show the error message somewhere and let the user try again.
//                alert("Error: " + error.code + " " + error.message);
//            }
//        });


    });
});