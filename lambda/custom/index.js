// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const HelloInfo = [
  'It was nice getting to know you ',
  'Thanks for telling me about yourself ',
  'I Hope you learned something ',
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello an i will ask you your name. Or tell me where your from?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
          console.log(' canHandle HelloWorldIntentHandler');
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        console.log(' entered handle HelloWorldIntentHandler');
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const name = slots['name'].value;
        const speechText = `Hello : ${name}.`
        return handlerInput.responseBuilder
 
            .speak(speechText)
            .addDelegateDirective('WhereDoYouLiveIntent')
            .withSimpleCard('I learned your name', speechText)
            .getResponse();
    }
};



//error because resolution with resolutionsPerAuthority is not filled for buitin slot type so SlotValues is never validated. 
//change slot type or create custom slot synonym so resolutionsPerAuthority are returned. 

const StarteddGettingToKnowYouHandler = {
  canHandle(handlerInput) {
    console.log(' canHandle StarteddGettingToKnowYouHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&  request.intent.name === 'WhereDoYouLiveIntent'  && request.dialogState === 'STARTED';
  },
  handle(handlerInput) {
    console.log('entered StarteddGettingToKnowYouHandler');
    const currentIntent = handlerInput.requestEnvelope.request.intent; 
    let myName = currentIntent.slots.name;

    
    currentIntent.slots.name.value =  getUserDefaultName();
    
    const slotValues = getSlotValues(currentIntent.slots);

        if (slotValues['name'].value === undefined || slotValues['name'] === null || slotValues['name'].synonym === 'slim shady' ) {
            
            const city = slotValues['city'].synonym;
            const name = slotValues['name'].synonym;
            const speechText = `Cool your from ${city}. whats your name`
			return handlerInput.responseBuilder
				.speak(speechText)
				.addElicitSlotDirective('name')
				.getResponse();
		}else {
		    
         const name = slotValues['name'].synonym;
         const speechText = `Cool your name is ${name}.`
         
		 return handlerInput.responseBuilder
		.speak(speechText)
	    .addDelegateDirective(currentIntent)
        .getResponse();
		    
		}
    

    
  },
};

  

const InprogressGettingToKnowYouMoreHandler = {
  canHandle(handlerInput) {
    console.log('canHandle InprogressGettingToKnowYouMoreHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'WhereDoYouLiveIntent' &&
      handlerInput.requestEnvelope.request.intent.slots.name.confirmationStatus === "NONE" &&
      request.dialogState === 'IN_PROGRESS';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    console.log('entered handler InprogressGettingToKnowYouMoreHandler');
    const slotValues = getSlotValues(currentIntent.slots);
    const name = slotValues['name'].synonym;
    const speechText = `great your name is  ${name} did i get that right`
    return handlerInput.responseBuilder
      .speak(speechText)
      .addConfirmSlotDirective("name")
      .getResponse();
  },
};

const delegateBacktoAlexaHandler = {
  canHandle(handlerInput) {
     console.log('can Handle delegateBacktoAlexaHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && 
      request.intent.name === 'WhereDoYouLiveIntent' &&
      request.dialogState === 'IN_PROGRESS';
  },
  handle(handlerInput) {
       console.log('can Handle delegateBacktoAlexaHandler');
       const currentIntent = handlerInput.requestEnvelope.request.intent;
    
        return handlerInput.responseBuilder
            .speak("Ok lets see if I know you now.")
            .addDelegateDirective(currentIntent)
            .withSimpleCard('What I learned')
            .getResponse();
  },
};

const CompletedGettingToKnowYouHandler = {
  canHandle(handlerInput) {
     console.log('can Handle CompletedGettingToKnowYouHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && 
      request.intent.name === 'WhereDoYouLiveIntent' &&
      request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
       console.log('can Handle CompletedGettingToKnowYouHandler');
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const city = slots['city'].value;
    const name = slots['name'].value;
        
    const speechText = `shout out to all my peoples from  : ${city}. It was nice getting to know you ${name}`
    
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('I learned where you are from', city)
            .getResponse();
  },
};




const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello an i will ask you your name. Or tell me where your from';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
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
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

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

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
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

// given an intent and an array slots, intentSlotsHaveBeenFilled will determine
// if all of the slots in the array have been filled.
// Returns:
// (true | false)
function isDefaultName(intent, slots){
  const slotValues = getSlotValues(intent.slots);
  console.log('slot values:', JSON.stringify(slotValues));
  let result = false;
  
  // The default value is set

 if (slotValues['name'].synonym === "slim shady") {
          result = true;
      }
  
  console.log('Results of Default Name:', result);
  return result;
}

// given an intent and an array slots, intentSlotsHaveBeenFilled will determine
// if all of the slots in the array have been filled.
// Returns:
// (true | false)
function intentSlotsHaveBeenFilled(intent, slots){
  const slotValues = getSlotValues(intent.slots);
  console.log('slot values:', JSON.stringify(slotValues));
  let result = true;
  slots.forEach(slot => {
      console.log('intentSlotsHaveBeenFilled:', slot);
      if (!slotValues[slot].value) {
          result = false;
      }
  });

  return result;
}

// 2. Helper Functions ============================================================================

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return (array[i]);
}

function getUserDefaultName() {
    
    return "slim shady"
    
}

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        StarteddGettingToKnowYouHandler,
        InprogressGettingToKnowYouMoreHandler,
        delegateBacktoAlexaHandler,
        CompletedGettingToKnowYouHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
