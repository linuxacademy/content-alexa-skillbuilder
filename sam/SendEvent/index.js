
// dependencies

var AWS = require('aws-sdk');
var util = require('util');
const https = require('https');



const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log('Loading function');

exports.handler = function(event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var eventTime = event.Records[0].eventTime;
    var provider = "linux Academy";
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " ")); 
    console.log('BUCKET MESSAGE RECIEVED');
    notify(srcKey, eventTime, provider);  // Multicast
};


async function notify(mediaEventName, mediaEventTime, mediaEventProvider) {
    const token = await getToken();
    const status = await sendEvent(token,  mediaEventName, mediaEventTime, mediaEventProvider);

    console.log(`Sent notification for ${mediaEventName} at ${mediaEventTime} on ${mediaEventProvider}`);

    return status;
}

function getProactiveOptions(token, postLength){

    return {
        hostname: 'api.amazonalexa.com',  
        port: 443,
        path: '/v1/proactiveEvents/' + 'stages/development',  // mode: global var
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postLength,
            'Authorization' : 'Bearer ' + token
        }
    };
}

function getMediaEvent(mediaEventName, mediaEventTime, mediaEventProvider) {

    let timestamp = new Date();
    let expiryTime = new Date();
    let startTime = new Date(mediaEventTime);

    expiryTime.setMinutes(expiryTime.getHours() + 24);

    let referenceId = "SampleReferenceId" + new Date().getTime();  // cross reference to records in your existing systems

    const eventJson = {
        "timestamp": timestamp.toISOString(),
        "referenceId": referenceId,
        "expiryTime": expiryTime.toISOString(),
        "event": {
            "name": "AMAZON.MediaContent.Available",
            "payload": {
                "availability": {
                    "startTime" : startTime.toISOString(),
                    "provider": {
                        "name": "localizedattribute:providerName"
                    },
                    "method": "STREAM"
                },
                "content": {
                    "name": "localizedattribute:contentName",
                    "contentType": "GAME"
                }
            },
        },
        "localizedAttributes": [
            {
                "locale": "en-US",
                "providerName": mediaEventProvider,
                "contentName": mediaEventName
            },
            {
                "locale": "en-GB",
                "providerName": mediaEventProvider,
                "contentName": mediaEventName
            }
        ],
        "relevantAudience": {
            "type": "Multicast",
            "payload": {}
        }
    };
    // console.log(JSON.stringify(eventJson, null, 2));
    return eventJson;

}
// ----------------------------------------------------------------------------

function getTokenOptions(postLength){
    // const TokenPostData = getTokenPostData();
    return {
        hostname: 'api.amazon.com',
        port: 443,
        path: '/auth/O2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postLength // TokenPostData.length
        }
    };
}

function getTokenPostData() {

    return 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret + '&scope=alexa::proactive_events';
}

function getToken() {
    return new Promise(resolve => {
        const TokenPostData = getTokenPostData();
        const req = https.request(getTokenOptions(TokenPostData.length), (res) => {
            res.setEncoding('utf8');
            let returnData = '';

            res.on('data', (chunk) => { returnData += chunk; });

            res.on('end', () => {
                const tokenRequestId = res.headers['x-amzn-requestid'];
                // console.log(`Token requestId: ${tokenRequestId}`);
                resolve(JSON.parse(returnData).access_token);
            });
        });
        req.write(TokenPostData);
        req.end();

    });
}


// ----------------------------------------------------------------------------

function sendEvent(token, mediaEventName, mediaEventTime, mediaEventProvider) {
    return new Promise(resolve => {

        // const ProactivePostData = JSON.stringify(getProactivePostData(eventType, userId, message));
        const ProactivePostData = JSON.stringify(getMediaEvent(mediaEventName, mediaEventTime, mediaEventProvider));

        // console.log(`\nProactivePostData\n${JSON.stringify(JSON.parse(ProactivePostData), null, 2)}\n-----------`);

        const ProactiveOptions = getProactiveOptions(token, ProactivePostData.length);
        // console.log(`ProactiveOptions\n${JSON.stringify(ProactiveOptions, null, 2)}`);

        const req = https.request(ProactiveOptions, (res) => {
            res.setEncoding('utf8');

            if ([200, 202].includes(res.statusCode)) {
                // console.log('successfully sent event');
                // console.log(`requestId: ${res.headers['x-amzn-requestid']}`);

            } else {

                console.log(`Error https response: ${res.statusCode}`);
                console.log(`requestId: ${res.headers['x-amzn-requestid']}`);

                if ([403].includes(res.statusCode)) {
                    resolve(`error ${res.statusCode}`);
                }
            }

            let returnData;
            res.on('data', (chunk) => { returnData += chunk; });


            res.on('end', () => {
                const requestId = res.headers['x-amzn-requestid'];
                // console.log(`requestId: ${requestId}`);
                //console.log(`return headers: ${JSON.stringify(res.headers, null, 2)}`);
                resolve(`sent event ${mediaEventName}`);
            });
        });
        req.write(ProactivePostData);
        req.end();

    });

}


