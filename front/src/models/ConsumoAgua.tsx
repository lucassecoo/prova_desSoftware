export default interface ConsumoAgua{
    id?: string;
    cpf: string;
    mes: number;
    ano: number;
    m3Consumidos: number;
    bandeira: string;
    possuiEsgoto: boolean;
    consumoFaturado?: number;
    tarifa?: number;
    valorAgua?: number;
    adicionalBandeira?: number;
    taxaEsgoto?: number;
    total?: number;
}