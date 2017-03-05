class FlowRecognizer {
  constructor(settings) {
    this.settings = settings || {};
    this.initializeModels();
  }

  initializeModels() {
    this.models = this.settings.models || {};
    if (typeof this.models === 'string') {
      let key = this.models;
      this.models = {};
      this.addModel('*', key);
    }
  }

  log(level, message) {
    if (this.settings.logger) {
      this.settings.logger.log(level, message);
    }
  }

  addModel(locales, key) {
    if (typeof locales === 'string') {
      locales = [locales];
    }
    for (let i = 0; i < locales.length; i++) {
      this.models[locales[i]] = key;
    }
  }

  getModel(locale) {
    locale = locale || '*';
    let model = this.models[locale];
    if (!model) {
      model = this.models['*'];
    }
    return model;
  }

  recognizeUtterance(utterance, model, cb) {
    return cb();
  }

  recognize(context, cb) {
    let result = { score: 0.0, intent: null };
    if (context && context.message && context.message.text) {
      let utterance = context.message.text;
      let model = this.getModel(context.locale);
      if (model) {
        this.recognizeUtterance(utterance, model, function(error, intents, entities) {
          if (error) {
            return cb(error);
          }
          result.intents = intents;
          result.entities = entities;
          let top;
          for (let i = 0; i < intents.length; i++) {
            if (!top || intents[i].score > top.score) {
              top = intents[i];
            }
          }
          if (top) {
            result.score = top.score;
            result.intent = top.intent;
            switch(top.intent.toLowerCase()) {
            case 'builtin.intent.none':
            case 'none':
              result.score = 0.1;
              break;
            }
          }
          return cb(null, result);
        });
      } else {
        return cb(new Error('Model not found for locale '+context.locale));
      }
    } else {
      return cb(null, result); 
    }
  }
}

export default FlowRecognizer;

