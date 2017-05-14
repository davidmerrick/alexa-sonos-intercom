'use strict';

import Alexa from 'alexa-sdk'
import axios from 'axios'
import MessageUtils from 'utils/MessageUtils'

const INVOCATION_NAME = process.env.INVOCATION_NAME || "Sonos Intercom";
const APP_ID = process.env.APP_ID;

function getHelpResponse(){
    let speechOutput = `Welcome to ${INVOCATION_NAME}. What message would you like to broadcast?`;
    return speechOutput;
}

// Note: these functions can't be ES6 arrow functions; "this" ends up undefined if you do that.
const handlers = {
    'LaunchRequest': function(){
        let speechOutput = getHelpResponse();
        this.emit(':ask', speechOutput, "What message would you like to broadcast?");
    },
    'AMAZON.HelpIntent': function(){
        let speechOutput = getHelpResponse();
        this.emit(':ask', speechOutput, "What message would you like to broadcast?");
    },
    'AMAZON.StopIntent': function(){
        let speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function(){
        let speechOutput = "Okay";
        this.emit(':tell', speechOutput);
    },
    'BroadcastMessageIntent': function(){
        let slots = this.event.request.intent.slots;
        let message = slots.Message.value;
        message = MessageUtils.sanitizeMessage(message);

        const SONOS_API_SERVER = process.env.SONOS_API_SERVER;
        const AUTH_USERNAME = process.env.AUTH_USERNAME;
        const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

        let auth = {
            username: AUTH_USERNAME,
            password: AUTH_PASSWORD
        };

        let options = {
            auth: auth
        };

        axios.get(`${SONOS_API_SERVER}/sayall/${message}`, options)
            .then(response => {
                console.log("SUCCESS: broadcasted message.");
                this.emit(':tell', `Done.`);
                return;
            })
            .catch(err => {
                console.error(err);
                this.emit(':tell', "Error occurred broadcasting message");
                return;
            });
    }
};

exports.handler = (event, context, callback) => {
    let alexa = Alexa.handler(event, context);
    // Only set appId if not debugging
    if ('undefined' === typeof process.env.DEBUG) {
        alexa.appId = APP_ID;
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
};