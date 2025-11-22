import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ConsumoAgua from "../../../models/ConsumoAgua";

function ListarConsumo(){
    const [consumos, setConsumos] = useState<ConsumoAgua[]>([]);

    useEffect(() => {
        ListarConsumoAPI();
    }, []);

    async function ListarConsumoAPI() {
        try {
            const resposta = await axios.get<ConsumoAgua[]>("http://localhost:5224/api/consumo/listar");
            const dados = resposta.data;
            setConsumos(dados);
        } catch (error) {
            console.log("Erro na requisição: " + error)
        }
    }

    function DeletarConsumo(cpf: string, mes: number, ano: number){
        DeletarConsumoAPI(cpf, mes, ano);
    }

    async function DeletarConsumoAPI(cpf: string, mes: number, ano: number) {
        try {
            const resposta = await axios.delete(`http://localhost:5224/api/consumo/remover/${cpf}/${mes}/${ano}`);
            ListarConsumoAPI();
        } catch (error) {
            console.log("Erro na requisição: " + error)
        }
    }

    return (
        <div id="componente_listar_consumo">
        <h1>Listar Consumo</h1>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Cpf</th>
                <th>Mes</th>
                <th>Ano</th>
                <th>M3Consumidos</th>
                <th>Bandeira</th>
                <th>Tarifa</th>
                <th>AdicionalBandeira</th>
                <th>TaxaEsgoto</th>
                <th>Total</th>
                <th>Possui Esgoto</th>
                <th>Deletar</th>
                <th>Alterar</th>
            </tr>
            </thead>
            <tbody>
            {consumos.map((consumo) => (
                <tr key={consumo.id}>
                <td>{consumo.id}</td>
                <td>{consumo.cpf}</td>
                <td>{consumo.mes}</td>
                <td>{consumo.ano}</td>
                <td>{consumo.m3Consumidos}</td>
                <td>{consumo.bandeira}</td>
                <td>{consumo.tarifa}</td>
                <td>{consumo.adicionalBandeira}</td>
                <td>{consumo.taxaEsgoto}</td>
                <td>{consumo.total}</td>
                <td>{consumo.possuiEsgoto ? "Sim" : "Não"}</td>

                <td>
                    <button onClick={() => DeletarConsumo(consumo.cpf, consumo.mes, consumo.ano)}>
                    Deletar
                    </button>
                </td>
                <td>
                    <Link to={`/consumo/alterar/${consumo.cpf}/${consumo.mes}/${consumo.ano}`}>
                    Alterar
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );   
}

export default ListarConsumo;