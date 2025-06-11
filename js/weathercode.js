function importIcons(){ // Importar Icones
    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
    document.head.appendChild(fontAwesome);
}
function defIcons(){ // Associa a classe com o chamado em HTML
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
}
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
class icone_limpar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <i class="fa fa-eraser" aria-hidden="true" style="color: #fff"></i>
            `;
        this.style.cursor = "pointer";
    }
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

importIcons();
defIcons();