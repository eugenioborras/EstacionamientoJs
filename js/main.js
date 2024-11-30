const listaVehiculos = [];  
const listaDiaria = [];  
let patente = document.getElementById("pat");
let patenteSale = document.getElementById("patenteSale");
let clase = document.getElementById("claseV");
let entra = document.getElementById("btnEntra");
let sale = document.getElementById("btnSale");
let claseSale = document.getElementById("claseS");

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
    sessionStorage.setItem("vehiculosDiarios", JSON.stringify(listaDiaria))
    
}

function eliminarVehiculo(patente, clase) {
    const index = listaVehiculos.findIndex(vehiculo => vehiculo.patente === patente && vehiculo.clase === clase);

    if (index !== -1) {
        listaVehiculos.splice(index, 1);
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
}


sale.onclick = () => {
    const patenteAEliminar = patenteSale.value;
    const claseAEliminar = claseSale.value;

    eliminarVehiculo(patenteAEliminar, claseAEliminar);
    Toastify({
        text: "Vehiculo Eliminado",
        className: "info",
        style: {
          background: " #000000",
          color: "#fffb00",
        }
      }).showToast();
}

