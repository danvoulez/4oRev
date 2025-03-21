import { useState } from "react";

export default function FaturaUploadPage() {
  const [file, setFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setStatus("preview");
    }
  };

  const simulateOCR = () => {
    setStatus("processing");
    setTimeout(() => {
      setOcrData({
        supplier: "FNAC",
        invoice_number: "FAT-20250319-001",
        date: "2025-03-19",
        total: 129.99,
        vat: 23.0,
        category: "Eletrônicos"
      });
      setStatus("extracted");
    }, 2000);
  };

  const saveFatura = () => {
    setStatus("saving");
    // Simula envio à API
    setTimeout(() => {
      alert("Fatura salva com sucesso!");
      setFile(null);
      setOcrData(null);
      setStatus("idle");
    }, 1000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reconhecimento de Fatura</h1>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="mb-4" />
      {file && status === "preview" && (
        <>
          <p className="text-sm text-gray-600 mb-2">Pré-visualização: {file.name}</p>
          <button onClick={simulateOCR} className="px-4 py-2 bg-blue-600 text-white rounded">
            Iniciar OCR
          </button>
        </>
      )}
      {status === "processing" && <p>Processando OCR...</p>}
      {ocrData && status === "extracted" && (
        <div className="mt-4 border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Dados extraídos:</h2>
          {Object.entries(ocrData).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold capitalize">{key}:</span> {value}
            </p>
          ))}
          <button onClick={saveFatura} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            Salvar Fatura
          </button>
        </div>
      )}
    </div>
  );
}