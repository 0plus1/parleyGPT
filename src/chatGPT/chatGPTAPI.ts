import { ChatGPTAPI } from 'chatgpt';

export default (openAPIKEY: string) => (
  new ChatGPTAPI({
    apiKey: openAPIKEY
  })
);