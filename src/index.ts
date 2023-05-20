import dotenv from 'dotenv-safe';
import { ChatGPTAPI, conversation } from './chatGPT/index.ts';
dotenv.config();

console.log('Starting bot...');
console.log('ENV:', process.env.NODE_ENV);
console.log('OPENAI_KEY:', process.env.OPENAI_API_KEY.slice(0, 5) + '...');
console.log('ITERATIONS:', process.env.ITERATIONS);
console.log('DEBUG:', process.env.DEBUG);

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY;
// Iterations are 1 less than the number of iterations specified in the .env file
// This is because we need to take into account the initial conversation
const ITERATIONS: number = parseInt(process.env.ITERATIONS) - 1;
// Is in debug mode?
const DEBUG: boolean = (process.env.DEBUG === 'true');
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

const recordLastTextResponseForInterlocutorOne = (text: string) => {
  printLine(process.env.INTERLOCUTOR_ONE_NAME, text, interlocutorOneConversationId);
  lastTextResponse = text;
}
const recordLastTextResponseForInterlocutorTwo = (text: string) => {
  printLine(process.env.INTERLOCUTOR_TWO_NAME, text, interlocutorTwoConversationId);
  lastTextResponse = text;
}
// Start conversation
recordLastTextResponseForInterlocutorOne( await iterationForInterlocutorOne(`${process.env.INTERLOCUTOR_ONE_PROMPT} ${process.env.TOPIC}`) );
recordLastTextResponseForInterlocutorTwo( await iterationForInterlocutorTwo(`${process.env.INTERLOCUTOR_TWO_PROMPT} ${lastTextResponse}`) );

for (let i = 0; i < ITERATIONS; i++) {
  recordLastTextResponseForInterlocutorOne( await iterationForInterlocutorOne(`${process.env.INTERLOCUTOR_ONE_PROMPT} ${lastTextResponse}`) );
  recordLastTextResponseForInterlocutorTwo( await iterationForInterlocutorTwo(`${process.env.INTERLOCUTOR_TWO_PROMPT} ${lastTextResponse}`) );
}