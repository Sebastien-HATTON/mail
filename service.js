'use strict';

var seneca = require('seneca');

seneca()
    .use('mail')
    .ready(function(error) {
        if (error) return console.log(err);
    })
    .listen();
