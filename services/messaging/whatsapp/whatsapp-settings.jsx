import { useEffect, useState } from "react";

export default function WhatsAppSettings() {
  const [status, setStatus] = useState("Carregando...");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/whatsapp/status")
      .then(res => res.json())
      .then(data => setStatus(data.status || "Desconhecido"));
  }, []);

  const sendTestMessage = async () => {
    if (!number || !message) return alert("Número e mensagem são obrigatórios.");
    setSending(true);
    const res = await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, message })
    });
    const data = await res.json();
    setHistory(h => [...h, { number, message, status: data.status || "OK" }]);
    setSending(false);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-semibold mb-4">📱 Configurações do WhatsApp</h1>

      <div className="mb-4 text-gray-700">Status de conexão: <strong>{status}</strong></div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Número de destino</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Ex: 5511999999999"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Mensagem</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Digite sua mensagem aqui..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={sendTestMessage}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={sending}
      >
        {sending ? "Enviando..." : "Enviar Mensagem de Teste"}
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">📄 Histórico de Envio</h2>
      <ul className="text-sm text-gray-800 space-y-1 max-h-48 overflow-y-auto">
        {history.map((h, i) => (
          <li key={i} className="border-b py-1">
            <span className="font-mono">{h.number}</span>: {h.message} <span className="text-green-600">({h.status})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}