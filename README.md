# Travel Date Picker

A custom datepicker and calendar object. 
**Files and dependencies:**

The third parties libraries we use are [jQuery](jquery.com) and [Modernizr](http://modernizr.com/).

1. *Modernizr* (downloaded via bower.json, injected into the <head>)
2. *jQuery* (downloaded via bower.json)
3. *fc.settings.js* (Variables and language strings)
4. *fc.utils.js* (Date calculation and validation utilities)
5. *fc.calendar.js* (Object to create a calendar table)
6. *fc.views.js* (JS hash array containing escaped HTML views)
7. *fc.fancycal.js* (Builds fancycal, assigns events and navigation/validation logic)

Dependencies for each function are specified in that function's arguments.

The grunt build scripts bundles these into core scripts (reusable) and calendar-specific code.

## Getting started

### Clone the repo:

```
git clone git@github.com:ramonjd/fancycal.git
```

### Install node modules:

```
npm install
```

### Run grunt adding your locale (default is en-GB):

```
grunt --locale=de-DE
```

This task creates a dev folder and parses the necessary HTML and CSS. It also:

1. downloads the dependencies in bower.json
2. compiles scss
3. compiles html views to js
4. runs jshint over js files
5. runs karma tests

### Run server and watch tasks:

```
grunt server
```
This task:

1. runs a server ([http://localhost:9001](http://localhost:9001/index.html))
2. opens *demo/index.html*
3. watches static files for changes

### Setup

On DOM ready, create a new instance of fancycal and initiate it. The script looks for a block element in the HTML with a class of **fancycal** then injects the fancycal view and calendar objects.

```
<div class="fancycal"></div>
<script>
$(function(){
    var fancycal = new fc.fancycal().init();
});
</script>
```
## Localisation

All localisation settings can found under *src/locale/xx-YY/*

Currently, grunt simply switches to the *fc.settings.js* file of the selected locale. To switch between locales while you're workings, just execute:

```
grunt --locale=xx-YY
```

where **xx-YY** is an existing locale directory under *src*

## Testing

```
grunt karma
```

We're using Jasmine 1.3 for the tests, located in *spec/\*.spec.js*


## Build

```
grunt build
```

This task:

1. creates a directory named *dist*
2. compiles scss
3. converts views to js
4. renders the production HTML
5. copies files
6. concats js into two bundles: fc-core.js (settings, views and utils) and fc-calendar-bundle.js (calendar and fancycal)
7. creates *fancycal.zip* file for easy emailing :)
