console.log("Projeto: Weather Tech v1.0");
console.log("Por: Tiagolucasoo (GitHub)");
console.log("API Utilizada: Open-meteo");
  
function dataAtual() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  const databr = `${dia}/${mes}/${ano}`;
  return `${ano}-${mes}-${dia}`
}

function retornar_data_futura(dias){
  const data = new Date();
  data.setDate(data.getDate() + dias);

  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  const databr = `${dia}/${mes}`;

  codigo_semana = data.getDay();
  dia_semana = validarDia(codigo_semana);

  return `${databr} - ${dia_semana}`;
}

function proximosDias(dias) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function comboPais() { // Retorna o ComboBox do País
  const select = document.getElementById('combo_Pais');
  const codigo_pais = select.value;
  const nome_pais = select.options[select.selectedIndex].text.replace(/^[^\p{L}]+/u, '').trim();
  return { codigo_pais, nome_pais };
}

function get_coordenada(codigo_pais, cidade) { // URL com o País e Cidade
  return `https://geocoding-api.open-meteo.com/v1/search?count=1&countryCode=${codigo_pais}&name=${cidade}`;
}

async function buscarCoordenadas(codigo_pais, cidade) {
    const url = get_coordenada(codigo_pais, cidade);
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function buscarClima(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function buscarClima_Completo(latitude, longitude) {
  const hoje = dataAtual();
  const next_days = proximosDias(14);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weathercode,precipitation_sum,precipitation_probability_max&timezone=auto&start_date=${hoje}&end_date=${next_days}`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

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

function exibir_dia02(dia2, min2, max2, cli2, cod2, chu2){
    const clima = cod2;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima2").innerHTML = icone;

    document.querySelector(".info_data2").innerText = `${dia2}`;
    document.querySelector(".info_clima2").innerText = `${cli2}`;
    document.querySelector(".info_temp2").innerText = `${min2}° / ${max2}°`;
    document.querySelector(".info_chuva2").innerText = `Possibilidade de Chuva: ${chu2}%`;
}

function exibir_dia03(dia3, min3, max3, cli3, cod3, chu3){
    const clima = cod3;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima3").innerHTML = icone;

    document.querySelector(".info_data3").innerText = `${dia3}`;
    document.querySelector(".info_clima3").innerText = `${cli3}`;
    document.querySelector(".info_temp3").innerText = `${min3}° / ${max3}°`;
    document.querySelector(".info_chuva3").innerText = `Possibilidade de Chuva: ${chu3}%`;
}

function exibir_dia04(dia4, min4, max4, cli4, cod4, chu4){
    const clima = cod4;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima4").innerHTML = icone;

    document.querySelector(".info_data4").innerText = `${dia4}`;
    document.querySelector(".info_clima4").innerText = `${cli4}`;
    document.querySelector(".info_temp4").innerText = `${min4}° / ${max4}°`;
    document.querySelector(".info_chuva4").innerText = `Possibilidade de Chuva: ${chu4}%`;
}

function exibir_dia05(dia5, min5, max5, cli5, cod5, chu5){
    const clima = cod5;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima5").innerHTML = icone;

    document.querySelector(".info_data5").innerText = `${dia5}`;
    document.querySelector(".info_clima5").innerText = `${cli5}`;
    document.querySelector(".info_temp5").innerText = `${min5}° / ${max5}°`;
    document.querySelector(".info_chuva5").innerText = `Possibilidade de Chuva: ${chu5}%`;
}

function exibir_dia06(dia6, min6, max6, cli6, cod6, chu6){
    const clima = cod6;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima6").innerHTML = icone;

    document.querySelector(".info_data6").innerText = `${dia6}`;
    document.querySelector(".info_clima6").innerText = `${cli6}`;
    document.querySelector(".info_temp6").innerText = `${min6}° / ${max6}°`;
    document.querySelector(".info_chuva6").innerText = `Possibilidade de Chuva: ${chu6}%`;
}

function exibir_dia07(dia7, min7, max7, cli7, cod7, chu7){
    const clima = cod7;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima7").innerHTML = icone;

    document.querySelector(".info_data7").innerText = `${dia7}`;
    document.querySelector(".info_clima7").innerText = `${cli7}`;
    document.querySelector(".info_temp7").innerText = `${min7}° / ${max7}°`;
    document.querySelector(".info_chuva7").innerText = `Possibilidade de Chuva: ${chu7}%`;
}

function print2(latitude, longitude, dadosClima, dadosCompletos, cidade, nome_pais_api){
  console.log("");
  console.log("Coordenadas:")
  console.log("Latitude:", latitude, " Longitude:", longitude);
  console.log("");
  console.log("Localização:")
  console.log("País:", nome_pais_api, "Cidade:", cidade)
  console.log("");
  console.log("Dados do Clima:");
  console.log("Temperatura Máxima:", dadosCompletos.daily.temperature_2m_max);
  console.log("Temperatura Mínima:", dadosCompletos.daily.temperature_2m_min);
  console.log("Precipitação: ", dadosCompletos.daily.precipitation_sum);
  console.log("Chance de Chuva: ", dadosCompletos.daily.precipitation_probability_max);
}

function diaSemana(){
  const data = new Date();
  codigo_semana = data.getDay();
  dia_semana = validarDia(codigo_semana);
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

function exibirErro() {
  document.querySelector(".erro").innerText = "Erro ao buscar dados.";
}

// Função principal
function buscarInformacoes() {

  document.getElementById("buscar").addEventListener("click", async () => {
    const cidadeInput = document.querySelector(".inputCidade");
    const cidade = cidadeInput.value.trim();
    const { codigo_pais, nome_pais } = comboPais();
    
    if (!validarEntrada(codigo_pais, nome_pais, cidade)) return;
    try {
        const dadosCoord = await buscarCoordenadas(codigo_pais, cidade);
        if (!validarResultado(dadosCoord, cidade, nome_pais)) return;

        const { latitude, longitude } = dadosCoord.results[0];
        const dadosCompletos = await buscarClima_Completo(latitude, longitude)
        const dadosClima = await buscarClima(latitude, longitude);
        
        const temperatura = dadosClima.current_weather.temperature;
        const precipitacao = dadosCompletos.daily.precipitation_sum[0];
        const vento = dadosClima.current_weather.windspeed;
        const clima = dadosClima.current_weather.weathercode;
        const estado = dadosCoord.results[0].admin1;
        const nome_pais_api = dadosCoord.results[0].country;
        const cod1 = dadosCompletos.daily.weathercode[0];
        const climaDescricao = validacao_clima(dadosClima);
        const temp_minima = dadosCompletos.daily.temperature_2m_min[0];
        const temp_maxima = dadosCompletos.daily.temperature_2m_max[0];
        const porc_chuva = dadosCompletos.daily.precipitation_probability_max[0]

        const dia2 = retornar_data_futura(1);
        const min2 = dadosCompletos.daily.temperature_2m_min[1];
        const max2 = dadosCompletos.daily.temperature_2m_max[1];
        const cli2 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[1]}});
        const cod2 = dadosCompletos.daily.weathercode[1];
        const chu2 = dadosCompletos.daily.precipitation_probability_max[1];
        const pre2 = dadosCompletos.daily.precipitation_sum[1];

        const dia3 = retornar_data_futura(2);
        const min3 = dadosCompletos.daily.temperature_2m_min[2];
        const max3 = dadosCompletos.daily.temperature_2m_max[2];
        const cli3 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[2]}});
        const cod3 = dadosCompletos.daily.weathercode[2];
        const chu3 = dadosCompletos.daily.precipitation_probability_max[2];
        const pre3 = dadosCompletos.daily.precipitation_sum[2];

        const dia4 = retornar_data_futura(3);
        const min4 = dadosCompletos.daily.temperature_2m_min[3];
        const max4 = dadosCompletos.daily.temperature_2m_max[3];
        const cli4 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[3]}});
        const cod4 = dadosCompletos.daily.weathercode[3];
        const chu4 = dadosCompletos.daily.precipitation_probability_max[3];
        const pre4 = dadosCompletos.daily.precipitation_sum[3];

        const dia5 = retornar_data_futura(4);
        const min5 = dadosCompletos.daily.temperature_2m_min[4];
        const max5 = dadosCompletos.daily.temperature_2m_max[4];
        const cli5 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[4]}});
        const cod5 = dadosCompletos.daily.weathercode[4];
        const chu5 = dadosCompletos.daily.precipitation_probability_max[4];
        const pre5 = dadosCompletos.daily.precipitation_sum[4];

        const dia6 = retornar_data_futura(5);
        const min6 = dadosCompletos.daily.temperature_2m_min[5];
        const max6 = dadosCompletos.daily.temperature_2m_max[5];
        const cli6 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[5]}});
        const cod6 = dadosCompletos.daily.weathercode[5];
        const chu6 = dadosCompletos.daily.precipitation_probability_max[5];
        const pre6 = dadosCompletos.daily.precipitation_sum[5];

        const dia7 = retornar_data_futura(6);
        const min7 = dadosCompletos.daily.temperature_2m_min[6];
        const max7 = dadosCompletos.daily.temperature_2m_max[6];
        const cli7 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[6]}});
        const cod7 = dadosCompletos.daily.weathercode[6];
        const chu7 = dadosCompletos.daily.precipitation_probability_max[6];
        const pre7 = dadosCompletos.daily.precipitation_sum[7];

        const dat2 = dadosCompletos.daily.time[1];
        const dat3 = dadosCompletos.daily.time[2];
        const dat4 = dadosCompletos.daily.time[3];
        const dat5 = dadosCompletos.daily.time[4];
        const dat6 = dadosCompletos.daily.time[5];
        const dat7 = dadosCompletos.daily.time[6];
        const dat8 = dadosCompletos.daily.time[7];
        const dat9 = dadosCompletos.daily.time[8];
        const dat10 = dadosCompletos.daily.time[9];
        const dat11 = dadosCompletos.daily.time[10];
        const dat12 = dadosCompletos.daily.time[11];
        const dat13 = dadosCompletos.daily.time[12];
        const dat14 = dadosCompletos.daily.time[13];
        const dat15 = dadosCompletos.daily.time[14];
        const dat16 = dadosCompletos.daily.time[15];

        const pre8 = dadosCompletos.daily.precipitation_sum[8];
        const pre9 = dadosCompletos.daily.precipitation_sum[9];
        const pre10 = dadosCompletos.daily.precipitation_sum[10];
        const pre11 = dadosCompletos.daily.precipitation_sum[11];
        const pre12 = dadosCompletos.daily.precipitation_sum[12];
        const pre13 = dadosCompletos.daily.precipitation_sum[13];
        const pre14 = dadosCompletos.daily.precipitation_sum[14];
        const pre15 = dadosCompletos.daily.precipitation_sum[15];
        const pre16 = dadosCompletos.daily.precipitation_sum[16];

        const min8 = dadosCompletos.daily.temperature_2m_min[7];
        const min9 = dadosCompletos.daily.temperature_2m_min[8];
        const min10 = dadosCompletos.daily.temperature_2m_min[9];
        const min11 = dadosCompletos.daily.temperature_2m_min[10];
        const min12 = dadosCompletos.daily.temperature_2m_min[11];
        const min13 = dadosCompletos.daily.temperature_2m_min[12];
        const min14 = dadosCompletos.daily.temperature_2m_min[13];
        const min15 = dadosCompletos.daily.temperature_2m_min[14];
        const min16 = dadosCompletos.daily.temperature_2m_min[15];

        const max8 = dadosCompletos.daily.temperature_2m_max[7];
        const max9 = dadosCompletos.daily.temperature_2m_max[7];
        const max10 = dadosCompletos.daily.temperature_2m_max[7];
        const max11 = dadosCompletos.daily.temperature_2m_max[7];
        const max12 = dadosCompletos.daily.temperature_2m_max[7];
        const max13 = dadosCompletos.daily.temperature_2m_max[7];
        const max14 = dadosCompletos.daily.temperature_2m_max[7];
        const max15 = dadosCompletos.daily.temperature_2m_max[7];
        const max16 = dadosCompletos.daily.temperature_2m_max[7];

        const dia8 = retornar_data_futura(7);
        const dia9 = retornar_data_futura(7);
        const dia10 = retornar_data_futura(7);
        const dia11 = retornar_data_futura(7);
        const dia12 = retornar_data_futura(7);
        const dia13 = retornar_data_futura(7);
        const dia14 = retornar_data_futura(7);
        const dia15 = retornar_data_futura(7);
        const dia16 = retornar_data_futura(7);

        const cli8 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[7]}});
        const cli9 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[8]}});
        const cli10 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[9]}});
        const cli11 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[10]}});
        const cli12 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[11]}});
        const cli13 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[12]}});
        const cli14 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[13]}});
        const cli15 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[14]}});
        const cli16 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[15]}});

        const chu8 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu9 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu10 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu11 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu12 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu13 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu14 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu15 = dadosCompletos.daily.precipitation_probability_max[6];
        const chu16 = dadosCompletos.daily.precipitation_probability_max[6];
        
        exibirResultado(cidade, temperatura, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva, precipitacao, cod1);
        exibir_dia02(dia2, min2, max2, cli2, cod2, chu2);
        exibir_dia03(dia3, min3, max3, cli3, cod3, chu3);
        exibir_dia04(dia4, min4, max4, cli4, cod4, chu4);
        exibir_dia05(dia5, min5, max5, cli5, cod5, chu5);
        exibir_dia06(dia6, min6, max6, cli6, cod6, chu6);
        exibir_dia07(dia7, min7, max7, cli7, cod7, chu7);

        view_01(dat2, dia2, cli2, min2, max2, chu2, pre2);
        view_02(dat3, dia3, cli3, min3, max3, chu3, pre3);
        view_03(dat4, dia4, cli4, min4, max4, chu4, pre4);
        view_04(dat5, dia5, cli5, min5, max5, chu5, pre5);
        view_05(dat6, dia6, cli6, min6, max6, chu6, pre6);
        view_06(dat7, dia7, cli7, min7, max7, chu7, pre7);
        view_07(dat8, dia8, cli8, min8, max8, chu8, pre8);
        view_08(dat9, dia9, cli9, min9, max9, chu9, pre9);
        view_09(dat10, dia10, cli10, min10, max10, chu10, pre10);
        view_10(dat11, dia11, cli11, min11, max11, chu11, pre11);
        view_11(dat12, dia12, cli12, min12, max12, chu12, pre12);
        view_12(dat13, dia13, cli13, min13, max13, chu13, pre13);
        view_13(dat14, dia14, cli14, min14, max14, chu14, pre14);
        view_14(dat15, dia15, cli15, min15, max15, chu15, pre15);
        view_15(dat16, dia16, cli16, min16, max16, chu16, pre16);

        print2(latitude, longitude, dadosClima, dadosCompletos, cidade, nome_pais_api);

        } catch (error) {
          exibirErro();
          console.error(error);}
  });
}

diaSemana();
buscarInformacoes();