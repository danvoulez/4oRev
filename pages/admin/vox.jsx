import { useState } from "react";
import { useRouter } from "next/router";

export default function VoxPanel() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("esperando");
  const router = useRouter();

  const handleSubmit = async () => {
    setStatus("processando");
    const res = await fetch("/api/vox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    if (data.route) {
      router.push(data.route);
    } else {
      alert(data.message || "Sem ação definida.");
    }
    setStatus("esperando");
    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Vox Orquestrador</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ex: abrir fatura da FNAC"
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-2 rounded">
        {status === "processando" ? "Analisando..." : "Executar comando"}
      </button>
    </div>
  );
}