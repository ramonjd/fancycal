/* fcviews */

var fcviews = {};

fcviews['fancycal.tpl.html'] = '<div class="fancycal-container">\n' +
    '\n' +
    '    <section>\n' +
    '\n' +
    '        <header>\n' +
    '            <div class="error"></div>\n' +
    '        </header>\n' +
    '\n' +
    '        <div class="fancycal-body">\n' +
    '\n' +
    '            <button class="prev" title="{{previousMonth}}">&laquo;</button>\n' +
    '            <button class="next" title="{{nextMonth}}">&raquo;</button>\n' +
    '\n' +
    '            <div class="calendar-container">\n' +
    '                <div class="calendar pull-left" id="calendar-one"></div>\n' +
    '                <div class="calendar pull-right" id="calendar-two"></div>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '        <footer>\n' +
    '            <div class="row">\n' +
    '                <p data-lang="travelduration">{{travelduration}}</p>\n' +
    '                <div class="select">\n' +
    '                    <label for="fancycal-select-duration"></label>\n' +
    '                    <select id="fancycal-select-duration"></select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="select pull-left">\n' +
    '                    <label for="fancycal-select-holidays"></label>\n' +
    '                    <span class="flag holiday"></span>\n' +
    '                    <select id="fancycal-select-holidays"></select>\n' +
    '                </div>\n' +
    '                <button class="btn done" data-lang="done">{{done}}</button>\n' +
    '            </div>\n' +
    '\n' +
    '        </footer>\n' +
    '\n' +
    '    </section>\n' +
    '\n' +
    '</div>';
