#!/usr/bin/env node
var roa = require('../lib');

roa.get({
    locale: 'es'
}, function(err, time){
    if( err ) { console.log( err ); return; }

    console.log( 'ROA time is: ', time.format('LLLL') );
});