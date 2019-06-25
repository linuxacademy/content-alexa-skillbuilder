
'use strict';
// # `Smart Home Lab`
// Setup for account linking and  Messages for Smart Home 

let AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

let AlexaResponse = require("./alexa/skills/smarthome/AlexaResponse");


exports.handler = async function (event, context) {

    // Dump the request for logging - check the CloudWatch logs
    console.log("index.handler request  -----");
    console.log(JSON.stringify(event));

    if (context !== undefined) {
        console.log("index.handler context  -----");
        console.log(JSON.stringify(context));
    }

    // Validate we have an Alexa directive
    if (!('directive' in event)) {
        let aer = new AlexaResponse(
            {
                "name": "ErrorResponse",
                "payload": {
                    "type": "INVALID_DIRECTIVE",
                    "message": "Missing key: directive, Is request a valid Alexa directive?"
                }
            });
        return sendResponse(aer.get());
    }

    // Check the payload version
    if (event.directive.header.payloadVersion !== "3") {
        let aer = new AlexaResponse(
            {
                "name": "ErrorResponse",
                "payload": {
                    "type": "INTERNAL_ERROR",
                    "message": "This skill only supports Smart Home API version 3"
                }
            });
        return sendResponse(aer.get())
    }

    let namespace = ((event.directive || {}).header || {}).namespace;
    // # `alexa.authorization`
    // Setup Return response for autorization for this lab the authorization will be provided via 
    // AWS Cognito
    if (namespace.toLowerCase() === 'alexa.authorization') {
        let aar = new AlexaResponse({"namespace": "Alexa.Authorization", "name": "AcceptGrant.Response",});
        return sendResponse(aar.get());
    }
    // # `alexa.discovery`
    // This returns the JSON discovery Message 
    // This is a list of capabilities for the switch as defined by the PowerController interface. 

    if (namespace.toLowerCase() === 'alexa.discovery') {
        let adr = new AlexaResponse({"namespace": "Alexa.Discovery", "name": "Discover.Response"});
        let capability_alexa = adr.createPayloadEndpointCapability();
        let capability_alexa_powercontroller = adr.createPayloadEndpointCapability({"interface": "Alexa.PowerController", "supported": [{"name": "powerState"}]});
        adr.addPayloadEndpoint({"friendlyName": "Sample Switch", "endpointId": "sample-switch-01", "capabilities": [capability_alexa, capability_alexa_powercontroller]});
        return sendResponse(adr.get());
    }
    // # `alexa.powercontroller`
    // Setup of the event directives 
    // Each directive for the specific event has a defined value and response format
    if (namespace.toLowerCase() === 'alexa.powercontroller') {
        let power_state_value = "OFF";
        if (event.directive.header.name === "TurnOn")
            power_state_value = "ON";

        let endpoint_id = event.directive.endpoint.endpointId;
        let token = event.directive.endpoint.scope.token;
        let correlationToken = event.directive.header.correlationToken;

        let ar = new AlexaResponse(
            {
                "correlationToken": correlationToken,
                "token": token,
                "endpointId": endpoint_id
            }
        );
        ar.addContextProperty({"namespace":"Alexa.PowerController", "name": "powerState", "value": power_state_value});

        // Check for an error when setting the state
        let state_set = sendDeviceState(endpoint_id, "powerState", power_state_value);
        if (!state_set) {
            return new AlexaResponse(
                {
                    "name": "ErrorResponse",
                    "payload": {
                        "type": "ENDPOINT_UNREACHABLE",
                        "message": "Unable to reach endpoint database."
                    }
                }).get();
        }

        return sendResponse(ar.get());
    }

};
// # `sendResponse`
// Send the response back from the recieved directive 
// This also logs the response in cloud watch
function sendResponse(response)
{
    console.log("index.handler response -----");
    console.log(JSON.stringify(response));
    return response
}
// # `sendDeviceState`
// Update DyanmoDB the state of the switch 
function sendDeviceState(endpoint_id, state, value) {
    let dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    let key = state + "Value";
    let attribute_obj = {};
    attribute_obj[key] = {"Action": "PUT", "Value": {"S": value}};

    let request = dynamodb.updateItem(
        {
            TableName: "SampleSmartHome",
            Key: {"ItemId": {"S": endpoint_id}},
            AttributeUpdates: attribute_obj,
            ReturnValues: "UPDATED_NEW"
        });

    console.log("DynaomDB index.sendDeviceState request -----");
    console.log(request);

    let response = request.send();

    console.log("DynaomDB index.sendDeviceState response -----");
    console.log(response);
    return true;
}
