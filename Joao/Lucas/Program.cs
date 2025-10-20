using Microsoft.AspNetCore.Mvc;
using Lucas.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

//calculos
double CalcConsumoFaturado(double m3Consumidos)
{
    if (m3Consumidos < 10)
    {
        return 0;
    }
    return m3Consumidos;
}

double CalcTarifa(double m3Consumidos)
{
    if(m3Consumidos<= 10)
    {
        return 2.50;
    } else if (m3Consumidos <= 20)
    {
        return 3.50;
    } else if (m3Consumidos <= 50)
    {
        return 5.00;
    } else
    {
        return 6.50;
    } 
}

double CalcValorAgua(double m3Consumidos)
{
    if(m3Consumidos<= 10)
    {
        return 2.50 * m3Consumidos;
    } else if (m3Consumidos <= 20)
    {
        return 3.50 * m3Consumidos;
    } else if (m3Consumidos <= 50)
    {
        return 5.00 * m3Consumidos;
    } else
    {
        return 6.50 * m3Consumidos ;
    } 
}

double CalcBandeira(string bandeirq, double valorAgua)
{
    if (bandeirq == "Verde")
    {
        return 0;
    }
    else if (bandeirq == "Amarela")
    {
        return 0.1 * valorAgua;
    }
    else
    {
        return 0.2 * valorAgua;
    }
}

double CalcTaxaEsgoto(bool possuiEsgoto, double valorAgua, double adicionalBandeira)
{
    if(possuiEsgoto is true)
    {
        return (valorAgua + adicionalBandeira) * 0.80;
    }
    else
    {
        return 0;
    }
}

double CalcTotalGeral(double valorAgua, double adicionalBandeira, double taxaEsgoto)
{
    return valorAgua + adicionalBandeira + taxaEsgoto;
}

//ROTAS

//POST /api/consumo/cadastrar
app.MapPost("/api/consumo/cadastrar", ([FromBody] ConsumoAgua consumoAgua, [FromServices] AppDbContext context) =>
{
    ConsumoAgua? resultadoConsumo = context.ConsumosDeAgua.FirstOrDefault(x => x.Mes == consumoAgua.Mes && x.Ano == consumoAgua.Ano && x.Cpf == consumoAgua.Cpf);
    if (resultadoConsumo != null)
    {
        return Results.Conflict("Consumo já registrado!");

    }
    if (consumoAgua.Mes > 12 || consumoAgua.Mes < 1 || consumoAgua.Ano < 2000 || consumoAgua.M3Consumidos < 0)
    {
        return Results.Conflict("Dados inválidos!");
    }

    var consumoFaturado = CalcConsumoFaturado(consumoAgua.M3Consumidos);
    consumoAgua.ConsumoFaturado = consumoFaturado;

    var valorAgua = CalcValorAgua(consumoAgua.M3Consumidos);
    consumoAgua.ValorAgua = valorAgua;

    var tarifa = CalcTarifa(consumoAgua.M3Consumidos);
    consumoAgua.Tarifa = tarifa;

    var adicionalBandeira = CalcBandeira(consumoAgua.Bandeira!, consumoAgua.ValorAgua);
    consumoAgua.AdicionalBandeira = adicionalBandeira;

    var taxaEsgoto = CalcTaxaEsgoto(consumoAgua.PossuiEsgoto, consumoAgua.ValorAgua, consumoAgua.AdicionalBandeira);
    consumoAgua.TaxaEsgoto = taxaEsgoto;

    var total = CalcTotalGeral(consumoAgua.ValorAgua, consumoAgua.AdicionalBandeira, consumoAgua.TaxaEsgoto);
    consumoAgua.Total = total;

    context.ConsumosDeAgua.Add(consumoAgua!);
    context.SaveChanges();
    return Results.Ok(consumoAgua);
});


//GET /api/consumo/listar
app.MapGet("/api/consumo/listar", ([FromServices] AppDbContext context) =>
{
    var consumos = context.ConsumosDeAgua.ToList();
    if(consumos.Count() == 0)
    {
        return Results.NotFound("Sem consumos cadastrados!");
    }
    return Results.Ok(consumos);
});

//GET /api/consumo/buscar/{cpf}/{mes}/{ano}
app.MapGet("/api/consumo/buscar/{cpf}/{mes}/{ano}", ([FromServices] AppDbContext context, string cpf, int mes, int ano) =>
{
    ConsumoAgua? resultadoConsumo = context.ConsumosDeAgua.FirstOrDefault(x => x.Mes == mes && x.Ano == ano && x.Cpf == cpf);
    if(resultadoConsumo is null)
    {
        return Results.NotFound("Sem consumos cadastrados com esses parâmetros!");
    }
    return Results.Ok(resultadoConsumo);
});


//DELETE /api/consumo/remover/{cpf}/{mes}/{ano}
app.MapDelete("/api/consumo/remover/{cpf}/{mes}/{ano}", ([FromServices] AppDbContext context, string cpf, int mes, int ano) =>
{
    ConsumoAgua? resultadoConsumo = context.ConsumosDeAgua.FirstOrDefault(x => x.Mes == mes && x.Ano == ano && x.Cpf == cpf);
    if (resultadoConsumo is null)
    {
        return Results.NotFound("Sem consumos cadastrados com esses parâmetros!");
    }
    context.ConsumosDeAgua.Remove(resultadoConsumo);
    context.SaveChanges();
    return Results.Ok("Leitura removida!");
});

//GET  /api/consumo/total-geral
app.MapGet("/api/consumo/total-geral", ([FromServices] AppDbContext context) =>
{
    if (!context.ConsumosDeAgua.Any())
    {
        return Results.NotFound("Sem consumos cadastrados");
    }

    var total = context.ConsumosDeAgua.Sum(f => f.Total);
    return Results.Ok($"Total geral: " + total);
});

app.Run();
