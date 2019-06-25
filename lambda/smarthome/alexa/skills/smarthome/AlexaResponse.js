// # `AlexaResponse`
// Response Messages for Smart Home 

'use strict';

let uuid = require('uuid');

 
class AlexaResponse {


    //  Check a value for validity or return a default.
    //  <br> **Value**  The value being checked
    //  <br> **defaultValue**  A default value if the passed value is not valid
    //  <br> **returns {*}**  The passed value if valid otherwise the default value.
    //  
    checkValue(value, defaultValue) {

        if (value === undefined || value === {} || value === "")
            return defaultValue;

        return value;
    }

    // 
    //  # `Constructor`
    //  The Alexa Response Constructor this create JSON Response which corresponds 
    //  to the format required or a Smart Device
    //  <br> **constructor**
    //  <br> **opts** Contains initialization options for the response
    //  
    constructor(opts) {

        if (opts === undefined)
            opts = {};

        if (opts.context !== undefined)
        {
            this.context = this.checkValue(opts.context, undefined);
        }

        if (opts.event !== undefined)
        {
            this.event = this.checkValue(opts.event, undefined);
        }
        else
        {
                this.event = {
                "header": {
                    "namespace": this.checkValue(opts.namespace, "Alexa"),
                    "name": this.checkValue(opts.name, "Response"),
                    "messageId": this.checkValue(opts.messageId, uuid()),
                    "correlationToken": this.checkValue(opts.correlationToken, undefined),
                    "payloadVersion": this.checkValue(opts.payloadVersion, "3")
                },
                "endpoint": {
                    "scope": {
                        "type": "BearerToken",
                        "token": this.checkValue(opts.token, "INVALID"),
                    },
                    "endpointId": this.checkValue(opts.endpointId, "INVALID")
                },
                "payload": this.checkValue(opts.payload, {})
                };
        }

        // No endpoint in an AcceptGrant or Discover request
        if (this.event.header.name === "AcceptGrant.Response" || this.event.header.name === "Discover.Response")
        {
            delete this.event.endpoint;
        }

    }

    //  # `addContextProperty`
    //  Add a property to the context.
    //  <br>  **opts** Contains options for the property.
    //  
    addContextProperty(opts) {

        if (this.context === undefined)
            this.context = {properties: []};

        this.context.properties.push(this.createContextProperty(opts));
    }

    
    //   # `addPayloadEndpoint`
    //   Add an endpoint to the payload.
    //   <br> **opts** Contains options for the endpoint.
     
    addPayloadEndpoint(opts) {

        if (this.event.payload.endpoints === undefined)
            this.event.payload.endpoints = [];

        this.event.payload.endpoints.push(this.createPayloadEndpoint(opts));
    }

    //  # `createContextProperty`
    //   Creates a property for the context.
    //   <br> **opts** Contains options for the property.
    //  
    createContextProperty(opts) {
        return {
            'namespace': this.checkValue(opts.namespace, "Alexa.EndpointHealth"),
            'name': this.checkValue(opts.name, "connectivity"),
            'value': this.checkValue(opts.value, {"value": "OK"}),
            'timeOfSample': new Date().toISOString(),
            'uncertaintyInMilliseconds': this.checkValue(opts.uncertaintyInMilliseconds, 0)
        };
    }

    // # `createPayloadEndpoint`
    //  Creates an endpoint for the payload.
    //  <br> **opts** Contains options for the endpoint.

    createPayloadEndpoint(opts) {

        if (opts === undefined) opts = {};

        // Return the proper structure expected for the endpoint
        let endpoint =
            {
                "capabilities": this.checkValue(opts.capabilities, []),
                "description": this.checkValue(opts.description, "Lambda Endpoint for Smart Device Lab"),
                "displayCategories": this.checkValue(opts.displayCategories, ["OTHER"]),
                "endpointId": this.checkValue(opts.endpointId, 'endpoint-001'),
                "friendlyName": this.checkValue(opts.friendlyName, "Lab Endpoint"),
                "manufacturerName": this.checkValue(opts.manufacturerName, "Linux Academy")
            };

        if (opts.hasOwnProperty("cookie"))
            endpoint["cookie"] = this.checkValue('cookie', {});

        return endpoint
    }

    // # `createPayloadEndpointCapability`
    //  Creates a capability for an endpoint within the payload.
    //  <br> **opts** Contains options for the endpoint capability.
    //  
    createPayloadEndpointCapability(opts) {

        if (opts === undefined) opts = {};

        let capability = {};
        capability['type'] = this.checkValue(opts.type, "AlexaInterface");
        capability['interface'] = this.checkValue(opts.interface, "Alexa");
        capability['version'] = this.checkValue(opts.version, "3");
        let supported = this.checkValue(opts.supported, false);
        if (supported) {
            capability['properties'] = {};
            capability['properties']['supported'] = supported;
            capability['properties']['proactivelyReported'] = this.checkValue(opts.proactivelyReported, false);
            capability['properties']['retrievable'] = this.checkValue(opts.retrievable, false);
        }
        return capability
    }

    //  # `get`
    //  Get the composed Alexa Response.
    //  <br> **returns {AlexaResponse}**
    //  
    get() {
        return this;
    }
}

module.exports = AlexaResponse;