/**
 * Mail Service for Venture Game
 */

'use strict';

var nodemailer = require('nodemailer'),
    winston = require('winston'),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                name: 'sent_mail',
                filename: './logs/sent_mail.log',
                level: 'info',
                json: false
            })
        ]
    });

var transports = {
    test: require('nodemailer-stub-transport')(),
    pickup: require('nodemailer-pickup-transport')({directory: './mail'})
};

module.exports = function mail(options) {
    var seneca = this,
        sender = nodemailer.createTransport(transports[options.transport]);

    // SEND
    seneca.add('service:mail,action:send', function (msg, respond) {
        var fields = {
            from: msg.from || 'no-reply@venture-game-mail-service',
            to: msg.to,
            subject: msg.subject,
            text: msg.text
        };
        sender.sendMail(fields, function(error, info){
            if (options.transport != 'test' && !error) {
                logger.info('message sent', {id: info.messageId, data: fields});
            }
            respond(error, info);
        });
    });
};
