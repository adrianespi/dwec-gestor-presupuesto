import * as gestionPresupuesto from "./gestionPresupuesto.js";

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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);

    const nombresPeriodo = { dia: "día", mes: "mes", anyo: "año" };

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    const h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${nombresPeriodo[periodo]}`;
    divAgrupacion.appendChild(h1);

    const claves = Object.keys(agrup);
    for (let i = 0; i < claves.length; i++) {
        const clave = claves[i];
        const valor = agrup[clave];

        const divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        const spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor;

        divDato.append(spanClave, spanValor);
        divAgrupacion.appendChild(divDato);
    }

    contenedor.appendChild(divAgrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    const contenedorListado = document.getElementById("listado-gastos-completo");
    contenedorListado.innerHTML = "";

    gestionPresupuesto.listarGastos().forEach((gasto) => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}