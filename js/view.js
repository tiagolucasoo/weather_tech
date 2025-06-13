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