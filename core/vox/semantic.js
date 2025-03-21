import { MongoClient } from "mongodb";
import { Configuration, OpenAIApi } from "openai";

const mongo = new MongoClient(process.env.MONGODB_URI);
const db = mongo.db(process.env.MONGODB_DB);
const prompts = db.collection("vox_prompts");

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function savePromptWithEmbedding(prompt, parsedAction) {
  const embedRes = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: prompt
  });
  const vector = embedRes.data.data[0].embedding;

  const doc = {
    prompt_original: prompt,
    vetor_embedding: vector,
    acao: parsedAction?.action || "indefinido",
    params: parsedAction?.params || {},
    route: parsedAction?.route || null,
    timestamp: new Date().toISOString()
  };

  await prompts.insertOne(doc);
  return doc;
}