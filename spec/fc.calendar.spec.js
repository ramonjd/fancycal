describe('calendar', function () {
    'use strict';

    // our calendar object



    var calendar,
        $body = $('body'),
        $bucket = $();





    describe('calendar instantiation', function () {
        beforeEach(function () {

        });

        afterEach(function () {
            $bucket.remove();
            calendar = null;
        });


        it('should be available in global scope', function () {
            expect(fc.calendar).toBeDefined();
        });

        it('should return when a calendar is passed no options', function () {
            calendar = new fc.calendar();
            expect(calendar.$elem).toBeUndefined();
        });

        it('should not instantiate when given an non-jQuery object', function () {
            $body.append('<div id="bucket"></div>');
            $bucket = $('#bucket');
            expect($body.find('#bucket').length).toBe(1);
            calendar = new fc.calendar({
                $elem: $bucket[0]
            });
            expect(calendar.$elem).toBeUndefined();
        });

        it('should instantiate when given a jQuery object', function () {
            calendar = new fc.calendar({
                $elem: $bucket
            });
            expect(calendar.$elem).toBeDefined();
        });

        it('should set the date to today + 3 days if none passed', function () {
            calendar = new fc.calendar({
                $elem: $bucket
            });
            expect(calendar.getDate()).toBe(fc.utils.addDaysToDate(3));
        });

    });

    describe('calendar API', function () {

        beforeEach(function () {
            $body.append('<div id="bucket"></div>');
            $bucket = $('#bucket');
            calendar = new fc.calendar({
                $elem: $bucket,
                date: '2015-12-12'
            });
        });

        afterEach(function () {
            $bucket.remove();
            calendar = null;
        });

        describe('calendar getDate()', function () {
            it('should be defined and return 2015-12-12', function () {
                expect(calendar.getDate).toBeDefined();
                expect(calendar.getDate()).toBe('2015-12-12');
            });
        });

        describe('calendar refresh()', function () {
            it('should be defined', function () {
                expect(calendar.refresh).toBeDefined();
            });
        });

        describe('calendar setDate()', function () {
            it('should be defined', function () {
                expect(calendar.setDate).toBeDefined();
            });

            it('should not set the date when invalid ISO date is passed', function () {
                calendar.setDate();
                expect(calendar.getDate()).toBe('2015-12-12');
                calendar.setDate('12-12-2015');
                expect(calendar.getDate()).toBe('2015-12-12');
                calendar.setDate('0001-02-1');
                expect(calendar.getDate()).toBe('2015-12-12');
            });

            it('should set date and refresh calendar when a valid date is passed', function () {
                spyOn(calendar, 'refresh');
                calendar.setDate('2014-10-09');
                expect(calendar.getDate()).toBe('2014-10-09');
                expect(calendar.refresh).toHaveBeenCalled();
            });
        });

        describe('calendar setMinDate() and getMinDate()', function () {

            it('should be defined', function () {
                expect(calendar.setMinDate).toBeDefined();
                expect(calendar.getMinDate).toBeDefined();
            });

            it('should setMinDate', function () {
                calendar.setMinDate('2011-08-08');
                expect(calendar.getMinDate()).toBe('2011-08-08');
            });

            it('should refresh calendar if minDate is later than current date', function () {
                calendar.setMinDate('2013-01-07');
                expect($bucket.find('caption').text()).not.toBe('Januar 2013');
                calendar.setMinDate('2018-01-07');
                expect($bucket.find('caption').text()).toBe('Januar 2018');
            });

        });

        describe('calendar setStartDate() and setEndDate() and toggleRange()', function () {

            it('should be defined', function () {
                expect(calendar.setStartDate).toBeDefined();
                expect(calendar.setEndDate).toBeDefined();
                expect(calendar.toggleRange).toBeDefined();
            });

        });

        describe('calendar setMaxDate() and getMaxDate()', function () {
            it('should be defined', function () {
                expect(calendar.setMaxDate).toBeDefined();
                expect(calendar.getMaxDate).toBeDefined();
            });

            it('should setMaxDate', function () {
                calendar.setMaxDate('2020-08-08');
                expect(calendar.getMaxDate()).toBe('2020-08-08');
            });

            it('should refresh calendar if maxDate is earlier than current date', function () {
                calendar.setMaxDate('2018-01-07');
                expect($bucket.find('caption').text()).not.toBe('Januar 2018');
                calendar.setMaxDate('2013-01-07');
                expect($bucket.find('caption').text()).toBe('Januar 2013');
            });
        });

        describe('calendar setNextMonth()', function () {
            it('should be defined', function () {
                expect(calendar.setNextMonth).toBeDefined();
            });

            it('should shift the current date ahead 1 month', function () {
                calendar.setNextMonth();
                expect($bucket.find('caption').text()).toBe('Januar 2016');
                calendar.setNextMonth();
                expect($bucket.find('caption').text()).toBe('Februar 2016');
            });
        });

        describe('calendar setPreviousMonth()', function () {
            it('should be defined', function () {
                expect(calendar.setPreviousMonth).toBeDefined();
            });

            it('should shift the current date back 1 month', function () {
                calendar.setPreviousMonth();
                expect($bucket.find('caption').text()).toBe('November 2015');
                calendar.setPreviousMonth();
                expect($bucket.find('caption').text()).toBe('Oktober 2015');
                calendar.setDate('2011-01-01');
                calendar.setPreviousMonth();
                expect($bucket.find('caption').text()).toBe('Dezember 2010');
            });
        });

    });


    describe('calendar rendering', function () {

        beforeEach(function () {
            $body.append('<div id="bucket"></div>');
            $bucket = $('#bucket');
            calendar = new fc.calendar({
                $elem: $bucket,
                date: '2014-10-09'
            });
        });

        afterEach(function () {
            $bucket.remove();
            calendar = null;
        });

        it('should render a table in $bucket', function () {
            expect($bucket.find('table').length).toBe(1);
        });

        it('should render a table head and fill with day names', function () {
            expect($bucket.find('thead').length).toBe(1);
            expect($bucket.find('th').length).toBe(7);
            expect($bucket.find('th').eq(0).text()).toBe('Mo');
            expect($bucket.find('th').eq(1).text()).toBe('Di');
            expect($bucket.find('th').eq(2).text()).toBe('Mi');
            expect($bucket.find('th').eq(3).text()).toBe('Do');
            expect($bucket.find('th').eq(4).text()).toBe('Fr');
            expect($bucket.find('th').eq(5).text()).toBe('Sa');
            expect($bucket.find('th').eq(6).text()).toBe('So');
        });

        it('should render a caption and fill with month name and year', function () {
            expect($bucket.find('caption').text()).toBe('Oktober 2014');
        });

        it('should render the month correctly in the table under the correct days', function () {
            expect($bucket.find('td').eq(0).hasClass('empty')).toBe(true);
            expect($bucket.find('td').eq(1).hasClass('empty')).toBe(true);

            calendar.setDate('2014-06-01');
            // empty cell followed by the first of the month
            expect($bucket.find('td').eq(5).hasClass('empty')).toBe(true);
            expect($bucket.find('td').eq(6).find('button').text()).toBe('1');

            // last day of the month followed by empty cell
            expect($bucket.find('td').eq(35).find('button').text()).toBe('30');
            expect($bucket.find('td').eq(36).hasClass('empty')).toBe(true);
        });

        it('should render disabled days correctly when minDate set', function () {
            calendar.setDate('2014-06-22').setMinDate('2014-06-03').refresh();
            //min
            expect($bucket.find('td').eq(7).hasClass('disabled')).toBe(true);
            expect($bucket.find('td').eq(8).hasClass('disabled')).toBe(false);
        });

        it('should render disabled days correctly when maxDate set', function () {
            calendar.setDate('2014-06-22').setMaxDate('2014-06-28').refresh();
            //max
            expect($bucket.find('td').eq(33).hasClass('disabled')).toBe(false);
            expect($bucket.find('td').eq(34).hasClass('disabled')).toBe(true);
            expect($bucket.find('td').eq(35).hasClass('disabled')).toBe(true);
        });

        it('should create the correct amount of cells', function () {
            calendar.setDate('2014-06-01');
            expect($bucket.find('td').length).toBe(42);
            calendar.setDate('2014-07-01');
            expect($bucket.find('td').length).toBe(35);
        });

        it('should not highlight range when rangeOn not passed as true', function () {

        });

    });


});
