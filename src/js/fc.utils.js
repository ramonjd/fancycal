/*

 Fancycal
 - controller & logic

 */

var fc = fc || {};

fc.utils = (function () {
    'use strict';

    /*-------------------------------------- TEMPLATING UTILS */

    /**
     * @param {string} template - HTML template to be populated with values - only areas with {{key}} will be replaced
     * @param {object} values - hash array of values to be injected into the template
     * @returns {boolean}
     */
    function parseTemplate(template, values) {
        // parse out {{values}}
        var re = /\{\{([^}]+)\}\}/g,
            view = null,
            translatedVal,
            i = 0,
            m,
            j;

        if (template && values) {
            view = template;
            m = view.match(re);
            if (m !== null) {
                j = m.length;
                for (i; i < j; i++) {
                    translatedVal = values[m[i].replace(re, '$1')];
                    view = view.replace(m[i], translatedVal);
                }
            }
        }

        return view;
    }

    /*-------------------------------------- DATE UTILS */

    /**
     * @param {object:Date} date
     * @returns {boolean}
     */
    function isValidDateObject(date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            if (!isNaN(date.getTime())) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {string} dateIso
     * @returns {boolean}
     */
    function isValidISODate(dateIso) {
        var isValidDate = false,
            date,
            regex = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;

        if (dateIso && regex.test(dateIso)) {
            date = new Date(dateIso);
            if (isValidDateObject(date)) {
                isValidDate = true;
            }
        }
        return isValidDate;
    }

    /**
     * @param {string} dateGui
     * @return {boolean}
     */
    function isGuiDateValid(dateGui) {
        var regex = /^(([0-2][1-9])|([3](0|1)))\.(0[1-9]|1(1|2))\.((19|20)\d{2})$/;

        if (regex.test(dateGui)) {
            return true;
        }

        return false;
    }

    /**
     * @param {string} earlierDate
     * @param {string} date
     * @returns {boolean}
     */
    function isEarlier(date, earlierDate) {
        // is earlierDate earlier than date?
        var isDateEarlier = false;
        if (isValidISODate(date) && isValidISODate(earlierDate)) {
            if ((new Date(date).getTime() < new Date(earlierDate).getTime())) {
                isDateEarlier = true;
            }
        } else {
            isDateEarlier = null;
        }
        return isDateEarlier;
    }

    /**
     * @param {string} laterDate iso
     * @param {string} date iso
     * @returns {boolean}
     */
    function isLater(date, laterDate) {
        var isDateLater = false;
        if (isValidISODate(date) && isValidISODate(laterDate)) {
            if ((new Date(date).getTime() > new Date(laterDate).getTime())) {
                isDateLater = true;
            }
        }
        return isDateLater;
    }

    /**
     * @param n
     * @returns {string}
     */
    function pad(n) {
        n = parseInt(n, null);
        return (n < 10 && n >= 0) ? ('0' + n) : n;
    }

    /**
     * @param {string} isoDateEarlierDate YYYY-MM-DD
     * @param {string} isoLaterDate YYY-MM-DD
     * @returns {int} Difference between the two dates in days
     */
    function getDaysInDateRange(isoDateEarlierDate, isoLaterDate) {
        var earlierDate = formatDateFromISOToFromDateObject(isoDateEarlierDate),
            laterDate = formatDateFromISOToFromDateObject(isoLaterDate);
        return (laterDate - earlierDate) / (1000 * 60 * 60 * 24);
    }

    /**
     * @param {Date} date
     * @return {Object}
     */
    function extractDateInformation(date) {
        var isoDate = {
        };

        isoDate.year = date.getFullYear().toString();
        isoDate.day = date.getDate();
        isoDate.month = date.getMonth() + 1;

        isoDate.month = pad(isoDate.month);
        isoDate.day = pad(isoDate.day);

        return isoDate;
    }

    /**
     * @param {string} date
     * @returns {string} gui date
     */
    function formatDateFromISOtoGui(date) {
        var guiDate = null,
            isoDate;

        if (isValidISODate(date)) {
            isoDate = new Date(date);
            guiDate = extractDateInformation(isoDate);
            guiDate = guiDate.day + '.' + guiDate.month + '.' + guiDate.year;
        }
        return guiDate;
    }

    /**
     * @param {string} date DD.MM.YYYY
     * @returns {string} iso date YYYY-MM-DD
     */
    function formatDateFromGuiToISO(date) {
        var isoDate = null;

        if (isGuiDateValid(date)) {
            isoDate = date.split('.'); //Array with date [day][month][year]
            isoDate = isoDate[2] + '-' + isoDate[1] + '-' + isoDate[0];
        }
        return isoDate;
    }

    /**
     * @param {Date} dateObject
     */
    function formatDateFromDateObjectToISO(dateObject) {
        var date = dateObject || new Date(),
            isoDate = null;

        if (isValidDateObject(date)) {
            isoDate = extractDateInformation(date);
            isoDate = isoDate.year + '-' + isoDate.month + '-' + isoDate.day;
        }
        return isoDate;
    }

    /**
     * @param {string} iso date YYYY-MM-DD
     * @returns {Date} dateObject
     */
    function formatDateFromISOToFromDateObject(date) {
        var dateObj = null,
            d;
        if (date && isValidISODate(date)) {
            d = new Date(date);
            if (Object.prototype.toString.call(d) === '[object Date]') {
                if (!isNaN(d.getTime())) {
                    dateObj = d;
                }
            }
        }

        return dateObj;
    }

    /**
     * @returns {string} iso date
     */
    function addDaysToDate(day, dateObject) {
        dateObject = dateObject || new Date();
        day = day || 3;
        if (isValidDateObject(dateObject)) {
            dateObject.setDate(dateObject.getDate() + day);
        }

        return formatDateFromDateObjectToISO(dateObject);
    }

    /**
     * @returns {string} iso date
     */
    function addMonthsToDate(month, dateObject) {
        dateObject = dateObject || new Date();
        month = month || 1;
        if (isValidDateObject(dateObject)) {
            dateObject.setMonth(dateObject.getMonth() + month);
        }
        return formatDateFromDateObjectToISO(dateObject);
    }


    /**
     * @param {number} year
     * @returns {boolean}
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     *
     * @param {number} year
     * @param {number} month
     * @returns {number} days
     */
    function getDaysInMonth(year, month) {
        //month is the index of the array filled with the number of days
        //for example: March = Index 2 -> 31 days
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    return {
        parseTemplate: parseTemplate,
        isValidISODate: isValidISODate,
        isEarlier: isEarlier,
        isLater: isLater,
        formatDateFromISOtoGui: formatDateFromISOtoGui,
        formatDateFromGuiToISO: formatDateFromGuiToISO,
        formatDateFromDateObjectToISO: formatDateFromDateObjectToISO,
        formatDateFromISOToFromDateObject: formatDateFromISOToFromDateObject,
        addDaysToDate: addDaysToDate,
        addMonthsToDate: addMonthsToDate,
        isLeapYear: isLeapYear,
        getDaysInMonth: getDaysInMonth,
        isValidDateObject: isValidDateObject,
        pad: pad,
        getDaysInDateRange: getDaysInDateRange
    };
})();