const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const sessionId = uuid.v4();
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runIntent(projectId, requestText) {
// Um identificador único para determinada sessão
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "[coloque aqui o diretório do arquivo .json fornecido pelo DialogFlow. veja o exemplo no aquivo 'agente.json']"
  });

const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
);
const intentRequest = {
    session: sessionPath,
    queryInput: {
    text: {
        // A consulta a ser enviada ao agente dialogflow
        text: requestText,
        // Linguagem utilizada pelo usuario (pt-BR)
        languageCode: 'pt-BR',
    },
    },
};

// A solicitação de consulta de texto.
// Envie a solicitação e registre o resultado
const responses = await sessionClient.detectIntent(intentRequest);
const result = responses[0].queryResult;

return await {
        "Query": result.queryText,
        "Response": result.fulfillmentText,
        "Intent": result.intent.displayName
    };
}
  
module.exports.runIntent = runIntent;