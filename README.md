# Flow Recognizer

Intent recognizers for the Flow Bot Framework.
Provides NLP integration for the Microsoft Bot Builder SDK for different providers:
* LUIS.ai
* API.ai
* WIT.ai

## Installation

```bash
npm install --save flow-recognizer
```

## Usage

```javascript
import { FlowRecognizerWit } from 'flow-recognizer';
import { FlowRecognizerApiai } from 'flow-recognizer';
import { FlowRecognizerLuis } from 'flow-recognizer';
import { IntentDialog } from 'botbuilder';

let witRecognizer = new FlowRecognizerWit({ models: 'Your access token'});
let apiaiRecognizer = new FlowRecognizerApiai({ models: 'Your access token'});
let luisRecognizer = new FlowRecognizerApiai({ models: 'Your luis url'});
let intents = new IntentDialog({ recognizers: [witRecognizer, apiaiRecognizer, luisRecognizer ]});
intents.matches('intent.name', (session, args) => {...});

bot.dialog('/', intents);

```

## Note about Wit.ai

Wit.ai provides entity recognition, but not intent one. Make sure that for each utterance you add an entity called 'intent' with the value of the intent name for this utterance.