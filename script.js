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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto&start_date=${hoje}&end_date=${next_days}`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function exibirResultado(cidade, temperatura, vento, nome_pais, estado, clima, climaDescricao, temp_minima, temp_maxima) {
    document.querySelector(".info_cidade").innerText = `Cidade: ${cidade}`;
    document.querySelector(".info_pais").innerText = `País: ${nome_pais}`;
    document.querySelector(".info_estado").innerText = `Estado: ${estado}`;

    document.querySelector(".info_temperatura").innerText = `Temperatura Atual: ${temperatura}°C`;
    document.querySelector(".info_clima").innerText = `Clima Atual: ${clima} - ${climaDescricao}`;
    document.querySelector(".info_vento").innerText = `Vento: ${vento} km/h`

    document.querySelector(".info_minima").innerText = `Mínima: ${temp_minima}°C`
    document.querySelector(".info_maxima").innerText = `Máxima: ${temp_maxima}°C`
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

        exibirResultado(cidade, temp, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima);
        } catch (error) {
        exibirErro();
        console.error(error);
        }

  });
}

buscarInformacoes();