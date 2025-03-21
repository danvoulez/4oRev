import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function interpretCommand(prompt) {
  const res = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Você é o Vox, o orquestrador do AgentOS. Responda apenas com JSON com as chaves: action, route, module."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0
  });

  const text = res.data.choices[0].message.content;
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch {
    return { action: "indefinido", route: null, module: null };
  }
}