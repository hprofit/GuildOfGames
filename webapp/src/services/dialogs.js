/**
 * Note: This version requires Angular UI Bootstrap >= v0.6.0
 * This code lifted from here: https://github.com/m-e-conroy/angular-dialog-service/blob/master/dialogs.js
 */

//== Controllers =============================================================//

(function (ng) {
    angular.module('dialogs.controllers', [
        'ui.bootstrap.modal',
        'ui.router'
    ])

    /**
     * Error Dialog Controller
     */
        .controller('errorDialogCtrl', ['$scope', '$modalInstance', 'header', 'msg', function ($scope, $modalInstance, header, msg) {
            //-- Variables -----//
            $scope.header = (angular.isDefined(header)) ? header : 'Error';

            $scope.msg = msg;

            // if message contains a list of message, then unroll and use that for the message.
            if (angular.isArray(msg.errorMessages)) {
                var retMsg = "<ul>";
                angular.forEach(msg.errorMessages, function (value) {
                    retMsg += "<li>" + value + "</li>";
                }, retMsg);
                retMsg += "</ul>";

                $scope.msg = retMsg;
            }

            //-- Methods -----//

            $scope.close = function () {
                $modalInstance.close();
            }; // end close
        }]); // end ErrorDialogCtrl

//== Services ================================================================//

    angular.module('dialogs.services', [
        'ui.bootstrap.modal',
        'dialogs.controllers'
    ])
    /**
     * Dialogs Service
     */
        .factory('$dialogs', ['$modal', '$modalStack', '$compile', function ($modal, $modalStack, $compile) {

            return {
                error: function (header, msg) {
                    return $modal.open({
                        templateUrl: '/dialogs/error.html',
                        controller: 'errorDialogCtrl',
                        resolve: {
                            header: function () {
                                return angular.copy(header);
                            },
                            msg: function () {
                                return angular.copy(msg);
                            }
                        }
                    }); // end modal.open
                } // end error
            };
        }]); // end dialogs / dialogs.services


//== Module ==================================================================//

    angular.module('dialogs', [
        'dialogs.services',
        'ngSanitize'
    ]) // requires angular-sanitize.min.js (ngSanitize) //code.angularjs.org/1.2.1/angular-sanitize.min.js

        // Add default templates via $templateCache
        .run(['$templateCache', function ($templateCache) {

            var errorTemplate = '<div class="modal-header dialog-header-error">' +
                '<button type="button" class="close" ng-click="close()">&times;</button>' +
                '   <h4 class="modal-title text-danger">' +
                '        <span class="glyphicon glyphicon-warning-sign"></span>' +
                '        <span ng-bind-html="header"></span>' +
                '    </h4>' +
                '</div>' +
                '<div class="modal-body text-danger" ng-bind-html="msg" > </div>' +
                '<div class="modal-footer">' +
                '    <button type="button" class="btn btn-default" ng-click="close()">Close</button>' +
                '</div>';

            $templateCache.put('/dialogs/error.html', errorTemplate);

        }]); // end run / dialogs
})(angular);

