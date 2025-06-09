// Retorna o código e nome do país selecionado (sem emoji)
function comboPais() {
  const select = document.getElementById('combo_Pais');
  const codigo_pais = select.value;
  const nome_pais = select.options[select.selectedIndex].text.replace(/^[^\p{L}]+/u, '').trim();
  return { codigo_pais, nome_pais };
}

// Monta a URL da API de coordenadas
function get_coordenada(codigo_pais, cidade) {
  return `https://geocoding-api.open-meteo.com/v1/search?count=1&countryCode=${codigo_pais}&name=${cidade}`;
}

// Valida país e cidade
function validarEntrada(codigo_pais, nome_pais, cidade) {
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

// Valida resultado da API
function validarResultado(data1, cidade, nome_pais) {
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

function exibirResultado(cidade, temperatura, vento, nome_pais, estado, clima, climaDescricao) {
    document.querySelector(".info_cidade").innerText = `Cidade: ${cidade}`;
    document.querySelector(".info_pais").innerText = `País: ${nome_pais}`;
    document.querySelector(".info_estado").innerText = `Estado: ${estado}`;
    document.querySelector(".info_temperatura").innerText = `Temperatura Atual: ${temperatura}°C`;
    document.querySelector(".info_clima").innerText = `Clima Atual: ${clima}`;
    document.querySelector(".info_clima2").innerText = `Clima Atual: ${climaDescricao}`;

  document.querySelector(".resultado").innerText =
    `${temperatura}°C, Vento: ${vento} km/h`;
}

function exibirErro() {
  document.querySelector(".resultado").innerText = "Erro ao buscar dados.";
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
        const dadosClima = await buscarClima(latitude, longitude);

        const temp = dadosClima.current_weather.temperature;
        const vento = dadosClima.current_weather.windspeed;
        const estado = dadosCoord.results[0].admin1;
        const nome_pais_api = dadosCoord.results[0].country;
        const clima = dadosClima.current_weather.weathercode;

        const climaDescricao = validacao_clima(dadosClima);

        exibirResultado(cidade, temp, vento, nome_pais_api, estado, clima, climaDescricao);
        } catch (error) {
        exibirErro();
        console.error(error);
        }

  });
}

buscarInformacoes();