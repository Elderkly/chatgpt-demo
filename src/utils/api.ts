import OpenAI from "openai";
import { Message } from "../types";

let openaiClient: OpenAI | null = null;

function getClient() {
  if (!openaiClient) {
    const apiKey = localStorage.getItem('API_KEY');
    if (!apiKey) return null;

    openaiClient = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
  }
  return openaiClient;
}

export async function sendMessage(messages: Message[]) {
  const client = getClient();
  if (!client) return;

  const completion = await client.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: messages,
  });

  return completion.choices[0].message;
}




    // apiKey: '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',