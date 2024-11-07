function finalizarRegistro() {
    alert('Registro exitoso');
}

const regexValidations = {
    telefono: /^\d{7,10}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    direccion: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    ciudad: /^[a-zA-Z\s]+$/,
    estado: /^[a-zA-Z\s]+$/,
    codigoPostal: /^\d{5}$/
};

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('button-4');

    
    button.addEventListener('click', () => {
        const forms = [
            { form: document.getElementById('form-1')},
            { form: document.getElementById('form-2')},
            { form: document.getElementById('form-3')},
            { form: document.getElementById('form-4')}
        ];
    
        const formElements = forms.flatMap(f => Array.from(f.form.elements));
        const isValid = true;
        // alert("Hola hdp" + formElements)
        for (const element of formElements) {
            if (element.value.trim() === "" && (element.type === 'text' || element.tagName.toLowerCase() === 'textarea' || element.type === 'date' || element.tagName.toLowerCase() === 'select')) {
                alert(`El campo "${element.placeholder}" está vacío.`);
                element.focus();
                isValid = false;
                break;
            }

            if (element.type === 'checkbox' && !element.checked) {
                alert(`Por favor marca el campo "${element.name}".`);
                element.focus();
                isValid = false;
                break;
            }

            if (element.name in regexValidations && !regexValidations[element.name].test(element.value)) {
                alert(`Por favor ingresa un valor válido para "${element.placeholder}".`);
                element.focus();
                isValid = false;
                break;
            }
        }

        if (isValid) {
            finalizarRegistro(); 
        }      
    })  
});
