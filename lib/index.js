'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowRecognizerWit = exports.FlowRecognizerApiai = exports.FlowRecognizerLuis = exports.FlowRecognizer = undefined;

var _flowRecognizer = require('./flow-recognizer');

var _flowRecognizer2 = _interopRequireDefault(_flowRecognizer);

var _flowRecognizerLuis = require('./flow-recognizer-luis');

var _flowRecognizerLuis2 = _interopRequireDefault(_flowRecognizerLuis);

var _flowRecognizerApiai = require('./flow-recognizer-apiai');

var _flowRecognizerApiai2 = _interopRequireDefault(_flowRecognizerApiai);

var _flowRecognizerWit = require('./flow-recognizer-wit');

var _flowRecognizerWit2 = _interopRequireDefault(_flowRecognizerWit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.FlowRecognizer = _flowRecognizer2.default;
exports.FlowRecognizerLuis = _flowRecognizerLuis2.default;
exports.FlowRecognizerApiai = _flowRecognizerApiai2.default;
exports.FlowRecognizerWit = _flowRecognizerWit2.default;