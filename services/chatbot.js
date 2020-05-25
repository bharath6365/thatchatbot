const dialogFlow = require('dialogflow');
const config = require('../config/keys');
const structJson = require('./structjson');

const projectID = config.googleProjectID;
const credentials =  {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({
  projectID,
  credentials
});

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
exports.textQuery = async (incomingText, parameters = {}) => {
  const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: incomingText,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return result;
}

exports.eventQuery = async (incomingEvent, parameters = {}) => {
  const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: incomingEvent,
          // GRPC Handling of JSON. Remember dialogflow uses GRPC.
          parameters: structJson.jsonToStructProto(parameters),
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode
        }
      }
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return result;
}