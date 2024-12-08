let listaVehiculos = JSON.parse(localStorage.getItem("vehiculosEnPlaya")) || [];
let listaDiaria = JSON.parse(localStorage.getItem("vehiculosDiarios")) || [];
let patente = document.getElementById("pat");
let patenteSale = document.getElementById("patenteSale");
let clase = document.getElementById("claseV");
let entra = document.getElementById("btnEntra");
let sale = document.getElementById("btnSale");
let claseSale = document.getElementById("claseS");
let deleteEnPlaya = document.getElementById("btnEliminar")
let deleteListaDiaria = document.getElementById("btnEliminarDiarios")

class Vehiculo {
    constructor(patente, clase) {
        this.patente = patente;
        this.clase = clase;
    }
}   

function imprimirVehiculos() {
    const contenedor = document.getElementById("conteinerVehiculos");
    const contenedorDiario = document.getElementById("conteinerDiario");
    
    contenedor.innerHTML = "";
    contenedorDiario.innerHTML = "";

    for (const vehiculo of listaVehiculos) {
        const lista = document.createElement("div");
        lista.innerHTML = `
            <h3 class="text-center border">${vehiculo.patente}</h3>
            <p class="text-center border">${vehiculo.clase}</p>
        `;
        contenedor.appendChild(lista);
    }

    for (const vehiculo of listaDiaria) {
        const lista = document.createElement("div");
        lista.innerHTML = `
            <h3 class="text-center border">${vehiculo.patente}</h3>
            <p class="text-center border">${vehiculo.clase}</p>
        `;
        contenedorDiario.appendChild(lista);
    }
    localStorage.setItem("vehiculosEnPlaya", JSON.stringify(listaVehiculos))
    localStorage.setItem("vehiculosDiarios", JSON.stringify(listaDiaria))
    
}

function eliminarVehiculo(patente, clase) {
    const index = listaVehiculos.findIndex(vehiculo => vehiculo.patente === patente && vehiculo.clase === clase);
    const existe = listaVehiculos.some(vehiculo => vehiculo.patente === patente && vehiculo.clase === clase)

    if (index !== -1) {
        listaVehiculos.splice(index, 1);
        Toastify({
            text: "Vehiculo Eliminado",
            className: "info",
            style: {
              background: " #000000",
              color: "#fffb00",
            }
          }).showToast();
    }
if (existe !== true){
    swal("Vehiculo no encontrado", "Vuelva a intentarlo", "warning");
}
    imprimirVehiculos();
}

function comprobarVehiculoRepetido(patente, clase) {
    return listaVehiculos.some(vehiculo => vehiculo.patente === patente && vehiculo.clase === clase);
}


function actualizarBotonEntra() {
    const esRepetido = comprobarVehiculoRepetido(patente.value, clase.value);
    let msj = ""
    try{
    if (esRepetido) {
        entra.disabled = true;
        patente.value = "";
        throw new Error (swal("¡Vehiculo Repetido!", {
            icon: "warning",
            buttons: false,
            timer: 1000,
          }))

    } else {
        entra.disabled = false;
    }
} catch(err){
    msj = err
}
}

patente.addEventListener("input", actualizarBotonEntra);
clase.addEventListener("input", actualizarBotonEntra);

entra.onclick = () => {
    const vehiculo = new Vehiculo(patente.value, clase.value);
    if(patente.value){
    listaVehiculos.push(vehiculo);

    listaDiaria.push(vehiculo);

    imprimirVehiculos();
    Toastify({
        text: "Vehiculo Ingresado",
        className: "info",
        style: {
          background: " #000000",
          color: "#fffb00",
        }
      }).showToast();
      patente.value = "";
    }else{
        swal("Por favor rellene todos los campos!", "Vuelva a intentarlo", "warning");
    }

}

sale.onclick = () => {
    const patenteAEliminar = patenteSale.value;
    const claseAEliminar = claseSale.value;
if(patenteAEliminar){
    eliminarVehiculo(patenteAEliminar, claseAEliminar);
    patente.value = ""
    patenteSale.value=""

    }else{
        swal("Por favor rellene todos los campos!", "Vuelva a intentarlo", "warning");
    }

}

deleteEnPlaya.onclick =() => {
    localStorage.removeItem("vehiculos")
    listaVehiculos = []
    imprimirVehiculos()
}

deleteListaDiaria.onclick =() => {
    localStorage.removeItem("vehiculosDiarios")
    listaVehiculos = []
    listaDiaria = []
    imprimirVehiculos()
}

document.addEventListener('DOMContentLoaded', () => {
    imprimirVehiculos();  
});
