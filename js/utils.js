//  utils.js    Arquivo separado para validações, formatações e funções auxiliares

// 1) Validação
function validarEntrada(codigo_pais, nome_pais, cidade) {
    if (codigo_pais === "00") {
        Swal.fire({
            icon: 'error', // Ícone de aviso
            title: 'Atenção!',
            text: 'Você não selecionou um país. Por favor, escolha uma opção na lista',
            showConfirmButton: true,
            confirmButtonText: 'Entendi',
        });
        return false; // A lógica de retorno continua a mesma
    }

    if (cidade.length === 0) {
        // SUBSTITUÍDO: O segundo alert()
        Swal.fire({
            icon: 'warning',
            title: 'Campo Obrigatório',
            text: `Você selecionou o país ${nome_pais}, mas não informou o nome da cidade!`,
            confirmButtonText: 'OK',
        });
        return false;
    }

    // Se passou por todas as validações, retorna true
    return true;
}

function validarResultado(data1, cidade, nome_pais) { 
  if (!data1.results || data1.results.length === 0) {
    Swal.fire({
            icon: 'error',
            title: 'Campo Obrigatório',
            text: `Não conseguimos encontrar a cidade "${cidade}" no país ${nome_pais}. Verifique se o nome está correto ou Utilize o Botão de Localização Automática!`,
            confirmButtonText: 'OK',
        });
    return false;
  }

  return true;
}
function validacao_clima(Info_Previsao_Atual) {
    const tipo_clima = Info_Previsao_Atual.current_weather.weathercode;
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
        case 1: return 'Segunda';
        case 2: return 'Terça';
        case 3: return 'Quarta';
        case 4: return 'Quinta';
        case 5: return 'Sexta';
        case 6: return 'Sábado';
        default: return 'Código Inválido';
    }
}

// 2) Limpar Campos
function limparDados(){
    window.scrollTo({top: 0,behavior: 'smooth'});
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

// 3) Auxiliar - Criar Linha
function linha_Html(ref) { 
  const td = document.createElement("td");
  td.innerHTML = ref ?? "N/A";
  return td;
}

// 4) Auxiliar - Datas
function dataAtual() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  console.log(`Data Atual: ${dia}/${mes}/${ano}`);
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

// 5) Auxiliar - Retorna o código e país sem o Icone
function comboPais() { 
  const select = document.getElementById('combo_Pais');
  const codigo_pais = select.value;
  const nome_pais = select.options[select.selectedIndex].text.replace(/^[^\p{L}]+/u, '').trim();
  return { codigo_pais, nome_pais };
}

// 6) Definição de Icones e Validação do Clima (Weathercode)
function Icones(){ 
    const {icone_0e1,icone_2,icone_3,icone_45e48,icone_51_53e55,icone_61_63e65,icone_71_73e75,icone_80_81e82,icone_95_96e99,icone_atualizar,icone_limpar, icone_local} = associacaoClasse()

    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(fontAwesome);
    console.log("Icones Importados ✓")

    customElements.define('cod-00', icone_0e1);
    customElements.define('cod-02', icone_2);
    customElements.define('cod-03', icone_3);
    customElements.define('cod-45', icone_45e48);
    customElements.define('cod-51', icone_51_53e55);
    customElements.define('cod-61', icone_61_63e65);
    customElements.define('cod-71', icone_71_73e75);
    customElements.define('cod-80', icone_80_81e82);
    customElements.define('cod-95', icone_95_96e99);
    customElements.define('cod-att', icone_atualizar);
    customElements.define('cod-limpar', icone_limpar);
    customElements.define('cod-gps', icone_local);
    console.log("Icones Associados ✓")
}
function associacaoClasse(){
    class icone_0e1 extends HTMLElement { // 0 Céu Limpo & 1 Parcialmente Limpo
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-sun" aria-hidden="true" style="color: #DC853D"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_2 extends HTMLElement { // 2 - Parcialmente Nublado
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-cloud-sun" aria-hidden="true" style="color: #DC853D"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_3 extends HTMLElement { // 3 - Nublado
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-cloud" aria-hidden="true" style="color: #DC853D"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_45e48 extends HTMLElement { // 45 - Névoa & 48 Névoa com Gelo
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-smog" aria-hidden="true" style="color: #DC853D"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_51_53e55 extends HTMLElement { // 51 Garoa Fraca, 53 Garoa Moderada & 55 Garoa Intensa
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-cloud-rain" aria-hidden="true" style="color: #DC853D"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_61_63e65 extends HTMLElement { // 61 Chuva Fraca, 63 Chuva Moderada & 65 Chuva Intensa
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-cloud-showers-heavy" aria-hidden="true" style="color: #1B97D5"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_71_73e75 extends HTMLElement { // 71 Neve Fraca, 73 Moderada & 75 Forte
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-snowflake" aria-hidden="true" style="color: #ABD1F3"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_80_81e82 extends HTMLElement { // 80 Pancada Fraca, 81 Pancadas Moderadas & 82 Pancadas Fortes
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-cloud-showers-heavy" aria-hidden="true" style="color: #1B97D5"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_95_96e99 extends HTMLElement { // 80 Tempestade com chuva, 96 Tempestade com Granizo Leve & 99 Tempestade com Granizo Forte
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-bolt" aria-hidden="true" style="color: #1B97D5"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_atualizar extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-sync" aria-hidden="true" style="color: #fff"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_local extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-location-arrow" aria-hidden="true" style="color: #fff"></i>

                `;
            this.style.cursor = "pointer";
        }
    }
    class icone_limpar extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
                <i class="fa fa-eraser" aria-hidden="true" style="color: #fff"></i>
                `;
            this.style.cursor = "pointer";
        }
    }
    return { icone_0e1, icone_2, icone_3, icone_45e48, icone_51_53e55, icone_61_63e65, icone_71_73e75, icone_80_81e82, icone_95_96e99, icone_atualizar, icone_limpar, icone_local }
}
function gerarIconeClima(clima) {
        if (clima === 0 || clima === 1) return `<cod-00></cod-00>`;
        if (clima === 2) return `<cod-02></cod-02>`;
        if (clima === 3) return `<cod-03></cod-03>`;
        if (clima === 45 || clima === 48) return `<cod-45></cod-45>`;
        if (clima === 51 || clima === 53 || clima === 55) return `<cod-51></cod-51>`;
        if (clima === 61 || clima === 63 || clima === 65) return `<cod-61></cod-61>`;
        if (clima === 71 || clima === 73 || clima === 75 || clima === 85) return `<cod-71></cod-71>`;
        if (clima === 80 || clima === 81 || clima === 82) return `<cod-80></cod-80>`;
        if (clima === 95 || clima === 96 || clima === 99) return `<cod-95></cod-95>`;
        return '';
}

// Inicializador
document.addEventListener("DOMContentLoaded", function(){
    Icones();
});