(function (ng) {
    'use strict';
    ng.module('guildOfGames.services.parseService', [
    ])
        .factory('ParseService', [
            function () {
                Parse.initialize("VS6qVTDjXnCfXoME3OBRPzOYCsb4r3DlXNtwzYf2", "6upmt27h3LnmcOu5sYBjVF7OPEPSxKApXPgMySFX");

                var service = {};


                //var TestObject = Parse.Object.extend("TestObject");
                //var testObject = new TestObject();
                //testObject.save({foo: "bar"}).then(function(object) {
                //    alert("yay! it worked");
                //});

                return service;
            }
        ]);
})(angular);