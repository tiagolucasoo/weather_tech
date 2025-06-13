function exibirResultado(cidade, temperatura, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva, precipitacao, cod1) {
    /*const clima = cod1;*/
    const icone = gerarIconeClima(cod1);
    document.querySelector(".icone_clima").innerHTML = icone;

    document.querySelector(".info_cidade").innerText = `Cidade: ${cidade}`;
    document.querySelector(".info_pais").innerText = `País: ${nome_pais_api}`;
    document.querySelector(".info_estado").innerText = `Estado: ${estado}`;

    document.querySelector(".info_temperatura").innerText = `${temperatura}°C`;
    document.querySelector(".info_clima").innerText = `${climaDescricao}`;

    document.querySelector(".info_vento").innerText = `Vento: ${vento} km/h`;
    document.querySelector(".info_chuva").innerText = `Chuva: ${porc_chuva}%`;
    document.querySelector(".info_precipitacao").innerText = `Precipitação: ${precipitacao}mm`;

    document.querySelector(".info_minima").innerText = `Mínima: ${temp_minima}°C`;
    document.querySelector(".info_maxima").innerText = `Máxima: ${temp_maxima}°C`;
}
function criarTabela_Cabecalho() { // Clientes
  const tr_geral_info00 = document.querySelector(".tr_geral_info00");

  const h3 = document.querySelector(".h3_desc");
  h3.innerText = "Descrição Completa - Próximos 15 Dias";

  tr_geral_info00.innerHTML = "";

  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_data">Data</p>`)); //Cria o TR E O TD
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_desc">Descrição</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_min">Mínima</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_max">Máxima</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_chuva">Chance de Chuva</p>`));
  tr_geral_info00.appendChild(linha_Html(`<p class="cabecalho_precipitacao">Precipitação</p>`));
}
function criarTabela_Dados(d_dias, d_clima, d_min, d_max, d_chuva, d_precipitacao) { // Clientes
  const dados_tabela = document.querySelector("#dados_tabela");
  dados_tabela.innerHTML = "";

  for (let i = 0; i < 14; i++) {
    const tr = document.createElement("tr");
    tr.classList.add(`tabela_dados${i + 1}`);

    tr.appendChild(linha_Html(d_dias[i]));
    tr.appendChild(linha_Html(d_clima[i]));
    tr.appendChild(linha_Html(d_min[i] + "°"));
    tr.appendChild(linha_Html(d_max[i] + "°"));
    tr.appendChild(linha_Html(d_chuva[i] + "%"));
    tr.appendChild(linha_Html(d_precipitacao[i] + " mm"));

    dados_tabela.appendChild(tr);
  }
}
function exibir_semana(i_dias, i_min, i_max, i_clima, i_chuva, i_cod) {
  for (let i = 0; i < 6; i++){
    const indice = i +2;
    const clima = i_cod[i]
    const icone = gerarIconeClima(clima);

    document.querySelector(`.icone_clima${indice}`).innerHTML = icone; //OK
    document.querySelector(`.info_data${indice}`).innerText = i_dias[i]; //OK
    document.querySelector(`.info_clima${indice}`).innerText = i_clima[i]; //OK
    document.querySelector(`.info_temp${indice}`).innerText = `${i_min[i]}° / ${i_max[i]}`; //OK
    document.querySelector(`.info_chuva${indice}`).innerText = `Possibilidade de Chuva: ${i_chuva[i]}%`; //OK
  }
}