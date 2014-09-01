describe('utility functions', function () {
    'use strict'

    describe('Test to print out jasmine version', function () {
        it('prints jasmine version', function () {
            console.log('jasmine-version:' + jasmine.getEnv().versionString());
        });
    });


    /*-------------------------------------- TEMPLATING UTILS */


    var template = '<h1>{{heading}}</h1>' +
            '<p>{{description}} <strong id="text">}} not parsed {{</strong></p>',
        output = '<h1>Fudge</h1>' +
            '<p>YOLO <strong id="text">}} not parsed {{</strong></p>',
        values = {
            heading: 'Fudge',
            description: 'YOLO'
        };

    describe('Templating utilities', function () {

        describe('parseTemplate function', function () {
            it('should be defined', function () {
                expect(fc.utils.parseTemplate).toBeDefined();
            });

            it('should return null when not passed both a template and an object', function () {
                expect(fc.utils.parseTemplate()).toBe(null);
                expect(fc.utils.parseTemplate(template)).toBe(null);
            });

            it('should return null when not passed both a template and an object', function () {
                expect(fc.utils.parseTemplate()).toBe(null);
                expect(fc.utils.parseTemplate(template)).toBe(null);
            });

            it('should parse template correctly', function () {
                expect(fc.utils.parseTemplate(template, values)).toBe(output);
            });

        });

    });


    /*-------------------------------------- DATE UTILS */


    describe('Date utilities', function () {


        describe('isEarlier function', function () {
            it('should be defined', function () {
                expect(fc.utils.isEarlier).toBeDefined();
            });

            it('should tell whether a date is earlier than another', function () {
                expect(fc.utils.isEarlier('2012-01-01', '2012-01-02')).toBe(true);
                expect(fc.utils.isEarlier('2012-11-11', '2012-11-10')).toBe(false);
            })
        });

        describe('isLater function', function () {

            it('should be defined', function () {
                expect(fc.utils.isLater).toBeDefined();
            });

            it('should tell whether a date is earlier than another', function () {
                expect(fc.utils.isLater('2012-01-02', '2012-01-01')).toBe(true);
                expect(fc.utils.isLater('2012-01-02', '2012-11-11')).toBe(false);
            });

            it('should reject non-ISO and non-Valid dates', function () {
                expect(fc.utils.isLater('2012-0102', '2012-11-01')).toBe(false);
                expect(fc.utils.isLater('2012-01-02', '2012-55-01')).toBe(false);
            });
        });

        describe('isValidISODate function', function () {
            it('should be defined', function () {
                expect(fc.utils.isValidISODate).toBeDefined();
            });

            it('should be has the correct ISO format', function () {
                expect(fc.utils.isValidISODate('2012-01-01')).toBe(true);
            });

            it('should return false for improperly formatted valid ISO date', function () {
                expect(fc.utils.isValidISODate('2021-7-12')).toBe(false);
            });

            it('should return false for date that cannot exist', function () {
                expect(fc.utils.isValidISODate('2021-17-12')).toBe(false);
            });
        });

        describe('formatDateFromISOtoGui', function () {
            it('should be defined', function () {
                expect(fc.utils.formatDateFromISOtoGui()).toBeDefined();
            });

            it('should return a valid gui-date (DD.MM.YYYY) from ISO', function () {
                expect(fc.utils.formatDateFromISOtoGui('2015-08-27')).toBe('27.08.2015');
                expect(fc.utils.formatDateFromISOtoGui('2015-08-03')).toBe('03.08.2015');
            });

            it('should return null if an improperly formatted or invalid date or nothing is provided', function () {
                expect(fc.utils.formatDateFromISOtoGui('2014-333-12')).toBe(null);
                expect(fc.utils.formatDateFromISOtoGui('2014-55-12')).toBe(null);
                expect(fc.utils.formatDateFromISOtoGui()).toBe(null);
            });
        });

        describe('formatDateFromGuiToISO', function () {
            it('should be defined', function () {
                expect(fc.utils.formatDateFromGuiToISO()).toBeDefined();
            });

            it('should return a valid iso-date (YYYY-MM-DD) from gui date', function () {
                expect(fc.utils.formatDateFromGuiToISO('27.08.2015')).toBe('2015-08-27');
                expect(fc.utils.formatDateFromGuiToISO('07.12.1999')).toBe('1999-12-07');
            });

            it('should return null if an improperly formatted or invalid date or nothing is provided', function () {
                expect(fc.utils.formatDateFromGuiToISO('27.8.2015')).toBe(null);
                expect(fc.utils.formatDateFromGuiToISO('7.08.2015')).toBe(null);
                expect(fc.utils.formatDateFromGuiToISO('.12.12.2014')).toBe(null);
                expect(fc.utils.formatDateFromGuiToISO('12.13.2020')).toBe(null);
                expect(fc.utils.formatDateFromGuiToISO()).toBe(null);

            });
        });

        describe('formatDateFromDateObjectToISO', function () {
            it('should be defined', function () {
                expect(fc.utils.formatDateFromDateObjectToISO()).toBeDefined();
            })

            it('should return an iso date', function () {
                var date = new Date(2010, 6, 26, 12);
                expect(fc.utils.formatDateFromDateObjectToISO(date)).toBe('2010-07-26')
            });
        });

        describe('addDaysToDate', function () {
            it('should be defined', function () {
                expect(fc.utils.addDaysToDate()).toBeDefined();
            });

            it('should add days to date and give back ISO date', function () {
                var date = new Date(2014, 5, 28, 12);
                expect(fc.utils.addDaysToDate(5, date)).toBe('2014-07-03');
            });

            it('should return today+3 days if nothing is provided', function () {
                var date = new Date,
                    isoDate = {};
                date.setDate(date.getDate() + 3);
                isoDate.year = date.getFullYear().toString();
                isoDate.day = date.getDate().toString();
                isoDate.month = date.getMonth() + 1;
                if (isoDate.month < 10) {
                    isoDate.month = '0' + isoDate.month.toString();
                }
                if (isoDate.day < 10) {
                    isoDate.day = '0' + isoDate.day.toString();
                }

                expect(fc.utils.addDaysToDate()).toBe(isoDate.year + '-' + isoDate.month + '-' + isoDate.day);
            });

            it('should add days to today and give back ISO date', function () {
                var date = new Date,
                    isoDate = {};
                date.setDate(date.getDate() + 5);
                isoDate.year = date.getFullYear().toString();
                isoDate.day = date.getDate().toString();
                isoDate.month = date.getMonth() + 1;
                if (isoDate.month < 10) {
                    isoDate.month = '0' + isoDate.month.toString();
                }
                if (isoDate.day < 10) {
                    isoDate.day = '0' + isoDate.day.toString();
                }

                expect(fc.utils.addDaysToDate(5)).toBe(isoDate.year + '-' + isoDate.month + '-' + isoDate.day);
            });

            it('should add days to today and give back ISO date', function () {
                var date = new Date(2014, 5, 28, 12);

                expect(fc.utils.addDaysToDate(null, date)).toBe('2014-07-01');
            });
        });


        describe('addMonthsToDate', function () {
            it('should be defined', function () {
                expect(fc.utils.addMonthsToDate).toBeDefined();
            });

            it('should add Months to date and give back ISO date', function () {
                var date = new Date(2014, 5, 28, 12);
                expect(fc.utils.addMonthsToDate(2, date)).toBe('2014-08-28');
            });

            it('should return month+1 days if nothing is provided', function () {
                var date = new Date,
                    isoDate = {};
                date.setDate(date.getDate());
                isoDate.year = date.getFullYear().toString();
                isoDate.day = date.getDate().toString();
                isoDate.month = date.getMonth() + 2;
                if (isoDate.month < 10) {
                    isoDate.month = '0' + isoDate.month.toString();
                }
                if (isoDate.day < 10) {
                    isoDate.day = '0' + isoDate.day.toString();
                }

                expect(fc.utils.addMonthsToDate()).toBe(isoDate.year + '-' + isoDate.month + '-' + isoDate.day);
            });

        });


        describe('isLeapYear function', function () {
            it('should be defined', function () {
                expect(fc.utils.isLeapYear).toBeDefined();
            });

            it('should be able to calculate leap years', function () {
                expect(fc.utils.isLeapYear(2012)).toBe(true);
                expect(fc.utils.isLeapYear(2011)).toBe(false);
                expect(fc.utils.isLeapYear(2000)).toBe(true);
            });
        });

        describe('getDaysInMonth function', function () {

            it('should be defined', function () {
                expect(fc.utils.getDaysInMonth).toBeDefined();
            });

            it('should be able to tell us how many days there are in a given month', function () {
                // jan
                expect(fc.utils.getDaysInMonth(2014, 0)).toBe(31);
                // feb
                expect(fc.utils.getDaysInMonth(2015, 1)).toBe(28);
                //leap year
                expect(fc.utils.getDaysInMonth(2016, 1)).toBe(29);
// and the rest
                expect(fc.utils.getDaysInMonth(2015, 2)).toBe(31);
                expect(fc.utils.getDaysInMonth(2015, 3)).toBe(30);
                expect(fc.utils.getDaysInMonth(2015, 4)).toBe(31);
                expect(fc.utils.getDaysInMonth(2015, 5)).toBe(30);
                expect(fc.utils.getDaysInMonth(2015, 6)).toBe(31);
                expect(fc.utils.getDaysInMonth(2015, 7)).toBe(31);
                expect(fc.utils.getDaysInMonth(2015, 8)).toBe(30);
                expect(fc.utils.getDaysInMonth(2015, 9)).toBe(31);
                expect(fc.utils.getDaysInMonth(2015, 10)).toBe(30);
                expect(fc.utils.getDaysInMonth(2015, 11)).toBe(31);
            });
        });

        describe('getDaysInDateRange function', function () {
            it('should be defined', function () {
                expect(fc.utils.getDaysInDateRange).toBeDefined();
            });

            it('should be able to calculate days between two dates 2 days apart', function () {
                expect(fc.utils.getDaysInDateRange('2014-12-12', '2014-12-14')).toBe(2);
            });

            it('should be able to calculate days between two dates 1 month apart', function () {
                expect(fc.utils.getDaysInDateRange('2014-08-01', '2014-09-01')).toBe(31);
            });

        });


    });


});


