import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ListarConsumo from "./components/pages/consumoAgua/ListarConsumo";
import AlterarConsumo from "./components/pages/consumoAgua/AlterarConsumo";
import CadastrarConsumo from "./components/pages/consumoAgua/CadastrarConsumo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/">Lista de Consumos</Link>
            </li>
            <li>
              <Link to="/consumo/cadastrar">Cadastro de Consumo</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListarConsumo />} />
          <Route path="/consumo/alterar/:cpf/:mes/:ano" element={<AlterarConsumo />} />
          <Route path="/consumo/cadastrar" element={<CadastrarConsumo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
