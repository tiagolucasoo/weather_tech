console.log("Projeto: Weather Tech v1.0");
console.log("Por: Tiagolucasoo (GitHub)");
console.log("API Utilizada: Open-meteo");

function print2(latitude, longitude, Info_Previsao_Completa, cidade, nome_pais_api){
  if (!Info_Previsao_Completa || !Info_Previsao_Completa.daily) {
    console.warn("❗ Dados incompletos para print2():", Info_Previsao_Completa);
    return;
  }

  try {
    console.log("\n📍 Coordenadas:");
    console.log("Latitude:", latitude, "Longitude:", longitude);

    console.log("\n🌍 Localização:");
    console.log("País:", nome_pais_api, "Cidade:", cidade);

    console.log("\n🌤️ Dados do Clima:");
    console.log("Temperatura Máxima:", Info_Previsao_Completa.daily.temperature_2m_max);
    console.log("Temperatura Mínima:", Info_Previsao_Completa.daily.temperature_2m_min);
    console.log("Precipitação:", Info_Previsao_Completa.daily.precipitation_sum);
    console.log("Chance de Chuva:", Info_Previsao_Completa.daily.precipitation_probability_max);
  } catch (err) {
    console.error("Erro interno ao exibir dados em print2:", err);
  }
}

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
function buscaAutomatica(){
  document.getElementById("gps").addEventListener("click", async () => {
    try {
      gps_permissao();
      document.querySelector(".erro").innerText = "";
      Swal.fire({
            icon: 'info',
            title: 'Um momento',
            timer: 5000,
            timerProgressBar: true,
            text: 'Estamos carregando as informações de localização, aguarde alguns segundos e para isso é importante autorizar o acesso a localização!',
            showConfirmButton: false,
        });

      const { latitude, longitude } = await gps_localizacao();

      // Teste RJ - const latitude = -22.9068;
      // Teste RJ -const longitude = -43.1729;
      // const latitude = 31.96859880;
      // const longitude = -99.90181310;

      const dadosLocalizacao = await localizacao_gps(latitude, longitude);

      if (!dadosLocalizacao) {
        document.querySelector(".erro").innerText = "Erro ao obter localização por GPS.";
        return;
      }

      const { gps_cidade, pais, codigoPais } = dadosLocalizacao;

      console.clear();
      await buscarInformacoes(codigoPais.toUpperCase(), gps_cidade, pais);
    } catch (error) {
      console.error("Erro ao usar localização automática:", error);
      document.querySelector(".erro").innerText = "Erro ao usar localização automática.";
      Swal.fire({
            icon: 'error',
            title: 'Erro ao usar a localização automática',
            text: `Confirme se a localização está ativa e se você permitiu o site a fazer a consulta se não tente manualmente!`,
            timer: 5000,
            timerProgressBar: true,
        });
      gps_permissao();
    }
  });
}

buscaAutomatica();
// Função principal // Previsao_Atual = buscarClima | Previsao_Completa = DadosCompletos
async function buscarInformacoes(codigo_pais, cidade, nome_pais) {    
        const dadosCoord = await buscarCoordenadas(codigo_pais, cidade);
        if (!validarResultado(dadosCoord, cidade, nome_pais));
        document.querySelector(".erro").innerText = "";

        const { latitude, longitude } = dadosCoord.results[0];
        const Info_Previsao_Completa = await Previsao_Completa(latitude, longitude);
        const Info_Previsao_Atual = await Previsao_Atual(latitude, longitude);
        const Info_Previsao_Hora = await Previsao_Dia(latitude, longitude);

        console.log("Previsão Completa:", Info_Previsao_Completa);
        
        // Dados do Dia
        const temperatura = Info_Previsao_Atual.current_weather.temperature;
        const climaDescricao = validacao_clima(Info_Previsao_Atual);
        const vento = Info_Previsao_Atual.current_weather.windspeed;
        const clima = Info_Previsao_Atual.current_weather.weathercode;

        const temp_minima = Info_Previsao_Completa.daily.temperature_2m_min[0];
        const temp_maxima = Info_Previsao_Completa.daily.temperature_2m_max[0];

        const precipitacao = validarHorarioPrecipitacao(Info_Previsao_Hora);
        const cod1 = validarHorarioClima(Info_Previsao_Hora);
        const porc_chuva = validarHorarioChuva(Info_Previsao_Hora);
        console.log(porc_chuva);

        // Dados de Localização
        const estado = dadosCoord.results[0].admin1;
        const nome_pais_api = dadosCoord.results[0].country;
        console.log(Info_Previsao_Atual.current_weather);

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
          d_chuva.push(Info_Previsao_Completa.daily.precipitation_probability_max[i]);
          d_clima.push(validacao_clima({ current_weather: {weathercode: Info_Previsao_Completa.daily.weathercode[i]}}));
          d_dias.push(retornar_data_futura(i));
          d_min.push(Info_Previsao_Completa.daily.temperature_2m_min[i]);
          d_max.push(Info_Previsao_Completa.daily.temperature_2m_max[i]);
          d_precipitacao.push(Info_Previsao_Completa.daily.precipitation_sum[i]);
        }
        
        // Construtor - Dados Semana
        const i_chuva = []
        const i_clima = []
        const i_dias = []
        const i_min = []
        const i_max = []
        const i_cod = []

        for (let i = 1; i <= 7; i++) {
          i_chuva.push(Info_Previsao_Completa.daily.precipitation_probability_max[i]);
          i_clima.push(validacao_clima({ current_weather: {weathercode: Info_Previsao_Completa.daily.weathercode[i]}}));
          i_dias.push(retornar_data_futura(i));
          i_min.push(Info_Previsao_Completa.daily.temperature_2m_min[i]);
          i_max.push(Info_Previsao_Completa.daily.temperature_2m_max[i]);
          i_cod.push(Info_Previsao_Completa.daily.weathercode[i]);
        }

        exibirResultado(cidade, temperatura, vento, nome_pais_api, estado, clima, climaDescricao, temp_minima, temp_maxima, porc_chuva, precipitacao, cod1);
        exibir_semana(i_dias, i_min, i_max, i_clima, i_chuva, i_cod);

        criarTabela_Cabecalho();
        criarTabela_Dados(d_dias, d_clima, d_min, d_max, d_chuva, d_precipitacao);

        print2(latitude, longitude, Info_Previsao_Completa, cidade, nome_pais_api);

}

document.addEventListener("DOMContentLoaded", function(){
    pesquisar();
});