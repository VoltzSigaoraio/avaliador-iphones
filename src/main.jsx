import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'; // Dashboard admin
import AvaliacaoCliente from './FormularioCliente'; // Novo formulário

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<App />} />
      <Route path="/" element={<AvaliacaoCliente />} />
    </Routes>
  </BrowserRouter>
);
