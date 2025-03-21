import { useEffect, useState } from 'react';

export default function ModuleDashboard() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function fetchModules() {
      const res = await fetch('/api/modules');
      const data = await res.json();
      setModules(data);
    }
    fetchModules();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel de Módulos Vivos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <div key={mod.id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{mod.name}</h2>
            <p className="text-sm text-gray-500">ID: {mod.id}</p>
            <p className="text-sm">Tipo: {mod.type}</p>
            <p className="text-sm">Status: {mod.status}</p>
            <p className="text-sm">Roles: {mod.role?.join(", ")}</p>
            <p className="text-sm mt-2">Componentes:</p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {mod.components?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}