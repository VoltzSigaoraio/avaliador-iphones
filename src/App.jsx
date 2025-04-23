import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function App() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const cores = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

  const contarDefeitos = () => {
    const contador = {};
    avaliacoes.forEach((a) => {
      Object.entries(a.defeitos || {}).forEach(([d, ativo]) => {
        if (ativo) contador[d] = (contador[d] || 0) + 1;
      });
    });
    return Object.entries(contador);
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Defeitos Mais Comuns</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={contarDefeitos().map(([nome, valor]) => ({ name: nome, value: valor }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {contarDefeitos().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Filtros</h2>
        <input
          type="text"
          placeholder="Filtrar por modelo"
          style={{ padding: '0.5rem', marginRight: '1rem', marginTop: '0.5rem' }}
          onChange={(e) => {
            const filtro = e.target.value.toLowerCase();
            setAvaliacoes((prev) =>
              prev.filter((a) => a.modelo.toLowerCase().includes(filtro))
            );
          }}
        />
        <input
          type="date"
          style={{ padding: '0.5rem', marginTop: '0.5rem' }}
          onChange={(e) => {
            const dataFiltro = new Date(e.target.value).toLocaleDateString();
            setAvaliacoes((prev) =>
              prev.filter((a) => a.data.includes(dataFiltro))
            );
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Exportar Dados</h2>
        <button
          style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', cursor: 'pointer' }}
          onClick={() => {
            const linhas = avaliacoes.map(
              (a) => `${a.nome};${a.modelo};${a.data}`
            );
            const conteudo = `Cliente;Modelo;Data\n${linhas.join("\n")}`;
            const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "avaliacoes.csv";
            link.click();
          }}
        >
          Exportar CSV
        </button>
      </div>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Avaliações Recentes</h2>
        {avaliacoes.map((a, index) => (
          <div key={index} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
            <p><strong>Cliente:</strong> {a.nome}</p>
            <p><strong>Modelo:</strong> {a.modelo}</p>
            <p><strong>Data:</strong> {a.data}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
              {Object.entries(a.fotos || {}).map(([chave, url]) => (
                <div key={chave} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem' }}>{chave}</p>
                  <img src={url} alt={chave} style={{ width: '100px', borderRadius: '8px' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
