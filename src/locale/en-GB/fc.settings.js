/*
 en-GB Settings
 */
var fc = fc || {};
fc.settings = (function () {
    'use strict';
    return {
        'LOCALE': 'en-GB',
        'LANG': {
            'previousMonth': 'Previous month',
            'nextMonth': 'Next month',
            'months': [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            'weekdays': [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            'weekdaysShort': [
                'Su',
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa'
            ],
            'holiday': 'Public holiday',
            'today': 'Today',
            'selected': 'Selected',
            'select_holiday': 'Show holidays',
            'week': 'Week',
            'weeks': 'Weeks',
            'day': 'Day',
            'days': 'Days',
            'between': 'between',
            'and': 'and',
            'from': 'from',
            'until': 'until',
            'placeholder': 'dd.mm.yyyy',
            'travelduration': 'I\'d like to travel for:',
            'done': 'Done',
            'outboundDate': 'Outbound date',
            'inboundDate': 'Inbound date',
            'asselected': 'Exactly as selected',
            'errors': {
                'validDate': 'That date isn\'t valid',
                'validRange': 'The duration doesn\'t match your dates'
            }

        },
        'CALENDAR': {
            'firstDay': 1,
            'duration': [
                {
                    'label': 'Exactly as selected',
                    'value': '0'
                },
                {
                    'label': '1 week',
                    'value': '1w'
                },
                {
                    'label': '2 weeks',
                    'value': '2w'
                },
                {
                    'label': '3 weeks',
                    'value': '3w'
                },
                {
                    'label': '4 weeks',
                    'value': '4w'
                },
                {
                    'label': '1 day',
                    'value': '1'
                },
                {
                    'label': '2 days',
                    'value': '2'
                },
                {
                    'label': '3 days',
                    'value': '3'
                },
                {
                    'label': '4 days',
                    'value': '4'
                },
                {
                    'label': '5 days',
                    'value': '5'
                },
                {
                    'label': '6 days',
                    'value': '6'
                },
                {
                    'label': '7 days',
                    'value': '7'
                },
                {
                    'label': '8 days',
                    'value': '8'
                },
                {
                    'label': '9 days',
                    'value': '9'
                },
                {
                    'label': '10 days',
                    'value': '10'
                },
                {
                    'label': '11 days',
                    'value': '11'
                },
                {
                    'label': '12 days',
                    'value': '12'
                },
                {
                    'label': '13 days',
                    'value': '13'
                },
                {
                    'label': '14 days',
                    'value': '14'
                },
                {
                    'label': '15 days',
                    'value': '15d'
                },
                {
                    'label': '16 days',
                    'value': '16'
                },
                {
                    'label': '17 days',
                    'value': '17'
                },
                {
                    'label': '18 days',
                    'value': '18'
                },
                {
                    'label': '19 days',
                    'value': '19'
                },
                {
                    'label': '20 days',
                    'value': '20'
                },
                {
                    'label': '21 days',
                    'value': '21'
                },
                {
                    'label': '22 days',
                    'value': '22'
                },
                {
                    'label': '23 days',
                    'value': '23'
                },
                {
                    'label': '24 days',
                    'value': '24'
                },
                {
                    'label': '25 days',
                    'value': '25d'
                },
                {
                    'label': '26 days',
                    'value': '26'
                },
                {
                    'label': '27 days',
                    'value': '27'
                },
                {
                    'label': '28 days',
                    'value': '28'
                }
            ],
            'publicHolidays': [
                {
                    'id': 'ew',
                    'label': 'England and Wales',
                    'dates': {
                        '2014-05-05': 'Early May bank holiday',
                        '2014-05-26': 'Spring bank holiday',
                        '2014-08-25': 'Summer bank holiday',
                        '2014-12-25': 'Christmas Day',
                        '2014-12-26': 'Boxing Day',
                        '2015-01-01': 'New Year\'s Day',
                        '2015-04-03': 'Good Friday',
                        '2015-04-06': 'Easter Monday',
                        '2015-05-04': 'Early May bank holiday',
                        '2015-05-25': 'Spring bank holiday',
                        '2015-08-31': 'Summer bank holiday',
                        '2015-12-25': 'Christmas Day',
                        '2015-12-26': 'Boxing Day',
                        '2016-01-01': 'New Year\'s Day'
                    }
                },
                {
                    'id': 'ni',
                    'label': 'Northern Ireland',
                    'dates': {
                        '2014-07-14': 'Battle of the Boyne (Orangemen’s Day)',
                        '2014-08-25': 'Summer bank holiday',
                        '2014-12-25': 'Christmas Day',
                        '2014-12-26': 'Boxing Day',
                        '2015-01-01': 'New Year\'s Day',
                        '2015-03-17': 'St Patrick’s Day',
                        '2015-04-03': 'Good Friday',
                        '2015-04-06': 'Easter Monday',
                        '2015-05-04': 'Early May bank holiday',
                        '2015-05-25': 'Spring bank holiday',
                        '2015-07-13': 'Battle of the Boyne (Orangemen’s Day)',
                        '2015-08-31': 'Summer bank holiday',
                        '2015-12-25': 'Christmas Day',
                        '2015-12-26': 'Boxing Day',
                        '2016-01-01': 'New Year\'s Day'
                    }

                },
                {
                    'id': 'sc',
                    'label': 'Scotland',
                    'dates': {
                        '2014-08-04': 'Summer bank holiday',
                        '2014-12-01': 'St. Andrew\'s Day',
                        '2014-12-25': 'Christmas Day',
                        '2014-12-26': 'Boxing Day',
                        '2015-01-01': 'New Year\'s Day',
                        '2015-01-02': '2nd January',
                        '2015-04-03': 'Good Friday',
                        '2015-05-04': 'Early May bank holiday',
                        '2015-05-25': 'Spring bank holiday',
                        '2015-08-03': 'Summer bank holiday',
                        '2015-12-25': 'Christmas Day',
                        '2015-12-26': 'Boxing Day',
                        '2016-01-01': 'New Year\'s Day'
                    }
                }

            ]
        }

    };

}());