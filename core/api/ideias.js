import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dir = path.resolve(process.cwd(), 'core/ideas');
  if (req.method === 'GET') {
    const files = fs.readdirSync(dir);
    const ideias = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f))));
    res.status(200).json(ideias);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}