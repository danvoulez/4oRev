import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const modulesDir = path.resolve(process.cwd(), 'core/modules');
  if (req.method === 'GET') {
    const files = fs.readdirSync(modulesDir);
    const modules = files.map(file => {
      const data = fs.readFileSync(path.join(modulesDir, file));
      return JSON.parse(data);
    });
    res.status(200).json(modules);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}