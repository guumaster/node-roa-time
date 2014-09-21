var ntpClient = require('ntp-client');
var moment = require('moment-timezone');
var locale = require('locale');


var roa_ntp_server = "hora.roa.es";
var roa_ntp_port = 123;

module.exports = {
    get: getROA,
    middleware: function(options){

        options = options || {};

        return function(req, res, next){
            var ts = Date.now();
            if( !options.locale) {
                options.locale = new locale.Locales(req.headers["accept-language"]);
                options.locale  = locale[0].language;
            }
            getROA(options, function(err, time){
                if( err ) { return next(err); }
                var now = Date.now();

                var roa_ts = options.moment ? time.valueOf() : time.getTime();
                req.roa = {
                    timestamp: roa_ts,
                    moment: time,
                    request_ms: now  - ts,
                    diff_ms: now - roa_ts
                };

                next();
            });

        }
    }
};

function getROA(options, cb) {

    ntpClient.getNetworkTime(roa_ntp_server, roa_ntp_port, function(err, date) {
        if(err) {
            return cb(err);
        }

        if( options.moment === false ) {
            return cb(null, date);
        }

        moment.locale(options.locale);
        date = moment(date).tz('Europe/Madrid');
        cb(null, date);
    });
}
