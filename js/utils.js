//  utils.js    Arquivo separado para validações e formatações

function validarEntrada(codigo_pais, nome_pais, cidade) { // Validação Entrada de Dados
  if (codigo_pais === "00") {
    alert("Você não selecionou um país. Por favor, escolha uma opção e tente novamente.");
    return false;
  }

  if (cidade.length === 0) {
    alert(`Você selecionou o país ${nome_pais}, mas não informou o nome da cidade. Por favor, preencha esse campo.`);
    return false;
  }

  return true;
}
function validarResultado(data1, cidade, nome_pais) { // Validação se a cidade bate com o país
  if (!data1.results || data1.results.length === 0) {
    alert(`Não conseguimos encontrar a cidade "${cidade}" no país ${nome_pais}. Verifique se o nome está correto.`);
    return false;
  }

  return true;
}
function validacao_clima(dadosClima) {
    const tipo_clima = dadosClima.current_weather.weathercode;
    switch (tipo_clima){
        case 0: return 'Ensolarado';
        case 1: return 'Parcialmente Limpo';
        case 2: return 'Parcialmente Nublado';
        case 3: return 'Nublado';
        case 45: return 'Névoa';
        case 48: return 'Névoa com Gelo';
        case 51: return 'Garoa Fraca';
        case 53: return 'Garoa Moderada';
        case 55: return 'Garoa Intensa';
        case 61: return 'Chuva Fraca';
        case 63: return 'Chuva Moderada';
        case 65: return 'Chuva Forte';
        case 71: return 'Neve Fraca';
        case 73: return 'Neve Moderada';
        case 75: return 'Neve Forte';
        case 80: return 'Pancadas Fracas de Chuva';
        case 81: return 'Pancadas Moderadas de Chuva';
        case 82: return 'Pancadas Fortes de Chuva';
        case 85: return 'Pancadas Leves de Neve';
        case 95: return 'Tempestade com chuva leve';
        case 96: return 'Tempestade com granizo leve';
        case 99: return 'Tempestade com granizo forte';
        default: return 'Clima desconhecido';
    }
}
function validarDia(codigo_semana){
    switch (codigo_semana){
        case 0: return 'Domingo';
        case 1: return 'Segunda-Feira';
        case 2: return 'Terça-Feira';
        case 3: return 'Quarta-Feira';
        case 4: return 'Quinta-Feira';
        case 5: return 'Sexta-Feira';
        case 6: return 'Sábado';
        default: return 'Código Inválido';
    }
}
function limparDados(){
    console.clear();

    // Bloco 02 - Semanal
    for (let i = 2; i <= 7; i++) {
      document.querySelector(`.icone_clima${i}`).innerHTML = ``;
      document.querySelector(`.info_data${i}`).innerText = ``;
      document.querySelector(`.info_clima${i}`).innerText = ``;
      document.querySelector(`.info_temp${i}`).innerText = ``;
      document.querySelector(`.info_chuva${i}`).innerText = ``;
    }

    // Bloco 01 - Dia
    document.querySelector(".icone_clima").innerHTML = ``;
    document.querySelector(".info_cidade").innerText = ``;
    document.querySelector(".info_pais").innerText = ``;
    document.querySelector(".info_estado").innerText = ``;
    document.querySelector(".info_temperatura").innerText = ``;
    document.querySelector(".info_clima").innerText = ``;
    document.querySelector(".info_vento").innerText = ``;
    document.querySelector(".info_chuva").innerText = ``;
    document.querySelector(".info_precipitacao").innerText = ``;
    document.querySelector(".info_minima").innerText = ``;
    document.querySelector(".info_maxima").innerText = ``;

    document.querySelector(".tr_geral_info00").innerHTML = ``;
    document.querySelector(".h3_desc").innerText = ``;
    document.querySelector(".erro").innerHTML = ``;

    // Bloco 03 - Quinzenal tabela_dados01
     for (let i = 1; i <= 15; i++) {
       document.querySelector(`.tabela_dados${i}`).innerText = ``;
     }

}
function linha_Html(ref) { // Função própria para criação das linhas/célular do html
  const td = document.createElement("td");
  td.innerHTML = ref ?? "N/A";
  return td;
}
function criarTabelaCabecalho() { // Clientes
  const tr_geral_info00 = document.querySelector(".tr_geral_info00");

  const h3 = document.querySelector(".h3_desc");
  h3.innerText = "Descrição Completa - Próximos 15 Dias";

  tr_geral_info00.innerHTML = "";

  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_data">Data</p>`)); //Cria o TR E O TD
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_dia">Dia</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_desc">Descrição</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_min">Mínima</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_max">Máxima</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_chuva">Chuva / Precipitação</p>`));
}

// function criarTabela_Dados(dia2,dat2,min2,max2,cli2,chu2) { // Clientes
//   const tabela_dados01 = document.querySelector(".tabela_dados01");
//   tabela_dados01.innerHTML = "";

//   tabela_dados01.appendChild(linha_Html(dia2));
//   tabela_dados01.appendChild(linha_Html(dat2));
//   tabela_dados01.appendChild(linha_Html(min2));
//   tabela_dados01.appendChild(linha_Html(max2));
//   tabela_dados01.appendChild(linha_Html(cli2));
//   tabela_dados01.appendChild(linha_Html(chu2));
// }

function criarTabela_Dados(lista_dias, lista_climas) { // Clientes
  const dados_tabela = document.querySelector("#dados_tabela");
  dados_tabela.innerHTML = "";

  for (let i = 0; i < 14; i++) {
    const tr = document.createElement("tr");
    tr.classList.add(`tabela_dados${i + 1}`);

    tr.appendChild(linha_Html(lista_dias[i]));
    tr.appendChild(linha_Html(lista_climas[i]));

    dados_tabela.appendChild(tr);
  }
}
