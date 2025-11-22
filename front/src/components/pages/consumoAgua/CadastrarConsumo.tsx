import { useState } from "react";
import Produto from "../../../models/ConsumoAgua";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConsumoAgua from "../../../models/ConsumoAgua";

function CadastrarConsumo(){
    const [cpf, setCpf] = useState("");
    const [mes, setMes] = useState(0);
    const [ano, setAno] = useState(0);
    const [m3Consumidos, setM3Consumidos] = useState(0);
    const [bandeira, setBandeira] = useState("");
    const [possuiEsgoto, setPossuiEsgoto] = useState(false);
    const navigate = useNavigate();

    function submeterForm(e: any) {
        e.preventDefault();
        enviarConsumoAPI();
    }

    async function enviarConsumoAPI() {
        try {
            const consumo: ConsumoAgua = { cpf, mes, ano, m3Consumidos, bandeira, possuiEsgoto };
            const resposta = await axios.post(
                "http://localhost:5224/api/consumo/cadastrar",
                consumo
            );
            navigate("/");
        } catch (error) {
            console.log("Erro na requisição: " + error);
        }
    }

    return (
        <div>
            <div className="cadastro-container">
            <h1>Cadastrar Consumo</h1>
            <form className="cadastro-form" onSubmit={submeterForm}>
                <div className="form-group">
                <label>Cpf:</label>
                <input type="text" onChange={(e) => setCpf(e.target.value)} />
                </div>

                <div className="form-group">
                <label>Mês:</label>
                <input type="text" onChange={(e: any) => setMes(e.target.value)} />
                </div>

                <div className="form-group">
                <label>Ano:</label>
                <input type="text" onChange={(e: any) => setAno(e.target.value)} />
                </div>

                <div className="form-group">
                <label>M3 Consumidos:</label>
                <input type="text" onChange={(e: any) => setM3Consumidos(e.target.value)} />
                </div>

                <div className="form-group">
                <label>Bandeira:</label>
                <input type="text" onChange={(e) => setBandeira(e.target.value)} />
                </div>

                <div className="form-group checkbox-group">
                <label>Possui Esgoto?</label>
                <input
                    type="checkbox"
                    checked={possuiEsgoto}
                    onChange={(e) => setPossuiEsgoto(e.target.checked)}
                />
                </div>

                <button className="submit-btn" type="submit">Salvar</button>
            </form>
            </div>

        </div>
    );
}   

export default CadastrarConsumo;