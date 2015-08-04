'use strict';

var assert = require('chai').assert,
    seneca = require('seneca');

describe('action:send', function() {
    var se = seneca().use('mail', {transport: 'test'}),
        mail = se.pin({service: 'mail', action: '*'});
    it('sends a message', function (done) {
        console.log();
        mail.send({
            to: 'test@test.com',
            from: 'mail@service.com',
            subject: 'test!',
            text: 'Hello there!'
        }, function (error, res) {
            assert.equal(res.envelope.to, 'test@test.com');
            assert.equal(res.envelope.from, 'mail@service.com');
            assert.ok(res.messageId);
            assert.ok(res.response);
            done();
        });
    });
});
