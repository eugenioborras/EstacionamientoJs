let container = document.getElementById("contenedorMensuales");
fetch("../db/data.json")
.then(response => response.json())
.then(data => {
    data.forEach(mensual => {
        const lista = document.createElement("div");
        lista.innerHTML = `<h2 class="border-bottom text-center">Nombre y Apellido: ${mensual.nombre}</h2>
                          <h3 class="border-bottom text-center">Patente: ${mensual.patente}</h3>
                          <h4 class="border-bottom text-center">Clase: ${mensual.clase}</h4>
                          <h5 class="border-bottom text-center">Telefono: ${mensual.tel}</h5>
                          <h5 class="border-bottom text-center">Ultimo Mes Pago: ${mensual.mesPago}</h5>`; 
        container.appendChild(lista);
    });
});

const listaMensuales = JSON.parse(localStorage.getItem("listaMensuales")) || [];

let nombre = document.getElementById("nombre");
let patente = document.getElementById("patente");
let clase = document.getElementById("clase");
let telefono = document.getElementById("telefono");
let cargaMensual = document.getElementById("btnMensual");
let mesPagado = document.getElementById("mesPagado")
let nombrePago = document.getElementById("nombrePago")
let cargaPago = document.getElementById("cargaPago")

class Mensual {
    constructor(nombre, patente, clase, telefono,mesPagado) {

        this.nombre = nombre;
        this.patente = patente;
        this.clase = clase;
        this.telefono = telefono;
        this.mesPagado = mesPagado;
    }
}

function imprimirMensuales() {
    
    const contenedor = document.getElementById("contenedorStorage");
    contenedor.innerHTML = "";

    for (const mensual of listaMensuales) {
        const listaS = document.createElement("div");
        listaS.innerHTML = `<h2 class="border-bottom text-center">Nombre y Apellido: ${mensual.nombre}</h2>
                            <h3 class="border-bottom text-center">Patente: ${mensual.patente}</h3>
                            <h4 class="border-bottom text-center">Clase: ${mensual.clase}</h4>
                            <h5 class="border-bottom text-center">Telefono: ${mensual.telefono}</h5>
                            <h5 class="border-bottom text-center">Ultimo Mes Pago: ${mensual.mesPagado}</h5>`; 
        contenedor.appendChild(listaS);
    }
}

cargaMensual.onclick = () => {
    const mensualE = new Mensual(nombre.value, patente.value, clase.value, telefono.value, mesPagado.value);

    listaMensuales.push(mensualE); 
    localStorage.setItem("listaMensuales", JSON.stringify(listaMensuales));
    
    imprimirMensuales(); 

    nombre.value = "";
    patente.value = "";
    clase.value = "";
    telefono.value = "";
};

cargaPago.onclick = () => {
    const nombreUsuario = nombrePago.value;  
    const nuevoMes = mesPagado.value;  


    if (nombreUsuario && nuevoMes) {
        const mensualEncontrado = listaMensuales.find(mensual => mensual.nombre === nombreUsuario);
        if (mensualEncontrado) {
           
            mensualEncontrado.mesPagado = nuevoMes;
            localStorage.setItem("listaMensuales", JSON.stringify(listaMensuales));
            imprimirMensuales();
            Toastify({
                text: "Pago Cargado",
                className: "info",
                style: {
                  background: " #000000",
                  color: "#fffb00",
                }
              }).showToast();
            
            nombrePago.value = "";
            mesPagado.value = "";
        } else {

            swal("Mensual no encontrado!", "Por Favor cargue el mensual o vuelva a intentarlo", "warning");
            nombrePago.value = "";
            mesPagado.value = "";
        }
    } else {

        swal("Por favor rellene todos los campos!", "Vuelva a intentarlo", "warning");
    }
};

window.onload = () => {
    imprimirMensuales(); 
};

