function siguienteFormulario(currentFormIndex) {
    document.getElementById(`form-${currentFormIndex}`).style.display = 'none';
    document.getElementById(`form-${currentFormIndex + 1}`).style.display = 'flex';
}

function finalizarRegistro() {
    document.getElementById('form-4').style.display = 'none';
    document.getElementById("form-1").style.display = 'flex';
    alert('Registro exitoso');
}

const phoneRegex = /^\d{7,10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const cityRegex = /^[a-zA-Z\s]+$/;
const stateRegex = /^[a-zA-Z\s]+$/;
const postalCodeRegex = /^\d{5}$/;

document.addEventListener("DOMContentLoaded", () => {
    // Se crea un array de forms para cada posteriormente iterarlos
    const forms = [
        { form: document.getElementById('form-1'), button: document.getElementById('button-1') },
        { form: document.getElementById('form-2'), button: document.getElementById('button-2') },
        { form: document.getElementById('form-3'), button: document.getElementById('button-3') },
        { form: document.getElementById('form-4'), button: document.getElementById('button-4') }
    ];

    // Función de validación para cada tipo de input de todos los formularios
    function validacionFormularios(form, indiceFormulario) {
        const formElements = Array.from(form.elements);
        let next = true;

        for (const element of formElements) {     
            if ((element.type === 'text' || element.tagName.toLowerCase() === 'textarea') && element.value === "") {
                alert(`El campo "${element.placeholder}" está vacío.`);
                element.focus();
                next = false;
                break;
            }
            if ((element.type === 'text' || element.tagName.toLowerCase() === 'textarea')) {
                if (element.name === "telefono" && !phoneRegex.test(element.value)) {
                    alert("Por favor ingrese un número de teléfono válido (7-10 dígitos).");
                    element.focus();
                    next = false;
                    break;
                }
                if (element.name === "email" && !emailRegex.test(element.value)) {
                    alert("Por favor ingrese un correo electrónico válido.");
                    element.focus();
                    next = false;
                    break;
                }
                if (element.name === "direccion" && !addressRegex.test(element.value)) {
                    alert("Por favor ingrese una dirección válida.");
                    element.focus();
                    next = false;
                    break;
                }
                if (element.name === "ciudad" && !cityRegex.test(element.value)) {
                    alert("Por favor ingrese una ciudad válida.");
                    element.focus();
                    next = false;
                    break;
                }
                if (element.name === "estado" && !stateRegex.test(element.value)) {
                    alert("Por favor ingrese un estado válido.");
                    element.focus();
                    next = false;
                    break;
                }
                if (element.name === "codigoPostal" && !postalCodeRegex.test(element.value)) {
                    alert("Por favor ingrese un código postal válido de 5 dígitos.");
                    element.focus();
                    next = false;
                    break;
                }
            }

            if (element.type === 'date' && element.value === "") {
                alert(`El campo "${element.placeholder}" está vacío.`);
                element.focus();
                next = false;
                break;
            }
            if (element.type === 'checkbox' && !element.checked) {
                alert(`Por favor marca el campo "${element.name}".`);
                element.focus();
                next = false;
                break;
            }
            if (element.tagName.toLowerCase() === 'select' && element.value === "") {
                alert(`Por favor selecciona una opción para "${element.placeholder}".`);
                element.focus();
                next = false;
                break;
            }
        }
        // Si todo está correcto, muestra el siguiente formulario y en el caso de que se complete el cuarto vuelva a mostrar el primero
        if (next) {
            if (indiceFormulario === 4) {
                finalizarRegistro(); 
            } else {
                siguienteFormulario(indiceFormulario); 
            }
        }
    }
    // Asignamos el evento de clic a cada botón, llamando a la función de validación
    forms.forEach((item, index) => {
        item.button.addEventListener("click", (e) => {
            e.preventDefault();
            validacionFormularios(item.form, index + 1); 
        });
    });
});