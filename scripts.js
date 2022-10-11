function existeClienteConDNI (dni) {

    let encontrado = false;

    for(const cliente of listaClientes) {

        if(cliente.dni === dni) {
            encontrado = true;
        }
    }

    return encontrado;
}

function clienteTieneSaldo (dniCliente, monto) {

    let clienteEncontrado = buscarClientePorDNI(dniCliente);

    return (parseInt(clienteEncontrado.saldo) >= parseInt(monto));
}

function buscarClientePorDNI (dni) {

    let clienteEncontrado;

    for(let i = 0; i < listaClientes.length; i++) {

        if(listaClientes[i].dni === dni) {
            clienteEncontrado = listaClientes[i];
            break;
        }

    }

    return clienteEncontrado;
}

class Cliente {

    constructor (nombre, dni, saldo) {
        this.nombre = nombre;
        this.dni = dni;
        this.saldo = saldo;
    }

    descontarSaldo (saldo) {
        this.saldo = this.saldo - saldo;
    }

    sumarSaldo (saldo) {
        this.saldo = this.saldo + saldo;
    }
}

const listaClientes = [];

listaClientes.push(new Cliente("Mateo", "1122", 5000));
listaClientes.push(new Cliente("Juan", "2233", 8000));
listaClientes.push(new Cliente("Gonzalo", "4455", 9000));

// Ingreso DNI de la persona DESDE la que quiero transferir
let dniDesde = prompt("Ingrese el DNI de la persona desde la cual quiere transferir");

while(!existeClienteConDNI(dniDesde)) {
    dniDesde = prompt("DNI no encontrado, ingreselo nuevamente");
}

// Ingeso DNI de la persona a la cual quiero transferirle

let dniHasta = prompt("Ingrese el DNI de la persona a la cual quiere transferir");

while(!existeClienteConDNI(dniHasta)) {
    dniHasta = prompt("DNI no encontrado, ingreselo nuevamente");
}

// Monto que quiero transferir

let montoATransferir = parseInt(prompt("Ingrese el monto a transferir"));

while(montoATransferir <= 0 || !clienteTieneSaldo(dniDesde, montoATransferir)) {
    montoATransferir = parseInt(prompt("Monto inválido, vuelva a ingresarlo"));
}

// Descontar y acreditar saldo de los clientes

const clienteDesde = buscarClientePorDNI(dniDesde);
const clienteHasta = buscarClientePorDNI(dniHasta);

clienteDesde.descontarSaldo(montoATransferir);
clienteHasta.sumarSaldo(montoATransferir);

alert("Se transfirió " + montoATransferir);
alert(dniHasta + " recibió una transferencia de " + montoATransferir);

console.log(clienteDesde);
console.log(clienteHasta);

console.log(listaClientes);