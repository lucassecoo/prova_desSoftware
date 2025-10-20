using System;

namespace Lucas.Models;

public class ConsumoAgua
{
    public string? Cpf { get; set; }
    public int Mes { get; set; }
    public int Ano { get; set; }
    public double M3Consumidos { get; set; }
    public string? Bandeira { get; set; }
    public bool PossuiEsgoto { get; set; }
}
