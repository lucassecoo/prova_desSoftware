import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ConsumoAgua from "../../../models/ConsumoAgua";

function AlterarConsumo(){
    const { cpf, mes: mesUrl, ano: anoUrl } = useParams();
    const [id, setId] = useState("");
    const [mes, setMes] = useState(mesUrl);
    const [ano, setAno] = useState(anoUrl);
    const [m3Consumidos, setM3Consumidos] = useState(0);
    const [bandeira, setBandeira] = useState("");
    const [possuiEsgoto, setPossuiEsgoto] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        buscarConsumoAPI();
    }, []);

    async function buscarConsumoAPI() {
        try {
        const resposta = await axios.get<ConsumoAgua>(
            `http://localhost:5224/api/consumo/buscar/${cpf}/${mesUrl}/${anoUrl}`
        );
        console.log("DADOS RECEBIDOS DO C#:", resposta.data);
        setId(resposta.data.id!)
        setMes(resposta.data.mes.toString());
        setAno(resposta.data.ano.toString());
        setM3Consumidos(resposta.data.m3Consumidos);
        setBandeira(resposta.data.bandeira)
        setPossuiEsgoto(resposta.data.possuiEsgoto)
        } catch (error) {
        console.log("Erro na requisição de busca: " + error);
        }
    }

    function submeterForm(e: any) {
        e.preventDefault();
        enviarConsumoAPI();
    }

    async function enviarConsumoAPI() {
        try {
            const consumo: ConsumoAgua = {
                cpf: cpf!,
                mes: Number(mes), 
                ano: Number(ano), 
                m3Consumidos: Number(m3Consumidos),
                bandeira, 
                possuiEsgoto
            };
            const resposta = await axios.patch(
                `http://localhost:5224/api/consumo/alterar/${id}`,
                consumo
            );
            navigate("/");
        } catch (error) {
        console.log("Erro na requisição de envio: " + error);
        }
    }
    
    return (
        <div>
        <h1>Alterar Consumo</h1>
        <form onSubmit={submeterForm}>
            <div>
            <label>Mes:</label>
            <input
                value={mes}
                type="text"
                onChange={(e: any) => setMes(e.target.value)}
            />
            </div>
            <div>
            <label>Ano:</label>
            <input
                value={ano}
                type="text"
                onChange={(e: any) => setAno(e.target.value)}
            />
            </div>
            <div>
            <label>M3 consumido:</label>
            <input
                value={m3Consumidos}
                type="text"
                onChange={(e: any) => setM3Consumidos(e.target.value)}
            />
            </div>
                        <div>
            <label>Bandeira:</label>
            <input
                value={bandeira}
                type="text"
                onChange={(e: any) => setBandeira(e.target.value)}
            />
            </div>
            <div>
                <label>Possui Esgoto?</label>
                <input
                    type="checkbox"
                    checked={possuiEsgoto} 
                    onChange={(e: any) => setPossuiEsgoto(e.target.checked)}
                />
            </div>
            <div>
            <button type="submit">Salvar</button>
            </div>
        </form>
        </div>
    );
} 

export default AlterarConsumo;