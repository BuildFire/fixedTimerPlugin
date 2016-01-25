describe('Unit : timerFilters widget Enums', function () {
    var TAG_NAMES, STATUS_CODE, STATUS_MESSAGES, LAYOUTS, PAGINATION;
    beforeEach(module('timerFilters'));
    describe('The test filter', function () {
        'use strict';

        var $filter;

        beforeEach(function () {
            module('timerFilters');

            inject(function (_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should Crop the Image', function () {
            // Arrange.
            var url = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150', result;
            var updatedUrl = 'http://s7obnu.cloudimage.io/s/crop/250x250/https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150';
            // Act.
            result = $filter('cropImage')(url, '250','250','no');

            // Assert.
            expect(result).toEqual(updatedUrl);
        });
    });
});