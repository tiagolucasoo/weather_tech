// Antes Weathercode - Funções ajustadas e passada para utils
// Deixar aqui funções get e adicionar API da nominatim para retornar dados com base na localização atual

async function buscarCoordenadas(codigo_pais, cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?count=1&countryCode=${codigo_pais}&name=${cidade}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Previsao_Atual = buscarClima | Previsao_Completa = DadosCompletos
async function Previsao_Atual(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function Previsao_Dia(latitude, longitude) {
  const hoje = dataAtual();
  const amanha = proximosDias(1);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&current_weather=true&timezone=auto&start_date=${hoje}&end_date=${amanha}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function Previsao_Completa(latitude, longitude) {
  const hoje = dataAtual();
  const next_days = proximosDias(14);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weathercode,precipitation_sum,precipitation_probability_max&timezone=auto&start_date=${hoje}&end_date=${next_days}`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Pega a localização atual
function gps_localizacao() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude GPS: ${latitude}, Longitude GPS: ${longitude}`);
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error(`Erro ao obter localização: ${error.message}`);
          reject(error);
        }
      );
    } else {
      console.log("Geolocalização não é suportada pelo seu navegador.");
      reject(new Error("Geolocalização não suportada"));
    }
  });
}

// Atribui a localização atual e retorna o nome dacidade
async function localizacao_gps(latitude_gps, longitude_gps) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude_gps}&lon=${longitude_gps}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WeatherTechApp/1.0 (tiago.lucas.oliveira18@gmail.com)'
      }
    });
    if (!response.ok) throw new Error("Erro na requisição Nominatim");

    const data = await response.json();

    return {
      gps_cidade: data.address.city || data.address.town || data.address.village || data.address.hamlet || '',
      estado: data.address.state || '',
      pais: data.address.country || '',
      codigoPais: data.address.country_code || ''
    };
  } catch (error) {
    console.error("Erro ao buscar localização", error);
    return null;
  }
}

async function gps_permissao() {
  try {
    const { latitude, longitude } = await gps_localizacao();
    const resultado = await localizacao_gps(latitude, longitude);

    console.log(resultado);
  } catch (error) {
    console.error("Erro ao obter localização ou buscar nome da cidade:", error);
  }
}