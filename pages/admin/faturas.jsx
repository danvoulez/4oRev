import { useEffect, useState } from "react";

export default function FaturasPage() {
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    fetch("/api/faturas").then(res => res.json()).then(setFaturas);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Faturas Reconhecidas</h1>
      <div className="space-y-4">
        {faturas.map((f) => (
          <div key={f.id} className="p-4 border rounded shadow">
            <p className="font-semibold">{f.supplier} — {f.invoice_number}</p>
            <p>Valor: €{f.total} | IVA: €{f.vat}</p>
            <p>Data: {f.date} | Categoria: {f.category}</p>
            <p className="text-xs text-gray-400">Status: {f.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}