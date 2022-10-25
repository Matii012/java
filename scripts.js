/** GUARDAR ARRAYS */

// Guardar array

// const array = [1, 2, 3, 4];
//
// localStorage.setItem("array", array);

// Obtener array

// const arrayString = localStorage.getItem("array");
// const array = arrayString.split(",");
//
// console.log(array);

/** BORRAR ELEMENTOS */

// Remove item

// localStorage.removeItem("array");

// const frase = localStorage.getItem("frase");
// console.log(frase);

// Clear

// localStorage.clear();

/** ALMACENAR OBJETOS */

// const persona = {
//     nombre: "Juan",
//     apellido: "Perez",
//     edad: 30,
//     encontrado: true,
// };
//
// const personaJSON = JSON.stringify(persona);
//
// localStorage.setItem("persona", personaJSON);

// Obtener el objeto

// const personaJSON = localStorage.getItem("persona");
//
// const persona = JSON.parse(personaJSON);
//
// console.log(persona);

/** ARRAY DE OBJETOS */

// class Persona {
//
//     constructor(nombre, apellido, edad) {
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.edad = edad;
//     }
// }
//
// const listaDePersonas = [];
// listaDePersonas.push(new Persona("Juan", "Perez", 30));
// listaDePersonas.push(new Persona("Alberto", "Fernandez", 40));
// listaDePersonas.push(new Persona("Gabriel", "Jesús", 25));
//
// const json = JSON.stringify(listaDePersonas);
//
// localStorage.setItem("lista_de_personas", json);

// Obtener

// const json = localStorage.getItem("lista_de_personas");
//
// const listaDePersonas = JSON.parse(json);
//
// console.log(listaDePersonas);

/** EJEMPLO */

function guardarProductoEnLocalStorage (producto) {

    // Traigo en localStorage
    const productosEnLS = localStorage.getItem("productos");

    if(productosEnLS !== null) {

        // Parseo lo que tengo en localStorage
        const productos = JSON.parse(productosEnLS);

        // Encuentro el índice en donde se encuentra el elemento a buscar
        const indiceProductoEncontrado = productos.findIndex( (elemento) => {
            return elemento.nombre === producto.nombre;
        });

        // Utilizo el índice buscado para pisar el stock por el que tiene el nuevo producto
        productos[indiceProductoEncontrado].stock = producto.stock;

        // Vuelvo a cambiar el localStorage
        localStorage.setItem("productos", JSON.stringify(productos));

        // Renderizar tabla
        renderizarTabla(productos);
    }
}

function renderizarTabla (productos) {

    const bodyTabla = document.getElementById("body_productos");

    // Limpio body de la tabla
    bodyTabla.innerHTML = "";

    for(const producto of productos) {

        // Creo la fila
        const tr = document.createElement("tr");

        // Columna nombre
        const td1 = document.createElement("td");
        td1.innerText = producto.nombre;

        // Columna stock
        const td2 = document.createElement("td");
        td2.innerText = producto.stock;

        // Columna acciones
        const td3 = document.createElement("td");

        // Creo los botones
        const botonSumarStock = document.createElement("button");
        botonSumarStock.innerText = "+";
        const botonRestarStock = document.createElement("button");
        botonRestarStock.innerText = "-";

        // Agregar eventos del botón
        botonSumarStock.addEventListener("click", () => {
            producto.stock += 1;

            guardarProductoEnLocalStorage(producto);
        });

        botonRestarStock.addEventListener("click", () => {
            producto.stock -= 1;

            guardarProductoEnLocalStorage(producto);
        });

        // Agregar botones a la columna "Acciones"
        td3.append(botonSumarStock);
        td3.append(botonRestarStock);

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);

        // Agregar tr al body
        bodyTabla.append(tr);
    }

}

let productos = [];

// Chequeo si tengo productos en localStorage
const productosStorage = localStorage.getItem("productos");

if(productosStorage !== null) {
    productos = JSON.parse(productosStorage);
}

// Detectamos evento SUBMIT de formulario
const formularioAgregarProducto = document.getElementById("formulario_agregar_producto");
formularioAgregarProducto.addEventListener("submit", (e) => {

    e.preventDefault();

    // Obtengo nombre y stock
    const inputNombreProducto = document.getElementById("nombre_producto");
    const inputStockProducto = document.getElementById("stock_producto");

    const nombreProducto = inputNombreProducto.value;
    const stockProducto = inputStockProducto.value;

    // Limpiar inputs
    inputNombreProducto.value = "";
    inputStockProducto.value = "";

    // Agrego producto al array y luego al localStorage
    productos.push({
        nombre: nombreProducto,
        stock: parseInt(stockProducto),
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    // Renderizar tabla
    renderizarTabla(productos);
});

// Renderizar los productos por primera vez
renderizarTabla(productos);