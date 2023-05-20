import { ChatGPTAPI, conversation } from './chatGPT/index.ts';
import {
  OPENAI_API_KEY,
  DEBUG,
  ITERATIONS,
  INTERLOCUTOR_ONE_NAME,
  INTERLOCUTOR_TWO_NAME,
  INTERLOCUTOR_ONE_PROMPT,
  INTERLOCUTOR_TWO_PROMPT,
  TOPIC,
} from './constants.ts';

const interlocutorOne = ChatGPTAPI(OPENAI_API_KEY);
const interlocutorTwo = ChatGPTAPI(OPENAI_API_KEY);
// Define IDs
let interlocutorOneConversationId: string = null;
let interlocutorTwoConversationId: string = null;
// Define last text
let lastTextResponse: string = null;

const iterationForInterlocutorOne = async (text: string) => {
  const res = await conversation(interlocutorOne, text, interlocutorOneConversationId);
  ;({ id: interlocutorOneConversationId } = res);
  return res.text;
}

const iterationForInterlocutorTwo = async (text: string) => {
  const res = await conversation(interlocutorTwo, text, interlocutorTwoConversationId);
  ;({ id: interlocutorTwoConversationId } = res);
  return res.text;
}

const printLine = (name: string, text: string, conversationId: string) => {
  console.log(`\n\n---${name}: \n${text}`);
  if (DEBUG) {
    console.log(`Conversation ID: \n${conversationId}`);
  }
}

console.log('Starting parley...');
console.log('Topic:', TOPIC);

const recordLastTextResponseForInterlocutorOne = (text: string) => {
  printLine(INTERLOCUTOR_ONE_NAME, text, interlocutorOneConversationId);
  lastTextResponse = text;
}
const recordLastTextResponseForInterlocutorTwo = (text: string) => {
  printLine(INTERLOCUTOR_TWO_NAME, text, interlocutorTwoConversationId);
  lastTextResponse = text;
}
// Start conversation
recordLastTextResponseForInterlocutorOne( await iterationForInterlocutorOne(`${INTERLOCUTOR_ONE_PROMPT} ${TOPIC}`) );
recordLastTextResponseForInterlocutorTwo( await iterationForInterlocutorTwo(`${INTERLOCUTOR_TWO_PROMPT} ${lastTextResponse}`) );

for (let i = 0; i < ITERATIONS; i++) {
  recordLastTextResponseForInterlocutorOne( await iterationForInterlocutorOne(`${lastTextResponse}`) );
  recordLastTextResponseForInterlocutorTwo( await iterationForInterlocutorTwo(`${lastTextResponse}`) );
}