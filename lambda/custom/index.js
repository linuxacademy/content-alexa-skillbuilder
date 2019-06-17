// ## Intents Annotated Code 
//This is the source code for intents Lab the focus of this code 
//is working with the created intent. This will aid you in understanding intents 

const Alexa = require('ask-sdk-core');

// # `launch request handler`
// The launch request handler is used to start the skill
// When a customer starts your skill by saying, “Open LinuxAcademy Lab” your skill receives 
// a request of type “LaunchRequest.”
// To handle this request, an object of type LaunchRequestHandler is created in code. 
// You can name the lauch request handler anything you want. 
// I suggest you standardize and create a nameing convention and give your handlers
// a name related to the type of request it they handle. 
// In this case its called LaunchRequestHandler, 


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the Linux Academy Skill Builder intents Lab. Say hello and I will ask you your name.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// # `HelloWorldIntent` 
// Hello World Intent Handler Handles  IntentRequest named HelloWorldIntent

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const name = slots['name'].value;
        const speechText = `Hello ${name}.`
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('I learned your name, its ', name)
            .getResponse();
    }
};

// # `HelpIntentHandler`
// The help intent handler will helpe the user when they ask for help
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can tell me your name so I can say hello to you, How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
// # `CancelAndStopIntentHandler`
// A built in intent to handle the Cancel and Stop requests. 
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

// # `SessionEndedRequestHandler`
// This is a built in request that notest the session is ended
// Note: No auido is output by this intent as the session is ended. 

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};


// # `IntentReflectorHandler`
// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// # `ErrorHandler`
// When the interactio model recieves an utterance it can not handle the Error handler is executed. 
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};



// // # `Skill Builder Entry Pint`
// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
