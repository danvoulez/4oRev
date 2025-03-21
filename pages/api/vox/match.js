import { MongoClient } from "mongodb";
import { Configuration, OpenAIApi } from "openai";

const mongo = new MongoClient(process.env.MONGODB_URI);
const db = mongo.db(process.env.MONGODB_DB);
const prompts = db.collection("vox_prompts");

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((acc, v, i) => acc + v * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((acc, v) => acc + v * v, 0));
  const mag2 = Math.sqrt(vec2.reduce((acc, v) => acc + v * v, 0));
  return dot / (mag1 * mag2);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    const embedRes = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: prompt
    });
    const vector = embedRes.data.data[0].embedding;

    const data = await prompts.find({ vetor_embedding: { $exists: true } }).toArray();

    const scored = data.map((item) => ({
      ...item,
      score: cosineSimilarity(item.vetor_embedding, vector)
    }));

    scored.sort((a, b) => b.score - a.score);

    res.status(200).json(scored.slice(0, 5));
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}