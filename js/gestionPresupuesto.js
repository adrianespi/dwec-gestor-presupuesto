let presupuesto = 0;
let gastos  = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error("Error: el presupuesto debe ser un número no negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function () {
        for (let i = 0; i < arguments.length; i++) {
            if (this.etiquetas.indexOf(arguments[i]) === -1) {
                this.etiquetas.push(arguments[i]);
            }
        }
    };

    this.borrarEtiquetas = function () {
        for (let i = 0; i < arguments.length; i++) {
            let posicion = this.etiquetas.indexOf(arguments[i]);
            if (posicion !== -1) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    };

    for (let i = 0; i < etiquetas.length; i++) {
        this.anyadirEtiquetas(etiquetas[i]);
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += `- ${this.etiquetas[i]}\n`;
        }
        return texto;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function (nuevaFecha) {
        if (typeof nuevaFecha === "string" && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.obtenerPeriodoAgrupacion = function (periodo) { //Tambien se podria hacer con toISOString https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString https://www.w3schools.com/jsref/jsref_toisostring.asp
        let fechaGasto = new Date(this.fecha);

        let anyo = fechaGasto.getUTCFullYear();
        let mes = String(fechaGasto.getUTCMonth() + 1).padStart(2, "0");
        let dia = String(fechaGasto.getUTCDate()).padStart(2, "0");

        if (periodo === "dia") {
            return `${anyo}-${mes}-${dia}`;
        } else if (periodo === "anyo") {
            return `${anyo}`;
        } else {
            return `${anyo}-${mes}`;
        }
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            break;
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros = {}) {
    return gastos.filter(function (gasto) {

        if (filtros.fechaDesde !== undefined && gasto.fecha < Date.parse(filtros.fechaDesde)) {
            return false;
        }

        if (filtros.fechaHasta !== undefined && gasto.fecha > Date.parse(filtros.fechaHasta)) {
            return false;
        }

        if (filtros.valorMinimo !== undefined && gasto.valor < filtros.valorMinimo) {
            return false;
        }

        if (filtros.valorMaximo !== undefined && gasto.valor > filtros.valorMaximo) {
            return false;
        }

        if (filtros.descripcionContiene !== undefined && !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
            return false;
        }

        if (filtros.etiquetasTiene !== undefined) {
            let algunaEtiquetaCoincide = false;

            for (let i = 0; i < gasto.etiquetas.length; i++) {
                for (let j = 0; j < filtros.etiquetasTiene.length; j++) {
                    if (gasto.etiquetas[i].toLowerCase() === filtros.etiquetasTiene[j].toLowerCase()) {
                        algunaEtiquetaCoincide = true;
                        break;
                    }
                }
                if (algunaEtiquetaCoincide) {
                    break;
                }
            }

            if (!algunaEtiquetaCoincide) {
                return false;
            }
        }
        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtros = {};

    if (etiquetas !== undefined && etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    if (fechaDesde !== undefined) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta !== undefined) {
        filtros.fechaHasta = fechaHasta;
    } else {
        filtros.fechaHasta = new Date().toISOString();
    }

    let gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce(function (acc, gasto) {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[clave] = (acc[clave] || 0) + gasto.valor;
        return acc;
    }, {});
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}