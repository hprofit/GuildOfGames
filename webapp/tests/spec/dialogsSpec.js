describe("Dialogs Service", function () {
    var $dialogs, modal, modalStack, compile;

    beforeEach(function () {
        module('dialogs.services');

        inject(function (_$dialogs_, _$modal_, _$modalStack_, _$compile_) {
            $dialogs = _$dialogs_;
            modal = _$modal_;
            modalStack = _$modalStack_;
            compile = _$compile_;
        });
    });

    it("should launch an error dialog", function () {
        spyOn(modal, 'open').and.callFake(function(params) {
            expect(params.templateUrl).toBe('/dialogs/error.html');
            expect(params.controller).toBe('errorDialogCtrl');
            expect(params.resolve.header).toBeDefined();
            expect(params.resolve.msg).toBeDefined();
        });

        $dialogs.error('Header', 'Errors');

        expect(modal.open).toHaveBeenCalled();
    });
});