using System;

namespace Lucas.Models;

public class ConsumoAgua
{   
    public int Id { get; set; }
    public string? Cpf { get; set; }
    public int Mes { get; set; }
    public int Ano { get; set; }
    public double M3Consumidos { get; set; }
    public string? Bandeira { get; set; }
    public bool PossuiEsgoto { get; set; }

    //calculados
    public double ConsumoFaturado { get; set; }
    public double Tarifa { get; set; }
    public double ValorAgua { get; set; }
    public double AdicionalBandeira { get; set; }
    public double TaxaEsgoto { get; set; }
    public double Total { get; set; }    
}