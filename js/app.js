//constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
    /**
     * 1 = Americano 1.15
     * 2 = Asiatico  1.05
     * 3 = Europeo 1.35
     */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer el a�o
    const diferencia = new Date().getFullYear() - this.year;
    //cada a�o que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        si el seguro es basico se multiplica por un 30% mas
        si el seguro es completo se multiplica por un 50% mas
     */

    if (this.tipo === "basico") {
        cantidad *= 1.30;
    } else if (this.tipo === "completo") {
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI() { }

//llena las opciones de los a�os
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');
    for (let i = max; i >= min; i--) {
        const yearOption = document.createElement('option');
        yearOption.textContent = i;
        yearOption.value = i;
        selectYear.appendChild(yearOption);
    }
}

//muestra alertas en pantalla
UI.prototype.showAlerts = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === "error") {
        div.classList.add('error')

    } else {
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    //limpiar result
    limpiarResultHTML();

    const { marca, year, tipo } = seguro;
    let nombreMarca;

    switch (marca) {
        case '1':
            nombreMarca = 'Americano';
            break;
        case '2':
            nombreMarca = 'Asiatico';
            break;
        case '3':
            nombreMarca = 'Europeo';
            break;
        default:
            break;
    }

    //crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen </p>
        <p class="font-bold">Marca <span class="font-normal">${nombreMarca} </span></p>
        <p class="font-bold">A&ntilde;o <span class="font-normal">${year} </span></p>
        <p class="font-bold">Tipo <span class="font-normal capitalize">${tipo} </span></p>
        <p class="font-bold">Total <span class="font-normal">$${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    //cargar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none" //se borra el spinner
        resultadoDiv.appendChild(div); //se muestra el resultado
    }, 3000);
}

const limpiarResultHTML = function () {
    const resultadoDiv = document.querySelector('#resultado');
    while (resultadoDiv.firstChild) {
        resultadoDiv.firstChild.remove();
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    //leer la marca
    const marca = document.querySelector('#marca').value;

    //leer el a�o
    const year = document.querySelector('#year').value;

    //leer el tipo de cobertura
    const tipoCobertura = document.querySelector('input[name="tipo"]:checked').value;

    if (marca == "" || year == "" || tipoCobertura == "") {
        ui.showAlerts('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.showAlerts('Cotizando...', 'exito');

    //ocultar las cotizaciones previas

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipoCobertura);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);
}