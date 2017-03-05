'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlowRecognizer = function () {
  function FlowRecognizer(settings) {
    _classCallCheck(this, FlowRecognizer);

    this.settings = settings || {};
    this.initializeModels();
  }

  _createClass(FlowRecognizer, [{
    key: 'initializeModels',
    value: function initializeModels() {
      this.models = this.settings.models || {};
      if (typeof this.models === 'string') {
        var key = this.models;
        this.models = {};
        this.addModel('*', key);
      }
    }
  }, {
    key: 'log',
    value: function log(level, message) {
      if (this.settings.logger) {
        this.settings.logger.log(level, message);
      }
    }
  }, {
    key: 'addModel',
    value: function addModel(locales, key) {
      if (typeof locales === 'string') {
        locales = [locales];
      }
      for (var i = 0; i < locales.length; i++) {
        this.models[locales[i]] = key;
      }
    }
  }, {
    key: 'getModel',
    value: function getModel(locale) {
      locale = locale || '*';
      var model = this.models[locale];
      if (!model) {
        model = this.models['*'];
      }
      return model;
    }
  }, {
    key: 'recognizeUtterance',
    value: function recognizeUtterance(utterance, model, cb) {
      return cb();
    }
  }, {
    key: 'recognize',
    value: function recognize(context, cb) {
      var result = { score: 0.0, intent: null };
      if (context && context.message && context.message.text) {
        var utterance = context.message.text;
        var model = this.getModel(context.locale);
        if (model) {
          this.recognizeUtterance(utterance, model, function (error, intents, entities) {
            if (error) {
              return cb(error);
            }
            result.intents = intents;
            result.entities = entities;
            var top = void 0;
            for (var i = 0; i < intents.length; i++) {
              if (!top || intents[i].score > top.score) {
                top = intents[i];
              }
            }
            if (top) {
              result.score = top.score;
              result.intent = top.intent;
              switch (top.intent.toLowerCase()) {
                case 'builtin.intent.none':
                case 'none':
                  result.score = 0.1;
                  break;
              }
            }
            return cb(null, result);
          });
        } else {
          return cb(new Error('Model not found for locale ' + context.locale));
        }
      } else {
        return cb(null, result);
      }
    }
  }]);

  return FlowRecognizer;
}();

exports.default = FlowRecognizer;