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

// function diaSemana(){
//   const data = new Date();
//   codigo_semana = data.getDay();
//   dia_semana = validarDia(codigo_semana);
//   return dia_semana;
// }

function pesquisar(){
  document.getElementById("buscar").addEventListener("click", async () => {
    const cidadeInput = document.querySelector(".inputCidade");
    const cidade = cidadeInput.value.trim();
    const { codigo_pais, nome_pais } = comboPais();

    if (!validarEntrada(codigo_pais, nome_pais, cidade)) return;

    try {
      console.clear();
      await buscarInformacoes(codigo_pais, cidade, nome_pais);
    } catch (error) {
      document.querySelector(".erro").innerText = "Erro ao buscar dados.";
      console.log(error);
    }
  });
}

// Função principal
async function buscarInformacoes(codigo_pais, cidade, nome_pais) {    
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

        // const cod7 = dadosCompletos.daily.weathercode[6];
        // const chu7 = dadosCompletos.daily.precipitation_probability_max[6];
        // const pre8 = dadosCompletos.daily.precipitation_sum[7];
        // const min8 = dadosCompletos.daily.temperature_2m_min[7];
        // const max8 = dadosCompletos.daily.temperature_2m_max[7];
        // const dia8 = retornar_data_futura(7);
        // const cli8 = validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[7]}});
        
        // Construtor - Dados Quinzenal (Tabela)
        const d_chuva = []
        const d_clima = []
        const d_dias = []
        const d_min = []
        const d_max = []
        const d_precipitacao = []

        for (let i = 1; i <= 14; i++) {
          d_chuva.push(dadosCompletos.daily.precipitation_probability_max[i]);
          d_clima.push(validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[i]}}));
          d_dias.push(retornar_data_futura(i));
          d_min.push(dadosCompletos.daily.temperature_2m_min[i]);
          d_max.push(dadosCompletos.daily.temperature_2m_max[i]);
          d_precipitacao.push(dadosCompletos.daily.precipitation_sum[i]);
        }
        
        // Construtor - Dados Semana
        const i_chuva = []
        const i_clima = []
        const i_dias = []
        const i_min = []
        const i_max = []
        const i_cod = []

        for (let i = 1; i <= 7; i++) {
          i_chuva.push(dadosCompletos.daily.precipitation_probability_max[i]);
          i_clima.push(validacao_clima({ current_weather: {weathercode: dadosCompletos.daily.weathercode[i]}}));
          i_dias.push(retornar_data_futura(i));
          i_min.push(dadosCompletos.daily.temperature_2m_min[i]);
          i_max.push(dadosCompletos.daily.temperature_2m_max[i]);
          i_cod.push(dadosCompletos.daily.weathercode[i]);
        }

        exibirResultado(cidade, temperatura, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva, precipitacao, cod1);
        exibir_semana(i_dias, i_min, i_max, i_clima, i_chuva, i_cod);

        criarTabela_Cabecalho();
        criarTabela_Dados(d_dias, d_clima, d_min, d_max, d_chuva, d_precipitacao);

        print2(latitude, longitude, dadosClima, dadosCompletos, cidade, nome_pais_api);
}

document.addEventListener("DOMContentLoaded", function(){
    pesquisar();
});