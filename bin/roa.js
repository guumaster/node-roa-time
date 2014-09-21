#!/usr/bin/env node
var roa = require('../lib');
var moment = require('moment-timezone');

roa.get({
    locale: 'es'
}, function(err, time){
    if( err ) { console.log( err ); return; }

    console.log( 'ROA  time is: ', time.tz('Europe/Madrid').format() );
    console.log( 'your time is: ', moment().format() );
});