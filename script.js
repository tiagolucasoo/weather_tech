function dataAtual() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`
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

function exibirResultado(cidade, temperatura, vento, nome_pais, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva) {
    document.querySelector(".info_cidade").innerText = `Cidade: ${cidade}`;
    document.querySelector(".info_pais").innerText = `País: ${nome_pais}`;
    document.querySelector(".info_estado").innerText = `Estado: ${estado}`;

    document.querySelector(".info_temperatura").innerText = `Temperatura Atual: ${temperatura}°C`;
    document.querySelector(".info_clima").innerText = `Clima Atual: ${clima} - ${climaDescricao}`;
    document.querySelector(".info_vento").innerText = `Vento: ${vento} km/h`;
    document.querySelector(".info_chuva").innerText = `Chuva: ${porc_chuva}%`;

    document.querySelector(".info_minima").innerText = `Mínima: ${temp_minima}°C`;
    document.querySelector(".info_maxima").innerText = `Máxima: ${temp_maxima}°C`;
}

function exibir_dia02(dia2, min2, max2, cli2, cod2){
    const clima = cod2;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima2").innerHTML = icone;

    document.querySelector(".info_data2").innerText = `${dia2}`;
    document.querySelector(".info_clima2").innerText = `${cli2}`;
    document.querySelector(".info_temp2").innerText = `${min2}° / ${max2}°`;
}

function exibir_dia03(dia3, min3, max3, cli3, cod3){
    const clima = cod3;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima3").innerHTML = icone;

    document.querySelector(".info_data3").innerText = `${dia3}`;
    document.querySelector(".info_clima3").innerText = `${cli3}`;
    document.querySelector(".info_temp3").innerText = `${min3}° / ${max3}°`;
}

function exibir_dia04(dia4, min4, max4, cli4, cod4){
    const clima = cod4;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima4").innerHTML = icone;

    document.querySelector(".info_data4").innerText = `${dia4}`;
    document.querySelector(".info_clima4").innerText = `${cli4}`;
    document.querySelector(".info_temp4").innerText = `${min4}° / ${max4}°`;
}

function exibir_dia05(dia5, min5, max5, cli5, cod5){
    const clima = cod5;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima5").innerHTML = icone;

    document.querySelector(".info_data5").innerText = `${dia5}`;
    document.querySelector(".info_clima5").innerText = `${cli5}`;
    document.querySelector(".info_temp5").innerText = `${min5}° / ${max5}°`;
}

function exibir_dia06(dia6, min6, max6, cli6, cod6){
    const clima = cod6;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima6").innerHTML = icone;

    document.querySelector(".info_data6").innerText = `${dia6}`;
    document.querySelector(".info_clima6").innerText = `${cli6}`;
    document.querySelector(".info_temp6").innerText = `${min6}° / ${max6}°`;
}

function exibir_dia07(dia7, min7, max7, cli7, cod7){
    const clima = cod7;
    const icone = gerarIconeClima(clima);
    document.querySelector(".icone_clima7").innerHTML = icone;

    document.querySelector(".info_data7").innerText = `${dia7}`;
    document.querySelector(".info_clima7").innerText = `${cli7}`;
    document.querySelector(".info_temp7").innerText = `${min7}° / ${max7}°`;
}

function limparDados(){
  document.querySelector(".info_cidade").innerText = ``;
    document.querySelector(".info_pais").innerText = ``;
    document.querySelector(".info_estado").innerText = ``;

    document.querySelector(".info_temperatura").innerText = ``;
    document.querySelector(".info_clima").innerText = ``;
    document.querySelector(".info_vento").innerText = ``;
    document.querySelector(".info_chuva").innerText = ``;

    document.querySelector(".info_minima").innerText = ``;
    document.querySelector(".info_maxima").innerText = ``;

    document.querySelector(".icone_clima2").innerHTML = ``;
    document.querySelector(".info_data2").innerText = ``;
    document.querySelector(".info_clima2").innerText = ``;
    document.querySelector(".info_temp2").innerText = ``;

    document.querySelector(".icone_clima3").innerHTML = ``;
    document.querySelector(".info_data3").innerText = ``;
    document.querySelector(".info_clima3").innerText = ``;
    document.querySelector(".info_temp3").innerText = ``;

    document.querySelector(".icone_clima4").innerHTML = ``;
    document.querySelector(".info_data4").innerText = ``;
    document.querySelector(".info_clima4").innerText = ``;
    document.querySelector(".info_temp4").innerText = ``;

    document.querySelector(".icone_clima5").innerHTML = ``;
    document.querySelector(".info_data5").innerText = ``;
    document.querySelector(".info_clima5").innerText = ``;
    document.querySelector(".info_temp5").innerText = ``;

    document.querySelector(".icone_clima6").innerHTML = ``;
    document.querySelector(".info_data6").innerText = ``;
    document.querySelector(".info_clima6").innerText = ``;
    document.querySelector(".info_temp6").innerText = ``;

    document.querySelector(".icone_clima7").innerHTML = ``;
    document.querySelector(".info_data7").innerText = ``;
    document.querySelector(".info_clima7").innerText = ``;
    document.querySelector(".info_temp7").innerText = ``;
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
        console.log("Latitude:", latitude, "Longitude:", longitude);

        const dadosCompletos = await buscarClima_Completo(latitude, longitude)
        console.log("Dados completos do clima:", dadosCompletos);

        const dadosClima = await buscarClima(latitude, longitude);
        console.log("Dados clima atual:", dadosClima);

        const temp = dadosClima.current_weather.temperature;
        
        const vento = dadosClima.current_weather.windspeed;
        const clima = dadosClima.current_weather.weathercode;

        const estado = dadosCoord.results[0].admin1;
        const nome_pais_api = dadosCoord.results[0].country;
      
        const climaDescricao = validacao_clima(dadosClima);

        const temp_minima = dadosCompletos.daily.temperature_2m_min[0];
        console.log('Temp mín:', dadosCompletos.daily.temperature_2m_min);

        const temp_maxima = dadosCompletos.daily.temperature_2m_max[0];
        console.log('Temp mín:', dadosCompletos.daily.temperature_2m_max);

        const porc_chuva = dadosCompletos.daily.precipitation_probability_max[0]
        console.log(porc_chuva);

        const dia2 = dadosCompletos.daily.time[1];
        const min2 = dadosCompletos.daily.temperature_2m_min[1];
        const max2 = dadosCompletos.daily.temperature_2m_max[1];
        const cli2 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[1]}});
        const cod2 = dadosCompletos.daily.weathercode[1];

        const dia3 = dadosCompletos.daily.time[2];
        const min3 = dadosCompletos.daily.temperature_2m_min[2];
        const max3 = dadosCompletos.daily.temperature_2m_max[2];
        const cli3 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[2]}});
        const cod3 = dadosCompletos.daily.weathercode[2];

        const dia4 = dadosCompletos.daily.time[3];
        const min4 = dadosCompletos.daily.temperature_2m_min[3];
        const max4 = dadosCompletos.daily.temperature_2m_max[3];
        const cli4 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[3]}});
        const cod4 = dadosCompletos.daily.weathercode[3];

        const dia5 = dadosCompletos.daily.time[4];
        const min5 = dadosCompletos.daily.temperature_2m_min[4];
        const max5 = dadosCompletos.daily.temperature_2m_max[4];
        const cli5 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[4]}});
        const cod5 = dadosCompletos.daily.weathercode[4];

        const dia6 = dadosCompletos.daily.time[5];
        const min6 = dadosCompletos.daily.temperature_2m_min[5];
        const max6 = dadosCompletos.daily.temperature_2m_max[5];
        const cli6 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[5]}});
        const cod6 = dadosCompletos.daily.weathercode[5];

        const dia7 = dadosCompletos.daily.time[6];
        const min7 = dadosCompletos.daily.temperature_2m_min[6];
        const max7 = dadosCompletos.daily.temperature_2m_max[6];
        const cli7 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[6]}});
        const cod7 = dadosCompletos.daily.weathercode[6];


        exibirResultado(cidade, temp, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva);
        exibir_dia02(dia2, min2, max2, cli2, cod2);
        exibir_dia03(dia3, min3, max3, cli3, cod3);
        exibir_dia04(dia4, min4, max4, cli4, cod4);
        exibir_dia05(dia5, min5, max5, cli5, cod5);
        exibir_dia06(dia6, min6, max6, cli6, cod6);
        exibir_dia07(dia7, min7, max7, cli7, cod7);


        } catch (error) {
        exibirErro();
        console.error(error);
        }

  });
}

buscarInformacoes();