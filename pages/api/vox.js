import { interpretCommand } from "../../core/vox/ai";
import { savePromptWithEmbedding } from "../../core/vox/semantic";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    const parsed = await interpretCommand(prompt);
    const saved = await savePromptWithEmbedding(prompt, parsed);
    return res.status(200).json(saved);
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}