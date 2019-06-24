
const https = require('https');
const index = require("../index");
let assert = require('assert');

// const sampleUri = "https://raw.githubusercontent.com/alexa/alexa-smarthome/master/sample_messages/";


function getSample(sample_json, callback) {

    let options = {
        hostname: 'raw.githubusercontent.com',
        port: 443,
        path: '/alexa/alexa-smarthome/master/sample_messages/' + sample_json,
        headers: { 'Content-Type': 'application/json' }
    };

    let json_string = "";

    let req = https.request(options, (res) => {

        res.setEncoding('utf8');
        res.on('data', (data) => {
            json_string += data;
        });

        res.on('end', () => {
            callback(JSON.parse(json_string));
        });

        req.on('error', (e) => {
            console.error(e);
        });

    });

    req.end();
}


describe('AlexaHandler', function() {
    describe('TestIndex', function() {

        it('Test the index for Authorization', function() {
            getSample("Authorization/Authorization.AcceptGrant.request.json", function (json_data) {
                index.handler(json_data, undefined).then(function(response) {
                    // fulfillment
                    console.log(response.event.header.namespace);
                    assert.equal(response.event.header.namespace, "Alexa.Authorization");
                    assert.equal(response.event.header.name, "AcceptGrant.Response");
                }, function(reason) {
                    // rejection
                    console.log("rejection value:", reason);
                });
            });
        });

        it('Test the index for Discovery', function() {
            getSample("Discovery/Discovery.request.json", function (json_data) {
                index.handler(json_data, undefined).then(function(response) {
                    // fulfillment
                    console.log(response.event.header.namespace);
                    assert.equal(response.event.header.namespace, "Alexa.Discovery");
                    assert.equal(response.event.header.name, "Discover.Response");
                }, function(reason) {
                    // rejection
                    console.log("rejection value:", reason);
                });
            });
        });

        it('Test the index for PowerController', function() {
            getSample("PowerController/PowerController.TurnOff.request.json", function (json_data) {
                index.handler(json_data, undefined).then(function(response) {
                    // fulfillment
                    console.log(response.event.header.namespace);
                    assert.equal(response.context.properties[0].namespace, "Alexa.PowerController");
                    assert.equal(response.context.properties[0].name, "powerState");
                }, function(reason) {
                    // rejection
                    console.log("rejection value:", reason);
                });
            });
        });
    });
});