import OpenAI from "openai"
import { Message } from "../types/Chat"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: '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',
  dangerouslyAllowBrowser: true,
})
export async function sendMessage(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: messages,
  })
  return completion.choices[0].message
}