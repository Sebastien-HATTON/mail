'use strict';

var seneca = require('seneca');

seneca()
    .use('mail', {transport: 'stub'})
    .ready(function(error) {
        if (error) return console.log(err);
    })
    .listen();
