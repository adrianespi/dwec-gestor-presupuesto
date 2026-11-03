import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

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