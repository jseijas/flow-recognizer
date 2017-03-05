import FlowRecognizer from './flow-recognizer';
import apiai from 'apiai';
import uuid from 'uuid';

class FlowRecognizerApiai extends FlowRecognizer{
  constructor(settings) {
    super(settings);
    this.apps = {};
  }

  getApp(model) {
    if (!this.apps[model]) {
      this.apps[model] = new apiai(model);
    }
    return this.apps[model];
  }

  getDefaultEntities(result) {
    return [
      {
        entity: result.fulfillment.speech,
        type: 'fulfillment',
        startIndex: -1,
        endIndex: -1,
        score: 1
      }, 
      {
        entity: result.actionIncomplete,
        type: 'actionIncomplete',
        startIndex: -1,
        endIndex: -1,
        score: 1
      }
    ]
  }

  recognizeUtterance(utterance, model, cb) {
    let app = this.getApp(model);
    let request = app.textRequest(utterance, { sessionId: uuid.v1() });
    request.on('response', function(response) {
      let result = response.result;
      let intent;
      let entities;
      if (result.source === 'domains') {
        entities = this.getDefaultEntities(result);
        intent = { score: result.score, intent: result.action, entities: entities };
      } else if (result.source === 'agent') {
        entities = this.getDefaultEntities(result);
        for (let key in result.parameters) {
          let entity = result.parameters[key];
          let length = entity.length;
          if (length > 0) {
            let startIndex = utterance.indexOf(entity);
            let entityFound = {
              entity: entity,
              type: key,
              startIndex: startIndex,
              endIndex: startIndex+length-1,
              score: 1
            };
            entities.push(entityFound);
          }
        }
        intent = { score: result.score, intent: result.metadata.intentName, entities: entities };
      }
      cb(null, { score: 1, intent: intent.intent }, intent.entities);
    }.bind(this));
    request.on('error', function(error) {
      this.log('error', error.toString());
      cb(error);
    }.bind(this));
    request.end();
  }
}

export default FlowRecognizerApiai; 