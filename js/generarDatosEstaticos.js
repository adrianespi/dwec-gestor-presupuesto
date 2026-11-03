import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

const gastos = [
    new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];

gastos.forEach((g) => gestionPresupuesto.anyadirGasto(g));

gestionPresupuesto.listarGastos().forEach((g) => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", g);
});

const listadosFiltrados = [
    ["listado-gastos-filtrado-1", { fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" }],
    ["listado-gastos-filtrado-2", { valorMinimo: 50 }],
    ["listado-gastos-filtrado-3", { valorMinimo: 200, etiquetasTiene: ["seguros"] }],
    ["listado-gastos-filtrado-4", { valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] }]
];

listadosFiltrados.forEach(([id, filtros]) => {
    gestionPresupuesto.filtrarGastos(filtros).forEach((g) => {
        gestionPresupuestoWeb.mostrarGastoWeb(id, g);
    });
});

gestionPresupuestoWeb.mostrarDatoEnId( "gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId( "balance-total", gestionPresupuesto.calcularBalance());