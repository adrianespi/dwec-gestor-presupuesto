function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);

    const divGasto = document.createElement("div");
    divGasto.className = "gasto";

    const divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;

    const divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor} €`;

    const divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for (const etiqueta of gasto.etiquetas) {
        const span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = etiqueta;
        divEtiquetas.appendChild(span);
    }

    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas);
    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb() {
    
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}