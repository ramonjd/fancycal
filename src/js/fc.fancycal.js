/*

 Fancycal
 - controller & logic
 - looks for element with the class 'fancycal', eg:
 <button class="fancycal"></button>

 */
var fc = fc || {};
fc.fancycal =
    (function ($, settings, Calendar, utils, views) {
        'use strict';

        if (!$ || !utils || !settings || !Calendar || !views) {
            throw new Error('Check dependencies: window.jQuery, fc.settings, fc.calendar, fc.utils, window.fcviews');
        }

        var $elem,
            $template,
            $body,
            $fancycalContainer,
            $calendarContainer,
            $nextMonthBtn,
            $prevMonthBtn,
            $calendarOne,
            $calendarTwo,
            $doneBtn,
            $selectDuration,
            $selectHolidays,
            $error,
            isVisible = false,
            isErrorVisible = false,
            publicHolsArray = settings.CALENDAR.publicHolidays,
            durationArray = settings.CALENDAR.duration,
            daydiff,
            currentDragger,
            dragTimeout,
            durationInDays,
            calendars = [],
            activeDates = ['departureDate', 'returnDate'],
            viewKey = 'fancycal.tpl.html',
            templates = {
                option: '<option value="%VALUE%">%LABEL%</option>',
                fancycaltext: '<span class="duration">%DURATION%</span> %PREP1% <button class="departure-date" data-date-type="departureDate">%DEPARTURE%</button> %PREP2% <button class="return-date" data-date-type="returnDate">%RETURN%</button>'
            },
            model = {
                // absolute max date - dependent on destinations
                // validation:
                // 1. this is the absolute maximum return date for the destination
                maxDate: utils.addMonthsToDate(3),

                // model - this is the date that is sent to the server
                departureDate: utils.addDaysToDate(3),

                // this is the earliest the traveller can leave
                // validation:
                // 1. this cannot be after the return date
                minDepartureDate: utils.addDaysToDate(3),

                // model - this is the date sent to the server
                returnDate: utils.addDaysToDate(17),

                // this is the earliest a traveller can return
                // validation:
                // 1. the traveller cannot return before this date
                // 2. the departure date cannot be after this date

                minReturnDate: null,

                // this is the latest a traveller can return
                // validation:
                // 1. the traveller cannot leave after this date
                // 2. the departure date cannot be after this date

                maxReturnDate: null,

                duration: '1w'
            },
            activeDate = activeDates[0];


        /**
         Creates HTML options for duration drop down
         @params {array} optsArray
         @returns {string}
         */
        function buildDurationOptions() {
            var arr = [],
                i = 0,
                len = durationArray.length;
            for (i; i < len; i++) {
                arr.push(templates.option.replace('%VALUE%', durationArray[i].value).replace('%LABEL%', durationArray[i].label));
            }
            return arr.join('');
        }

        /**
         Creates HTML options for holidays drop down
         @params {array} optsArray
         @returns {string}
         */
        function buildHolidayOptions() {
            var arr = [],
                i = 0,
                len = publicHolsArray.length;
            for (i; i < len; i++) {
                arr.push(templates.option.replace('%VALUE%', i).replace('%LABEL%', publicHolsArray[i].label));
            }
            return arr.join('');
        }

        /**
         Updates the value of the display element ($elem) with selected text and travel dates
         */
        function updateView() {
            var dDate = utils.formatDateFromISOtoGui(model.departureDate) || settings.LANG.placeholder,
                rDate = utils.formatDateFromISOtoGui(model.returnDate) || settings.LANG.placeholder,
                isDurationInWeeks = model.duration.toString().indexOf('w') !== -1,
                firstPreposition = isDurationInWeeks ? settings.LANG.between : settings.LANG.from,
                secondPreposition = isDurationInWeeks ? settings.LANG.and : settings.LANG.until,
                str;

            // update display text
            str = templates.fancycaltext.replace('%DURATION%', $selectDuration.find('option:selected').text()).replace('%DEPARTURE%', dDate).replace('%RETURN%', rDate).replace('%PREP1%', firstPreposition).replace('%PREP2%', secondPreposition);
            $elem[0].innerHTML = str;
        }

        /**
         Updates the value of the duration select box
         */
        function updateDurationView() {
            var durationSelectVal;
            if ($selectDuration.find('option[value="' + daydiff + '"]').length === 0) {
                durationSelectVal = 0;
                $selectDuration.find('option[value="0"]').text(daydiff + ' ' + settings.LANG.days);
            } else {
                durationSelectVal = daydiff;
                $selectDuration.find('option[value="0"]').text(settings.LANG.asselected);
            }
            $selectDuration.val(durationSelectVal);
        }

        /**
         Shows the fancycalendar container
         */
        function show() {
            $fancycalContainer.addClass('active').addClass(activeDate);
            $elem.addClass('active').addClass(activeDate);
            isVisible = true;
        }

        /**
         Hides the fancycalendar container
         */
        function hide() {
            $fancycalContainer.removeClass('active');
            $elem.removeClass('active').removeClass(activeDate);
            isVisible = false;
        }

        /**
         Shows div.error element in calendar view
         @params {error} object
         */
        function showError(error) {
            $error.text(error.msg).addClass('active');
            isErrorVisible = true;
        }

        /**
         Hides div.error element in calendar view
         */
        function hideError() {
            if (isErrorVisible === true) {
                $error.removeClass('active');
            }
            isErrorVisible = false;
        }

        /**
         Toggles the active date between departureDate and returnDate
         @param {str} val passing 'departureDate' or 'returnDate' overrides toggle
         */
        function toggleActiveDate(val) {


            val = val || null;


            $elem.removeClass(activeDate);
            $fancycalContainer.removeClass(activeDate);

            if (val && activeDates.indexOf(val) !== -1) {
                activeDate = val;
            } else if (activeDate === activeDates[0]) {
                activeDate = activeDates[1];
            } else {
                activeDate = activeDates[0];
            }

            $elem.addClass(activeDate);
            $fancycalContainer.addClass(activeDate);
        }


        /**
         Navigates to the next month in each calendar
         */
        function next() {
            if (calendars[1].isValidNextMonth()) {
                calendars[0].setNextMonth();
                calendars[1].setNextMonth();
            }
        }

        /**
         Navigates to the previous month in each calendar
         */
        function prev() {
            if (calendars[0].isValidPreviousMonth()) {
                calendars[0].setPreviousMonth();
                calendars[1].setPreviousMonth();
            }
        }

        /**
         Validates the selected travel dates
         */
        function validateDateRange(selectedDuration) {
            var isValid;
            if (selectedDuration && fc.utils.isValidISODate(model.departureDate) && fc.utils.isValidISODate(model.returnDate)) {
                daydiff = fc.utils.getDaysInDateRange(model.departureDate, model.returnDate);
                durationInDays = (selectedDuration.toString().indexOf('w') !== -1) ? parseInt(selectedDuration, null) * 7 : parseInt(selectedDuration, null);

                if (durationInDays > daydiff) {
                    showError({
                        msg: settings.LANG.errors.validRange
                    });
                    isValid = false;
                } else {
                    hideError();
                    isValid = true;
                }
            }
            return isValid;
        }

        /**
         Validates the selected travel dates and the difference between them
         */
        function validateDifferenceBetweenDates() {
            var isValid;
            if (fc.utils.isValidISODate(model.departureDate) && fc.utils.isValidISODate(model.returnDate)) {
                daydiff = fc.utils.getDaysInDateRange(model.departureDate, model.returnDate);
                if (daydiff <= 0) {
                    showError({
                        msg: settings.LANG.errors.validDate
                    });
                    isValid = false;
                } else {
                    hideError();
                    isValid = true;
                }
            }
            return isValid;
        }

        /**
         Validates final date choice on fancycal close
         */
        function validateTravelDates() {
            console.log('DEPARTURE DATE: ' + model.departureDate);
            console.log('RETURN DATE: ' + model.returnDate);
            console.log('DURATION: ' + model.duration);
        }

        function setPublicHolidays() {
            var val = $selectHolidays.val();
            calendars[0].setPublicHolidays(val);
            calendars[1].setPublicHolidays(val);
        }

        function setStartDate(date) {
            calendars[0].setStartDate(date).refresh();
            calendars[1].setStartDate(date).refresh();
        }

        function setEndDate(date) {
            calendars[0].setEndDate(date).refresh();
            calendars[1].setEndDate(date).refresh();
        }

        function onSelectByDragAndDrop(date, toggleDate) {
            if (date) {
                if (toggleDate === true) {
                    // validate!
                    var validDiff;
                    model[activeDate] = date;
                    validDiff = validateDifferenceBetweenDates();
                    if (validDiff === false) {
                        return false;
                    }
                }

                if (activeDate === activeDates[0] && currentDragger === 'start') {
                    setStartDate(date);
                }
                if (activeDate === activeDates[1] && currentDragger === 'end') {
                    setEndDate(date);
                }

                if (toggleDate === true) {
                    toggleActiveDate(null);
                    updateView();
                }

            }
        }

        /**
         * Callback function after the user selects (clicks) on a date
         * @params {string} date YYYY-MM-DD
         */
        function onSelectDate(date) {

            var validDiff;
            model[activeDate] = date;
            validDiff = validateDifferenceBetweenDates();
            // validate and reject if necessary
            if (validDiff !== false) {

                if (activeDate === activeDates[0]) {
                    setStartDate(date);

                } else if (activeDate === activeDates[1]) {
                    setEndDate(date);
                }

                toggleActiveDate(null);

                if (validDiff === true) {
                    model.duration = daydiff;
                    // update drop down menu with selected duration
                    updateDurationView();

                }
                updateView();
            }
        }

        /**
         Sets up DOM events and injects variable content
         */
        function attachEvents() {
            if ($fancycalContainer.length > 0) {

                // fancy cal events
                $elem.on('click', function (e) {
                    e.preventDefault();
                    show();
                });

                $elem.on('click', 'button', function (e) {
                    e.preventDefault();
                    if (isVisible === true) {
                        var $this = $(this);
                        toggleActiveDate($this.attr('data-date-type'));
                    }
                });


                $nextMonthBtn.on('click', function (e) {
                    e.preventDefault();
                    next();
                });

                $prevMonthBtn.on('click', function (e) {
                    e.preventDefault();
                    prev();
                });

                $doneBtn.on('click', function (e) {
                    e.preventDefault();
                    validateTravelDates();
                    hide();
                });

                $selectDuration.on('change', function (e) {
                    e.preventDefault();
                    var dateRange = $selectDuration.val(),
                        isValid = validateDateRange(dateRange);
                    if (isValid !== false) {
                        model.duration = dateRange;
                        updateView();
                    }

                });

                $selectHolidays.on('change', function (e) {
                    e.preventDefault();
                    setPublicHolidays();
                });


                // HTML 5 drag and drop (desktop only)
                // quick build - ignore messiness
                $fancycalContainer.find('div.calendar')
                    .on('dragstart', 'table', function (e) {
                        var $target = $(e.target);
                        if (e.target.nodeName.toLowerCase() === 'td' && ($target.hasClass('start-date') || $target.hasClass('end-date'))) {
                            if ($target.hasClass('start-date')) {
                                currentDragger = 'start';
                                toggleActiveDate('departureDate');
                            } else {
                                currentDragger = 'end';
                                toggleActiveDate('returnDate');
                            }
                        } else {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    })
                    .on('dragover', 'table', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.target.nodeName.toLowerCase() === 'button') {
                            dragTimeout = setTimeout(function () {
                                onSelectByDragAndDrop(e.target.getAttribute('data-date'), false);
                            }, 25);
                        }
                    })
                    .on('dragenter', 'table', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    })
                    .on('dragleave', 'table', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        clearTimeout(dragTimeout);
                    })
                    .on('drop', 'table', function (e) {
                        if (e.target.nodeName.toLowerCase() === 'button') {
                            clearTimeout(dragTimeout);
                            dragTimeout = setTimeout(function () {
                                onSelectByDragAndDrop(e.target.getAttribute('data-date'), true);
                            }, 25);
                        }
                    })
                    // :hover sticks on chrome ondrag/drop so have to set the class with js
                    .on('mouseover', 'td.day', function () {
                        $(this).addClass('hover');
                    })
                    .on('mouseout', 'td.day', function () {
                        $(this).removeClass('hover');
                    });


                // update view values
                updateView();
                setPublicHolidays();
            }
        }

        /**
         Kicks off fancycal, assigns DOM elements, calls view and appends to body
         */
        function init() {
            $body = $('body');
            $body.append($template);
            $fancycalContainer = $('.fancycal-container');
            $calendarContainer = $fancycalContainer.find('.calendar-container');
            $nextMonthBtn = $fancycalContainer.find('button.next');
            $prevMonthBtn = $fancycalContainer.find('button.prev');
            $doneBtn = $fancycalContainer.find('button.done');
            $selectDuration = $('#fancycal-select-duration');
            $selectHolidays = $('#fancycal-select-holidays');
            $calendarOne = $('#calendar-one');
            $calendarTwo = $('#calendar-two');
            $error = $fancycalContainer.find('div.error');

            // populate select forms
            $selectDuration.append(buildDurationOptions())
                .val(model.duration);
            $selectHolidays.append(buildHolidayOptions());

            // create calendars
            calendars[0] = new Calendar({
                $elem: $calendarOne,
                date: utils.addDaysToDate(1),
                minDate: model.minDepartureDate,
                maxDate: model.maxReturnDate,
                startDate: model.departureDate,
                endDate: model.returnDate,
                onSelectDate: onSelectDate,
                rangeOn: true
            });

            calendars[1] = new Calendar({
                $elem: $calendarTwo,
                date: utils.addMonthsToDate(1),
                minDate: model.minDepartureDate,
                maxDate: model.maxReturnDate,
                startDate: model.departureDate,
                endDate: model.returnDate,
                onSelectDate: onSelectDate,
                rangeOn: true
            });

            attachEvents();
        }


        // create a public interface to allow testing

        function FancyCal(params) {
            if (params) {
                model = params;
            }
            $elem = $('.fancycal');

            // set a default viewKey
            // can be overwritten before instantiation
            this.viewKey = viewKey;

            return this;
        }

        FancyCal.prototype.init = function () {

            // populate template strings
            $template = $(utils.parseTemplate(views[this.viewKey], settings.LANG));

            if ($elem.length > 0) {
                init();
            }
            return this;
        };

        FancyCal.prototype.getValues = function () {
            return model;
        };

        FancyCal.prototype.setValues = function (params) {
            if (params) {
                model = params;
            }
        };

        FancyCal.prototype.show = function () {
            show();
            return this;
        };

        FancyCal.prototype.hide = function () {
            hide();
            return this;
        };

        FancyCal.prototype.isVisible = function () {
            return isVisible;
        };

        FancyCal.prototype.destroy = function () {
            $elem.empty();
            calendars = [];
            // kill events too?
            return this;
        };

        return FancyCal;

    }(window.jQuery, fc.settings, fc.calendar, fc.utils, window.fcviews));