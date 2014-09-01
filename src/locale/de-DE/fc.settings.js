/*
 Settings
 */
var fc = fc || {};
fc.settings = (function () {
    'use strict';
    return {
        'LOCALE': 'de-DE',
        'LANG': {
            'previousMonth': 'Voriger Monat',
            'nextMonth': 'Nächster Monat',
            'months': [
                'Januar',
                'Februar',
                'März',
                'April',
                'Mai',
                'Juni',
                'Juli',
                'August',
                'September',
                'Oktober',
                'November',
                'Dezember'
            ],
            'weekdays': [
                'Sonntag',
                'Montag',
                'Dienstag',
                'Mittwoch',
                'Donnerstag',
                'Freitag',
                'Samstag'
            ],
            'weekdaysShort': [
                'So',
                'Mo',
                'Di',
                'Mi',
                'Do',
                'Fr',
                'Sa'
            ],
            'holiday': 'Ferientag',
            'today': 'Heute',
            'selected': 'Selektiert',
            'select_holiday': 'Ferientage anzeigen',
            'week': 'Woche',
            'weeks': 'Wochen',
            'day': 'Tag',
            'days': 'Tage',
            'between': 'zwischen',
            'and': 'und',
            'from': 'von',
            'until': 'bis',
            'placeholder': 'tt.mm.jjjj',
            'travelduration': 'Reisedauer:',
            'done': 'Fertig',
            'outboundDate': 'Hinreisedatum',
            'inboundDate': 'Rückreisedatum',
            'asselected': 'Exact wie angegeben',
            'errors': {
                'validDate': 'Das selektierte Datum ist nicht valid',
                'validRange': 'Reisedauer und Zeitraum widersprechen sich'
            }

        },
        'CALENDAR': {
            'firstDay': 1,
            'duration': [
                {
                    'label': 'Exact wie angegeben',
                    'value': '0'
                },
                {
                    'label': '1 Woche',
                    'value': '1w'
                },
                {
                    'label': '2 Wochen',
                    'value': '2w'
                },
                {
                    'label': '3 Wochen',
                    'value': '3w'
                },
                {
                    'label': '4 Wochen',
                    'value': '4w'
                },
                {
                    'label': '1 Tag',
                    'value': '1'
                },
                {
                    'label': '2 Tage',
                    'value': '2'
                },
                {
                    'label': '3 Tage',
                    'value': '3'
                },
                {
                    'label': '4 Tage',
                    'value': '4'
                },
                {
                    'label': '5 Tage',
                    'value': '5'
                },
                {
                    'label': '6 Tage',
                    'value': '6'
                },
                {
                    'label': '7 Tage',
                    'value': '7'
                },
                {
                    'label': '8 Tage',
                    'value': '8'
                },
                {
                    'label': '9 Tage',
                    'value': '9'
                },
                {
                    'label': '10 Tage',
                    'value': '10'
                },
                {
                    'label': '11 Tage',
                    'value': '11'
                },
                {
                    'label': '12 Tage',
                    'value': '12'
                },
                {
                    'label': '13 Tage',
                    'value': '13'
                },
                {
                    'label': '14 Tage',
                    'value': '14'
                },
                {
                    'label': '15 Tage',
                    'value': '15d'
                },
                {
                    'label': '16 Tage',
                    'value': '16'
                },
                {
                    'label': '17 Tage',
                    'value': '17'
                },
                {
                    'label': '18 Tage',
                    'value': '18'
                },
                {
                    'label': '19 Tage',
                    'value': '19'
                },
                {
                    'label': '20 Tage',
                    'value': '20'
                },
                {
                    'label': '21 Tage',
                    'value': '21'
                },
                {
                    'label': '22 Tage',
                    'value': '22'
                },
                {
                    'label': '23 Tage',
                    'value': '23'
                },
                {
                    'label': '24 Tage',
                    'value': '24'
                },
                {
                    'label': '25 Tage',
                    'value': '25d'
                },
                {
                    'label': '26 Tage',
                    'value': '26'
                },
                {
                    'label': '27 Tage',
                    'value': '27'
                },
                {
                    'label': '28 Tage',
                    'value': '28'
                }
            ],
            'publicHolidays': [
                {
                    'id': 'national',
                    'label': 'Deutsche Feiertage',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'bw',
                    'label': 'Baden-Württemberg',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-01-06': 'Heilige Drei Könige',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-01': 'Allerheiligen',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }

                },
                {
                    'id': 'be',
                    'label': 'Berlin',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'by',
                    'label': 'Bayern',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-01-06': 'Heilige Drei Könige',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-08-15': 'Mariä Himmelfahrt',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-01': 'Allerheiligen',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'bb',
                    'label': 'Brandenburg',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-10-31': 'Reformationstag',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'hb',
                    'label': 'Bremen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'hh',
                    'label': 'Hamburg',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'he',
                    'label': 'Hessen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'mv',
                    'label': 'Mecklenburg-Vorp.',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-10-31': 'Reformationstag',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'ni',
                    'label': 'Niedersachsen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'nw',
                    'label': 'Nordrhein-Westfalen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-01': 'Allerheiligen',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'rp',
                    'label': 'Rheinland-Pfalz',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-01': 'Allerheiligen',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'sl',
                    'label': 'Saarland',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-08-15': 'Mariä Himmelfahrt',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-01': 'Allerheiligen',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'sn',
                    'label': 'Sachsen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-06-19': 'Fronleichnam',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-11-19': 'Buß- und Bettag',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'st',
                    'label': 'Sachsen-Anhalt',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-01-06': 'Heilige Drei Könige',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-10-31': 'Reformationstag',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'sh',
                    'label': 'Schleswig-Holstein',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                },
                {
                    'id': 'th',
                    'label': 'Thüringen',
                    'dates': {
                        '2014-01-01': 'Neujahr (alle Bundesländer)',
                        '2014-04-18': 'Karfreitag (alle Bundesländer)',
                        '2014-04-20': 'Ostersonntag (alle Bundesländer)',
                        '2014-04-21': 'Ostermontag (alle Bundesländer)',
                        '2014-05-01': 'Maifeiertag (alle Bundesländer)',
                        '2014-05-29': 'Christi Himmelfahrt (alle Bundesländer)',
                        '2014-06-08': 'Pfingstsonntag (alle Bundesländer)',
                        '2014-06-09': 'Pfingstmontag (alle Bundesländer)',
                        '2014-10-03': 'Tag der Deutschen Einheit (alle Bundesländer)',
                        '2014-10-31': 'Reformationstag',
                        '2014-12-25': 'Weihnachtstag (alle Bundesländer)',
                        '2014-12-26': '2er Weihnachtstag (alle Bundesländer)',
                        '2015-01-01': 'Neujahr (alle Bundesländer)'
                    }
                }

            ]
        }

    };

}());