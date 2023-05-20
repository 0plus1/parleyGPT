import dotenv from 'dotenv-safe';
dotenv.config();

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY;
// Iterations are 1 less than the number of iterations specified in the .env file
// This is because we need to take into account the initial conversation
const ITERATIONS: number = parseInt(process.env.ITERATIONS) - 1;
// Is in debug mode?
const DEBUG: boolean = (process.env.DEBUG === 'true');
// Assign all interlocutor variables as strings
const INTERLOCUTOR_ONE_NAME: string = process.env.INTERLOCUTOR_ONE_NAME;
const INTERLOCUTOR_TWO_NAME: string = process.env.INTERLOCUTOR_TWO_NAME;
const INTERLOCUTOR_ONE_PROMPT: string = process.env.INTERLOCUTOR_ONE_PROMPT;
const INTERLOCUTOR_TWO_PROMPT: string = process.env.INTERLOCUTOR_TWO_PROMPT;
const TOPIC: string = process.env.TOPIC;

if (DEBUG) {
  console.log('ENV:', process.env.NODE_ENV);
  console.log('OpenAI Key:', OPENAI_API_KEY.slice(0, 5) + '...');
  console.log('Topic:', TOPIC);
  console.log('Interlocutor One:', INTERLOCUTOR_ONE_NAME);
  console.log('Interlocutor Two:', INTERLOCUTOR_TWO_NAME);

  console.log('Iterations:', ITERATIONS);
  console.log('Debug: yes');
}

export {
  OPENAI_API_KEY,
  ITERATIONS,
  DEBUG,
  INTERLOCUTOR_ONE_NAME,
  INTERLOCUTOR_TWO_NAME,
  INTERLOCUTOR_ONE_PROMPT,
  INTERLOCUTOR_TWO_PROMPT,
  TOPIC,
}
