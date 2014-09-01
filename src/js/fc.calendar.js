var fc = fc || {};


/**
 * Creates an instance of Calendar. All dates are dealt with using ISO format: YYYY-MM-DD
 *
 * @constructor
 * @this {fc.calendar}
 * @param {object} $ jQuery
 * @param {object} utils Object containing date utility methods
 * @param {object} settings calendar settings => fc.settings
 */
fc.calendar = (function ($, utils, settings) {
    'use strict';

    if (!$ || !utils || !settings) {
        throw new Error('Check dependencies: window.jQuery, fc.utils, fc.settings');
    }

    /**
     * Populates the calendarStatus object, which keeps a record of the current calendar's status
     * @params {string} date YYYY-MM-DD
     * @returns {obj}
     */
    function setCalendarStatusModel(date) {
        var calendarStateModel = {
                date: null,
                day: null,
                month: null,
                year: null
            },
            tempArray, y, m, d;
        if (date) {
            tempArray = date.split('-');
            y = parseInt(tempArray[0], null);
            m = parseInt(tempArray[1], null) - 1;
            d = parseInt(tempArray[2], null);
            calendarStateModel.date = date;
            calendarStateModel.day = d;
            calendarStateModel.month = (m < 0) ? 11 : m;
            calendarStateModel.year = y;
        }
        return calendarStateModel;
    }

    /**
     * Populates the calendarLimits object, which keeps a record of active ranges
     * @params {obj} params
     * @returns {obj}
     */
    function setCalendarLimitsModel(params) {
        var calendarLimitsModel = {
                minMonth: null,
                minYear: null,
                maxMonth: null,
                maxYear: null,
                minDate: null,
                maxDate: null
            },
            validMinDate,
            validMaxDate;
        if (params) {

            // set min and max values for the calendar to stop overclicking
            validMinDate = utils.formatDateFromISOToFromDateObject(params.minDate);
            validMaxDate = utils.formatDateFromISOToFromDateObject(params.maxDate);

            if (validMinDate) {
                calendarLimitsModel.minYear = validMinDate.getFullYear();
                calendarLimitsModel.minMonth = validMinDate.getMonth();
            }
            if (validMaxDate) {
                calendarLimitsModel.maxYear = validMaxDate.getFullYear();
                calendarLimitsModel.maxMonth = validMaxDate.getMonth();
            }
            calendarLimitsModel.minDate = params.minDate;
            calendarLimitsModel.maxDate = params.maxDate;

        }
        return calendarLimitsModel;
    }


    /* -------------------------- views */
    var templates = {
        table: '<table class="calendar-table"><caption>%MONTH% %YEAR%</caption>%HEADER%%BODY%</table>',
        header: '<thead><tr>%ROW%</tr></thead>',
        headercell: '<th scope="col"><abbr title="%DAY%">%DAYSHORT%</abbr></th>',
        tablebody: '<tbody>%BODY%</tbody>',
        bodyrow: '<tr>%CELLS%</tr>',
        bodycell: '<td class="%CLASS%" %DRAGGABLE%><div><button data-calendar-id="%ID%" data-date="%DATE%" %TITLE% %DISABLED%>%DAY%</button><span class="flag holiday"></span><span class="arrow"></span></div></td>'
    };


    /* -------------------------- view rendering */
    /**
     * Renders the day name view for the table header cell
     * @params {int} day Array number of day of the week
     * @params {bool} useAbbr Use abbr version of day string
     * @returns {string} Dayname or abbr
     */
    function renderDayName(day, useAbbr) {
        day += settings.CALENDAR.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return useAbbr ? settings.LANG.weekdaysShort[day] : settings.LANG.weekdays[day];
    }

    /**
     * Renders the full table header row
     * @returns {string} Header row in HTML
     */
    function renderTableHeader() {
        var i, arr = [];
        for (i = 0; i < 7; i++) {
            arr.push(templates.headercell.replace('%DAYSHORT%', renderDayName(i, true)).replace('%DAY%', renderDayName(i)));
        }
        return templates.header.replace('%ROW%', arr.join(''));
    }

    /**
     * Renders the full table body
     * @returns {string} Table body in HTML
     */
    function renderTableBody(rows) {
        return templates.tablebody.replace('%BODY%', rows.join(''));
    }

    /**
     * Renders a table body row
     * @returns {string} Table body in HTML
     */
    function renderTableBodyRow(cells) {
        return templates.bodyrow.replace('%CELLS%', cells.join(''));
    }

    /**
     * Renders individual table body cell
     * @returns {string} Table body cell in HTML
     */
    function renderTableBodyCell(params) {

        var classNames = '',
            disabled = '',
            draggable = '',
            cellTitle = 'title=',
            str;


        // empty cells
        if (params.isEmpty) {
            classNames = 'empty';
            // disabled days (out of range) get nothing!
        } else if (params.isDisabled) {
            classNames = 'disabled';
            disabled = 'disabled="disabled"';
        } else {
            // all dates get day class
            classNames = 'day';

            // unless they are delimitators
            if (params.isStartDate) {
                classNames = 'start-date';
                draggable = 'draggable="true"';
            }
            if (params.isEndDate) {
                classNames = 'end-date';
                draggable = 'draggable="true"';
            }

            // additional classes to be tacked on if necessary
            if (params.isToday) {
                classNames += ' today';
            }

            if (params.isInRange) {
                classNames += ' inrange';
            }

            if (params.isPublicHoliday) {
                classNames += ' holiday';
            }
        }

        str = templates.bodycell.replace('%DATE%', params.date).replace('%DAY%', params.day).replace('%CLASS%', classNames).replace('%TITLE%', (params.title ? cellTitle + params.title : '')).replace('%DISABLED%', disabled).replace('%DRAGGABLE%', draggable);
        return str;
    }

    /**
     * Renders full table from all view components
     * @param {string} tableBody
     * @param {object} calendarStatus
     * @returns {string} Table in HTML
     */
    function renderTable(tableBody, calendarStatus) {
        return templates.table.replace('%HEADER%', renderTableHeader()).replace('%BODY%', tableBody).replace('%MONTH%', getCurrentMonthName(calendarStatus.month)).replace('%YEAR%', calendarStatus.year);
    }

    /**
     * alculates date properties and populates views
     * @param {object} calendarStatus
     * @param {object} calendarLimits
     * @param {object} publicHolidays
     * @param {bool} rangeOn
     * @returns {string} Populated Calendar Table in HTML
     */
    function render(calendarStatus, calendarLimits, publicHolidays, rangeOn) {
        if (typeof calendarStatus !== 'object') {
            return null;
        }

        calendarLimits = calendarLimits || {};


        // get the number of the first day of the month) to calculate how many days should come before in the calendar
        var before = new Date(calendarStatus.year, calendarStatus.month, 1).getDay(),
            days = utils.getDaysInMonth(calendarStatus.year, calendarStatus.month),
            i,
            d,
            dStr,
            dayProperties,
            isEmptyCell,
            rowsArray = [],
            cellsArray,
            cells,
            dayDate,
            isDisabled,
            isToday,
            isPublicHoliday,
            isStartDate,
            isEndDate,
            isInRange,
            isSelected,
            cellTitle,
            tableBody;


        if (settings.CALENDAR.firstDay > 0) {
            before -= settings.CALENDAR.firstDay;
            if (before < 0) {
                before += 7;
            }
        }

        cells = days + before;
        while (cells % 7 !== 0) {
            cells = cells + 1;
        }

        cellsArray = [];

        for (i = 1, d = 1; i <= cells; i++) {

            dayProperties = {};

            isEmptyCell = i <= before || i > (days + before);

            if (isEmptyCell) {
                dayProperties = {
                    isEmpty: true,
                    date: '',
                    day: '-',
                    title: cellTitle
                };

            } else {
                dStr = d.toString();
                dayDate = calendarStatus.year + '-' + utils.pad(calendarStatus.month + 1) + '-' + utils.pad(d);

                // out of range dates are disabled
                isDisabled = (calendarLimits.minDate && utils.isEarlier(dayDate, calendarLimits.minDate)) || (calendarLimits.maxDate && utils.isLater(dayDate, calendarLimits.maxDate));

                // single selected date
                isSelected = dayDate === calendarStatus.date;

                // save today as YYYY-MM-DD
                isToday = dayDate === utils.formatDateFromDateObjectToISO();

                // custom end and start dates
                isStartDate = dayDate === calendarStatus.startDate;
                isEndDate = dayDate === calendarStatus.endDate;

                // is between start and end dates - optional flag
                isInRange = rangeOn && (utils.isEarlier(dayDate, calendarStatus.endDate) && utils.isLater(dayDate, calendarStatus.startDate));


                if (publicHolidays) {
                    isPublicHoliday = (publicHolidays.dates[dayDate] !== undefined);
                    cellTitle = publicHolidays.dates[dayDate];
                }

                dayProperties = {
                    isDisabled: isDisabled,
                    isToday: isToday,
                    isStartDate: isStartDate,
                    isEndDate: isEndDate,
                    isInRange: isInRange,
                    date: isDisabled ? '' : dayDate,
                    isPublicHoliday: isPublicHoliday,
                    day: dStr,
                    title: cellTitle
                };

                d = d + 1;
            }
            cellsArray.push(renderTableBodyCell(dayProperties));

            //create new row
            if (i > 0 && i % 7 === 0) {
                rowsArray.push(renderTableBodyRow(cellsArray));
                cellsArray = [];
            }
        }
        tableBody = renderTableBody(rowsArray);
        return renderTable(tableBody, calendarStatus);
    }

    /* -------------------------- general utilities */

    /**
     * Returns the month name from the settings array of months
     * @returns {string} Month name
     */
    function getCurrentMonthName(month) {
        return settings.LANG.months[month];
    }

    /**
     * Creates an instance of Calendar.
     *
     * @constructor
     * @this {Calendar}
     * @param {object} options A hash array of Calendar options
     */
    var Calendar = function (options) {

        if (options && options.$elem instanceof window.jQuery) {

            // private vars
            var calendarStatus,
                calendarLimits,
                publicHolidays,
            // if there is no start date, begin with tomorrow
                selectedDate = options.date || utils.addDaysToDate(3),
                startDate = options.startDate || null,
                endDate = options.endDate || null,
                _this;

            // public
            this.$elem = options.$elem;
            this.rangeOn = options.rangeOn;

            // create reference for closures
            _this = this;

            /**
             * Renders the entire calendar and injects it into this.$elem
             * @this {Calendar}
             * @returns {Calendar}
             */
            this.refresh = function () {
                this.$elem[0].innerHTML = render(calendarStatus, calendarLimits, publicHolidays, this.rangeOn);
                return this;
            };
            /**
             * Sets current calendar date and refreshes
             * @this {Calendar}
             * @params {string} date YYYY-MM-DD
             * @returns {Calendar}
             */
            this.setDate = function (date) {
                if (utils.isValidISODate(date)) {
                    calendarStatus = setCalendarStatusModel(date);
                    this.refresh();
                }
                return this;
            };
            /**
             * Returns current calendar date
             * @this {Calendar}
             * @returns {string} date YYYY-MM-DD
             */
            this.getDate = function () {
                return calendarStatus.date;
            };
            /**
             * Sets a start date in a date range
             * @this {Calendar}
             * @params {string} date YYYY-MM-DD
             * @returns {Calendar}
             */
            this.setStartDate = function (date) {
                if (utils.isValidISODate(date)) {
                    calendarStatus.startDate = date;
                }
                return this;
            };
            /**
             * Sets a end date in a date range
             * @this {Calendar}
             * @params {string} date YYYY-MM-DD
             * @returns {Calendar}
             */
            this.setEndDate = function (date) {
                if (utils.isValidISODate(date)) {
                    calendarStatus.endDate = date;
                }
                return this;
            };
            /**
             * Toggles range highlighting on and off
             * @this {Calendar}
             * @returns {Calendar}
             */
            this.toggleRange = function () {
                this.rangeOn = !this.rangeOn;
                return this;
            };
            /**
             * Restricts calendar with a minimum date - this.setPreviousMonth() checks before allowing pagination
             * @this {Calendar}
             * @params {string} date YYYY-MM-DD
             * @returns {Calendar}
             */
            this.setMinDate = function (date) {
                if (utils.isValidISODate(date)) {
                    calendarLimits = setCalendarLimitsModel({
                        minDate: date
                    });
                    // if the min date is later than the current date, bring current date forward and refresh
                    if (utils.isLater(date, calendarStatus.date)) {
                        this.setDate(date).refresh();
                    }
                }
                return this;
            };
            /**
             * Returns set minimum date, if any
             * @this {Calendar}
             * @returns {string}
             */
            this.getMinDate = function () {
                return calendarLimits.minDate;
            };
            /**
             * Restricts calendar with a maximum date - this.setNextMonth() checks before allowing pagination
             * @this {Calendar}
             * @params {string} date YYYY-MM-DD
             * @returns {Calendar}
             */
            this.setMaxDate = function (date) {
                if (utils.isValidISODate(date)) {
                    calendarLimits = setCalendarLimitsModel({
                        maxDate: date
                    });
                    // if the max date is earlier than the current date, bring current date back and refresh
                    if (utils.isEarlier(date, calendarStatus.date)) {
                        this.setDate(date).refresh();
                    }
                }
                return this;
            };
            /**
             * Returns set max date, if any
             * @this {Calendar}
             * @returns {string}
             */
            this.getMaxDate = function () {
                return calendarLimits.maxDate;
            };
            /**
             * Tells the calendar to display public holidays based on an existing array
             * @this {Calendar}
             * @params {int} index
             * @returns {Calendar}
             */
            this.setPublicHolidays = function (index) {
                if (index !== 'undefined' && settings.CALENDAR.publicHolidays && settings.CALENDAR.publicHolidays[index]) {
                    publicHolidays = settings.CALENDAR.publicHolidays[index];
                    this.refresh();
                }
                return this;
            };
            /**
             * Checks if the calendar can paginate backwards, checking against provided min date
             * @this {Calendar}
             * @returns {bool}
             */
            this.isValidPreviousMonth = function () {
                var isValid = true;
                if (calendarLimits.maxMonth) {
                    var newYear = calendarStatus.year - 1,
                        newMonth = calendarStatus.month - 1;
                    // check min and max year
                    if (newYear < calendarLimits.minYear && newMonth < calendarLimits.minMonth) {
                        isValid = false;
                    }
                }
                return isValid;
            };
            /**
             * Checks if the calendar can paginate forwards, checking against provided max date
             * @this {Calendar}
             * @returns {bool}
             */
            this.isValidNextMonth = function () {
                var isValid = true;
                if (calendarLimits.maxMonth) {
                    var newMonth = calendarStatus.month + 1,
                        newYear = calendarStatus.year + 1;

                    if (newYear > calendarLimits.maxYear && newMonth >= calendarLimits.maxMonth) {
                        isValid = false;
                    }
                }
                return isValid;
            };
            /**
             * Moves the calendar view forwards by one month
             * @this {Calendar}
             * @returns {Calendar}
             */
            this.setNextMonth = function () {
                calendarStatus.month = calendarStatus.month + 1;
                if (calendarStatus.month > 11) {
                    calendarStatus.month = 0;
                    calendarStatus.year = calendarStatus.year + 1;
                }
                this.refresh();
                return this;
            };
            /**
             * Moves the calendar view backwards by one month
             * @this {Calendar}
             * @returns {Calendar}
             */
            this.setPreviousMonth = function () {
                calendarStatus.month = calendarStatus.month - 1;
                if (calendarStatus.month < 0) {
                    calendarStatus.month = 11;
                    calendarStatus.year = calendarStatus.year - 1;
                }
                this.refresh();
                return this;
            };


            // events
            this.$elem.on('click', 'button', function (e) {
                e.preventDefault();
                var $this = $(this),
                    date = $this.attr('data-date');
                if (typeof options.onSelectDate === 'function') {
                    options.onSelectDate(date);
                }
            });

            /*
             draggable dates
             #1 approach:
             - click on depart or return date
             - activate on mouseover (td) but throttled - cal needs a public function that dynamically
             changes styles based on proposed date changes (refactor render()?)
             - logic over two calendars has to be controlled from the fancy cal function
             */


            // initiate by setting the calendar's core model values
            calendarStatus = setCalendarStatusModel(selectedDate);
            calendarStatus.startDate = startDate;
            calendarStatus.endDate = endDate;
            calendarLimits = setCalendarLimitsModel({
                minDate: options.minDate || null,
                maxDate: options.maxDate || null
            });

            // draw the table
            this.refresh();

        }
        return this;
    };


    return Calendar;

}(window.jQuery, fc.utils, fc.settings));