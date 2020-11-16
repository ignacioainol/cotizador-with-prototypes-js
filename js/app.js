//constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() { }

//llena las opciones de los años
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

    //leer el año
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
    console.log(seguro);
}