import React, { useState } from "react";

export default function AvaliacaoCliente() {
  const [formData, setFormData] = useState({
    nome: "",
    modelo: "",
    defeitos: [],
    observacoes: ""
  });

  const handleCheckbox = (defeito) => {
    setFormData((prev) => {
      const defeitos = prev.defeitos.includes(defeito)
        ? prev.defeitos.filter((d) => d !== defeito)
        : [...prev.defeitos, defeito];
      return { ...prev, defeitos };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Avaliação enviada:", formData);
    alert("Avaliação enviada com sucesso!");
    setFormData({ nome: "", modelo: "", defeitos: [], observacoes: "" });
  };

  const defeitosDisponiveis = [
    "Tela Quebrada",
    "Bateria com Defeito",
    "Carcaça Riscada",
    "Câmera com Problema",
    "Microfone ou Som com Defeito"
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Formulário de Avaliação do iPhone</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        <input
          type="text"
          placeholder="Modelo do iPhone"
          value={formData.modelo}
          onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        <label style={{ fontWeight: "bold" }}>Defeitos:</label>
        <div style={{ marginBottom: "1rem" }}>
          {defeitosDisponiveis.map((d) => (
            <label key={d} style={{ display: "block", marginBottom: "0.25rem" }}>
              <input
                type="checkbox"
                checked={formData.defeitos.includes(d)}
                onChange={() => handleCheckbox(d)}
              />{" "}
              {d}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Observações adicionais"
          value={formData.observacoes}
          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
          rows={4}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Enviar Avaliação</button>
      </form>
    </div>
  );
}
