describe('fancycal', function () {
    'use strict';


    var fancycal,
        $elem,
        $body = $('body');

    // start this train
    $body.append('<div class="fancycal"></div>');
    fancycal = new fc.fancycal().init();
    $elem = $('.fancycal');


    describe('fancycal instantiation', function () {

        it('should be available in global scope', function () {
            expect(fc.fancycal).toBeDefined();
        });

    });


    describe('API', function () {

        it('should have a public show function', function () {
            expect(fancycal.show).toBeDefined();
        });

        it('should have a public hide function', function () {
            expect(fancycal.hide).toBeDefined();
        });

        it('should have a public isVisible function', function () {
            expect(fancycal.isVisible).toBeDefined();
        });

        it('should show and set isVisible on show()', function () {
            expect(fancycal.isVisible()).toBe(false);
            fancycal.show();
            expect(fancycal.isVisible()).toBe(true);
        });

        it('should hide and set isVisible on hide()', function () {
            fancycal.show();
            expect(fancycal.isVisible()).toBe(true);
            fancycal.hide();
            expect(fancycal.isVisible()).toBe(false);
        });

    });


    describe('View and DOM', function () {


        it('should be load calendar view into the body', function () {
            expect($('.fancycal-container').length).toBe(1);
        });

        it('should show and add active class to container on click', function () {
            expect($elem.hasClass('active')).toBe(false);
            $elem.trigger('click');
            expect($elem.hasClass('active')).toBe(true);
            expect(fancycal.isVisible()).toBe(true);
        });


        it('should be able to select departureDate by default', function () {
            $elem.trigger('click');
            expect($elem.hasClass('departureDate')).toBe(true);
            expect($('.fancycal-container').hasClass('departureDate')).toBe(true);
        });

        it('should call utils.parseTemplate with two arguments', function () {
//            spyOn(fc.utils, 'parseTemplate').andCallThrough();
//            expect(fc.utils.parseTemplate).toHaveBeenCalled();
//            expect(fc.utils.parseTemplate).toHaveBeenCalledWith(tuiviews['fancycal.tpl.html'], fc.settings.LANG);

        });

        it('should update the text in the button when a week is selected', function () {


        });


    });


    describe('model values', function () {

        it('should count the number of days between depart and return Dates', function () {


        });


        it('should change the select box to reflect the day selection', function () {


        });

        it('should update the text in the button when dates selected', function () {


        });

        it('should trigger an error when the selected duration is too short for the date range', function () {


        });
    });


});

