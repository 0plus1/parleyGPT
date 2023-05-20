import dotenv from 'dotenv-safe';
import { ChatGPTAPI } from 'chatgpt';
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY not found in .env file');
  process.exit(1);
}

console.log('Starting bot...');
console.log('ENV:', process.env.NODE_ENV);
console.log('OPENAI_KEY:', process.env.OPENAI_API_KEY.slice(0, 5) + '...');

// initialise variable with type string
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY;

async function example() {
  const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY
  });

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}

example();