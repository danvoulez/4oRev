import { useEffect, useState } from "react";

export default function IdeiasPage() {
  const [ideias, setIdeias] = useState([]);

  useEffect(() => {
    fetch("/api/ideias").then(res => res.json()).then(setIdeias);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Banco de Ideias</h1>
      <div className="space-y-4">
        {ideias.map((idea) => (
          <div key={idea.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{idea.title}</h2>
            <p className="text-sm text-gray-600">Por: {idea.author} | Categoria: {idea.category}</p>
            <p className="mt-2">{idea.description}</p>
            <p className="text-xs text-gray-400 mt-1">Status: {idea.status} | Votos: {idea.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}