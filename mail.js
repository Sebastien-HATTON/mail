/**
 * Mail Service for Venture Game
 */

'use strict';

var nodemailer = require('nodemailer');

var transports = {
    test: require('nodemailer-stub-transport')()
};

module.exports = function mail(options) {
    var seneca = this,
        sender = nodemailer.createTransport(transports[options.transport]);

    // SEND
    seneca.add('service:mail,action:send', function (msg, respond) {
        var fields = {
            from: msg.from,
            to: msg.to,
            subject: msg.subject,
            text: msg.text
        };
        sender.sendMail(fields, function(error, info){
            respond(error, info);
        });
    });
};
