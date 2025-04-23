import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="grid gap-6 p-4">
      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-bold">Defeitos Mais Comuns</h2>
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-bold">Filtros</h2>
          <Input
            placeholder="Filtrar por modelo"
            onChange={(e) => {
              const filtro = e.target.value.toLowerCase();
              setAvaliacoes((prev) =>
                prev.filter((a) => a.modelo.toLowerCase().includes(filtro))
              );
            }}
          />
          <Input
            type="date"
            onChange={(e) => {
              const dataFiltro = new Date(e.target.value).toLocaleDateString();
              setAvaliacoes((prev) =>
                prev.filter((a) => a.data.includes(dataFiltro))
              );
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-bold">Exportar Dados</h2>
          <Button
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
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-bold">Avaliações Recentes</h2>
          {avaliacoes.map((a, index) => (
            <div key={index} className="border p-4 rounded-md">
              <p><strong>Cliente:</strong> {a.nome}</p>
              <p><strong>Modelo:</strong> {a.modelo}</p>
              <p><strong>Data:</strong> {a.data}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {Object.entries(a.fotos || {}).map(([chave, url]) => (
                  <div key={chave} className="text-center">
                    <p className="text-sm">{chave}</p>
                    <img src={url} alt={chave} className="w-full h-auto rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
