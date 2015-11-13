(function (ng) {
    'use strict';
    ng.module('guildOfGames.parse', [])
        .factory('parse', [function () {
            // TODO: Remove this when Parse REST API has been implemented
            Parse.initialize("VS6qVTDjXnCfXoME3OBRPzOYCsb4r3DlXNtwzYf2", "6upmt27h3LnmcOu5sYBjVF7OPEPSxKApXPgMySFX");

            return Parse;
        }
        ]);
})(angular);