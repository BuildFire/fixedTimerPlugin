describe('Unit : fixedTimerPlugin design Enums', function () {
    var TAG_NAMES, STATUS_CODE, STATUS_MESSAGES;
    beforeEach(module('fixedTimerPluginDesign'));

    beforeEach(inject(function (_TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
        TAG_NAMES = _TAG_NAMES_;
        STATUS_CODE = _STATUS_CODE_;
        STATUS_MESSAGES = _STATUS_MESSAGES_;
    }));

    describe('Enum : TAG_NAMES', function () {
        it('TAG_NAMES should exist and be an object', function () {
            expect(typeof TAG_NAMES).toEqual('object');
        });
        it('TAG_NAMES.YOUTUBE_INFO should exist and equals to "GetInfo"', function () {
            expect(TAG_NAMES.TIMER_INFO).toEqual('timerInfo');
        });
    });

    describe('Enum : STATUS_CODE', function () {
        it('STATUS_CODE should exist and be an object', function () {
            expect(typeof STATUS_CODE).toEqual('object');
        });
        it('STATUS_CODE.INSERTED should exist and equals to "inserted"', function () {
            expect(STATUS_CODE.INSERTED).toEqual('inserted');
        });
        it('STATUS_CODE.UPDATED should exist and equals to "updated"', function () {
            expect(STATUS_CODE.UPDATED).toEqual('updated');
        });
        it('STATUS_CODE.NOT_FOUND should exist and equals to "NOTFOUND"', function () {
            expect(STATUS_CODE.NOT_FOUND).toEqual('NOTFOUND');
        });
    });

    describe('Unit : Enum STATUS_MESSAGES', function () {
        it('STATUS_MESSAGES should exist and be an object', function () {
            expect(typeof STATUS_MESSAGES).toEqual('object');
        });
        it('STATUS_MESSAGES.UNDEFINED_DATA should exist and equals to "Undefined data provided"', function () {
            expect(STATUS_MESSAGES.UNDEFINED_DATA).toEqual('Undefined data provided');
        });
        it('STATUS_MESSAGES.UNDEFINED_OPTIONS should exist and equals to "Undefined options provided"', function () {
            expect(STATUS_MESSAGES.UNDEFINED_OPTIONS).toEqual('Undefined options provided');
        });
        it('STATUS_MESSAGES.UNDEFINED_ID should exist and equals to "Undefined id provided"', function () {
            expect(STATUS_MESSAGES.UNDEFINED_ID).toEqual('Undefined id provided');
        });
        it('STATUS_MESSAGES.NOT_ITEM_ARRAY should exist and equals to "Array of Items not provided"', function () {
            expect(STATUS_MESSAGES.NOT_ITEM_ARRAY).toEqual('Array of Items not provided');
        });
        it('STATUS_MESSAGES.ITEM_ARRAY_FOUND should exist and equals to "Array of Items provided"', function () {
            expect(STATUS_MESSAGES.ITEM_ARRAY_FOUND).toEqual('Array of Items provided');
        });
    });
});