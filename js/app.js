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
    console.log(cantidad);
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

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipoCobertura);
    seguro.cotizarSeguro();
}