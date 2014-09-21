# node-roa-time

This module provides simple ways of getting Spain's official time from ROA ([ Real Instituto y Observatorio de la Armada](http://es.wikipedia.org/wiki/Hora_ROA "Wikipedia ROA")).


## Installation

As usual, install via `npm`

```javascript
npm install node-roa-time [-g]
```


## CLI

If you install `node-roa-time` globally, you can get ROA time in your command line.

```
$> roa
// output:
// ROA time is:  domingo, 21 de septiembre de 2014 13:06
```

## Async function

### roa.get(options, callback)

Using `get()` async function to obtain a date object wrapped with Moment.js utility.

### Example:

```javascript
var roa = require('node-roa-time');

roa.get({
    locale: 'es'
}, function(err, time){
    if( err ) { console.log( err ); return; }

    console.log( 'Official Spanish time is: ', time.format('YYYY-MM.DD hh:mm:ss Z LLLL') );
});
```

## Express/Connect middleware

### app.use(roa.middleware(options))

You can use this module as an Express middleware to set roa time in every request.

### Example:

```javascript
var express = require('express');
var roa = require('node-roa-time');

var app = express();

app.use(roa.middleware());

app.get('/roa', function(req, res){
    res.send({
        roa: req.roa,
        string: req.roa.moment.format('LLLL')
    });

    /**
     * response:
     *
     * {
     *      roa: {
     *          timestamp: 1411295408008, # official ROA time
     *          moment: "2014-09-21T10:30:08.008Z",
     *          request_ms: 61,  # milliseconds consumed to fetch ROA time
     *          diff_ms: -3363  # difference with your server's time
     *      },
     *      string: "domingo, 21 de septiembre de 2014 12:30"
     *  }
     *
     */
});

app.listen(3000);
```