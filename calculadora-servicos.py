import React, { useState } from "react";

export default function CalculadoraServicos() {
  const [hectares, setHectares] = useState("");
  const [areaProjeto, setAreaProjeto] = useState("");
  const [pavimentos, setPavimentos] = useState("");
  const [diasLocacao, setDiasLocacao] = useState("");
  const [resultado, setResultado] = useState(null);
  const [campoObrigatorio, setCampoObrigatorio] = useState("hectares");

  const calcular = () => {
    let total = 0;

    if (campoObrigatorio === "hectares" && hectares) {
      total = hectares >= 50 ? hectares * 50 : 3000;
    }
    if (campoObrigatorio === "regularizacao") {
      total = 600;
    }
    if (campoObrigatorio === "projeto" && areaProjeto) {
      total = areaProjeto * 15;
    }
    if (campoObrigatorio === "condominio" && pavimentos) {
      total = pavimentos * 1200;
    }
    if (campoObrigatorio === "locacao" && diasLocacao) {
      total = diasLocacao * 1800;
    }

    setResultado(total);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Calculadora de Serviços</h1>
      
      <label>Escolha um serviço obrigatório:</label>
      <select value={campoObrigatorio} onChange={(e) => setCampoObrigatorio(e.target.value)} className="block w-full p-2 border mb-4">
        <option value="hectares">Cálculo por Hectare</option>
        <option value="regularizacao">Regularização de Imóvel Urbano</option>
        <option value="projeto">Projeto Arquitetônico</option>
        <option value="condominio">Instituição de Condomínio</option>
        <option value="locacao">Locação de Obra</option>
      </select>

      {campoObrigatorio === "hectares" && (
        <input type="number" placeholder="Hectares" value={hectares} onChange={(e) => setHectares(e.target.value)} className="block w-full p-2 border mb-4" />
      )}
      {campoObrigatorio === "projeto" && (
        <input type="number" placeholder="Área do Projeto (m²)" value={areaProjeto} onChange={(e) => setAreaProjeto(e.target.value)} className="block w-full p-2 border mb-4" />
      )}
      {campoObrigatorio === "condominio" && (
        <input type="number" placeholder="Número de Pavimentos" value={pavimentos} onChange={(e) => setPavimentos(e.target.value)} className="block w-full p-2 border mb-4" />
      )}
      {campoObrigatorio === "locacao" && (
        <input type="number" placeholder="Dias de Locação" value={diasLocacao} onChange={(e) => setDiasLocacao(e.target.value)} className="block w-full p-2 border mb-4" />
      )}

      <button onClick={calcular} className="bg-blue-500 text-white px-4 py-2 rounded">Calcular</button>

      {resultado !== null && (
        <div className="mt-4 p-3 bg-gray-200">
          <strong>Valor Total:</strong> R$ {resultado.toFixed(2)}
        </div>
      )}
    </div>
  );
}
