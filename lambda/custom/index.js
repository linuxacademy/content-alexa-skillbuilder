// ## Intents Annotated Code 
//This is the source code for Slots Lab the focus of this code 
//is working with the created slots. This will aid you in understanding slots

const Alexa = require('ask-sdk-core');

const HelloInfo = [
  'It was nice getting to know you ',
  'Thanks for telling me about yourself ',
  'I Hope you learned something ',
];

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
        const speechText = 'You can say hello an i will ask you your name. Or tell me where your from?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// # `HelloWorldIntent` 
//This is code to demonstrate addDelegateDirective
//This will continue the conversation this demonstrates the slots are not passed between intents
//As the name value will not be passed even though it was filled when this intent was completed. 
//You will need to use session attributes to pass the values between intents. 

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


// # `StarteddGettingToKnowYouHandler`
//This is code to demonstrate Entiy resolutionsPerAuthority 
//while managing your own dialog model this demonstrates validation of slots 
//Ciy will be resolved an return with entity resolution while Name will not because
//The slot is a built in type. This can be shown in the json reponse. 
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

// # `InprogressGettingToKnowYouMoreHandler`
//This is code to demonstrate manual slot confirmation 
//while managing your own dialog model you can force non mandatory slots confirmation 
//Dynamically in code even if the interaction model does not define them as mandatory to fill the slot. 

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

// # `delegateBacktoAlexaHandler`
//This is code to demonstrate returning the slot validation for the intent back to Alexa dialog managment 
//For complex slot you may need to use manual methods but in the case where you just want alexa to collect the slot 
// Because the slot is defined as required to fulfill the intent this code will just return a directive for the current slot 
// The Ask SDK will then use the dialog models and prompts for the mandatory slots and attempt to fill them. 

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

// # `CompletedGettingToKnowYouHandler`
//This is code to demonstrate the dialog state being set to complete because all the required slots are filled 
//The code then builds the reponse based on the values in the slots, this code will only execute when the dialog state is complete
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



// # `HelpIntentHandler`
// The help intent handler will helpe the user when they ask for help

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

// # `isDefaultName`
// This code will check to see if we set the slot to the default name. and return true if the user has not set there name. 
// and the code is using the default value. 
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

// # `intentSlotsHaveBeenFilled`
// Helper function to check to see if the slots have been filled. 
// Given an intent and an array slots, intentSlotsHaveBeenFilled will determine
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


// # `getSlotValues`
// Helper function to check to see if the slots have been filled by using resolutionsPerAuthority Response 
// Given an array slots, getSlotValues will determine
// if they have been matched with a predefined value 
// Returns:
// slotValues array key value pair
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

// # `getRandomPhrase`
// Helper function to check to see if the slots have been filled by using resolutionsPerAuthority Response 
// Given an array slots, getSlotValues will determine
// if they have been matched with a predefined value 
// Returns:
// a string contained within the array passed keeping Alexa ouput relatable 
function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return (array[i]);
}

// # `getUserDefaultName`
// Helper function used to set a slot default name value 
// Returns:
// a string with the default value
function getUserDefaultName() {
    
    return "slim shady"
    
}

// # `exports.handler`
// When you define a skill you need to register your handlers with the skill 
// Order matters they will be executed in the order they are added. 
// Keep this is mind when adding them to the list. 
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
