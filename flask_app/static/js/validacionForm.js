// elementos 

const dialog = document.getElementById("dialog-confirmacion");
const btnConfirmar = document.getElementById("confirmar-envio");
const btnCancelar = document.getElementById("cancelar-envio");
const form = document.getElementById("form-actividad");
const dialogExito = document.getElementById("dialog-exito");
const btnExito = document.getElementById("btn-exito");
const btnAgregaFoto = document.getElementById("btn-agrega-foto");

// funciones auxiliares
function activaFoto(){
    let nroUltimaFoto = 1
    while (nroUltimaFoto <= 5) {
        let ultimaFoto = document.getElementById(`foto${nroUltimaFoto}-id`)
        if (ultimaFoto.style.display=="none"){
            ultimaFoto.style.display="block";
            break;
        }
        nroUltimaFoto+=1;
    } 
};

function revisaCheck(element){
    if (element.checked) {
      document.getElementById(element.name+'-id').style.display = "block";
    } else {
       document.getElementById(element.name+'-id').style.display = "none";
    }
};

function checkeaTema(){
    const element = document.getElementById("tema")

    if (element.value === 'otro'){
        document.getElementById("descripcion-tema").style.display = "block";
    } else{
        document.getElementById("descripcion-tema").style.display = "none";
    }
};


// funciones para validar
const validaSector = (sector) => {
    if(!sector) return true;
    let lengthValid = sector.trim().length >= 4 && sector.trim().length <= 100;
    
    return lengthValid;
}
const validaNombre = (name) => {
    if(!name) return false;
    let lengthValid = name.trim().length >= 4 && name.trim().length <= 200;
    return lengthValid;
}
  
const validaEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length > 15 && email.length <= 100;
  
    // validamos el formato
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = re.test(email);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
};
  
const validaTelefono = (phoneNumber) => {
    if (!phoneNumber) return true;
    // validación de longitud
    let lengthValid = phoneNumber.length >= 8;
  
    // validación de formato
    let re = /^\+\d{3}\.\d{8}$/;
    let formatValid = re.test(phoneNumber);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
};

const validaFotos = () => {
    const fotos = [...document.getElementsByClassName("foto")].filter((foto) => (foto.value));
    let lengthValid = 1 <= fotos.length && fotos.length <= 5;
  
    // validación del tipo de archivo
    let typeValid = true;
  
    for (const foto of fotos) {
      // el tipo de archivo debe ser "image/<foo>"
      let fileFamily = foto.files[0].type.split("/")[0];
      typeValid &&= fileFamily == "image";
    }
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && typeValid;
};

const validaRegion = (region) =>{
    if (!region) return false;
    return true;
};
const validaComuna = (comuna) =>{
    if (!comuna) return false;
    return true;
};

const validaFecha = (inicio, termino) =>{
    if (!inicio) return false;
    const re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    let formatValidInicio = re.test(inicio);
    if (!termino && formatValidInicio) return true;
    let formatValidTermino = re.test(termino);
    if (!formatValidInicio || !formatValidTermino) return false;
    if (termino<inicio) return false;
    return true;
};

const validaTema = (tema) => {
    if (!tema) return false;
    if (tema==='otra'){
        const descripcion = document.getElementById("descripcion-tema").value;
        let lengthValid = 3 <= descripcion.trim().length && descripcion.trim().length <= 15;
        return lengthValid;
    }
    return true;
};

const validaContacto = () => {
    const opcionesCheck = [...document.getElementsByClassName("opciones-contacto")].filter((opcion) => opcion.checked)
    if (opcionesCheck.length > 5) return false;
    for (const opcion of opcionesCheck){
        let valorOpcion = document.getElementById(opcion.name+"-id").value;
        let lengthValid = valorOpcion.trim().length>=4 && valorOpcion.trim().length<=50;
        if (!lengthValid) return false;
    }
    return true;
};
const validateForm = () => {
    // obtener elementos del DOM usando el nombre del formulario.
    let formActividad = document.forms["form-actividad"];
    let region = formActividad["region"].value
    let comuna = formActividad["comuna"].value
    let sector = formActividad["sector"].value
    let nombreOrg = formActividad["nombre"].value
    let email = formActividad["email"].value;
    let celular = formActividad["celular"].value;
    let fechaInicio = formActividad["fechaInicio"].value;
    let fechaTermino = formActividad["fechaTermino"].value;
    let tema = formActividad["tema"].value;

  
    // variables auxiliares de validación y función.
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
      invalidInputs.push(inputName);
      isValid &&= false;
    };
  
    // lógica de validación
    if (!validaRegion(region)) {
      setInvalidInput("Region");
    }
    if (!validaComuna(comuna)) {
        setInvalidInput("Comuna");
    }
    if (!validaSector(sector)) {
        setInvalidInput("Sector");
    }
    if (!validaNombre(nombreOrg)) {
        setInvalidInput("Nombre");
    }
    if (!validaEmail(email)) {
      setInvalidInput("Email");
    }
    if (!validaTelefono(celular)) {
      setInvalidInput("Nro Celular");
    }
    if (!validaContacto()) {
        setInvalidInput("Contacto");
      }
    if (!validaFecha(fechaInicio, fechaTermino)) {
        setInvalidInput("Día-hora");
    }
    if (!validaTema(tema)) {
        setInvalidInput("Tema");
    }
    if (!validaFotos()) {
        setInvalidInput("Fotos");
    }
    // finalmente mostrar la validación
    let validationBox = document.getElementById("val-box");
    let validationMessageElem = document.getElementById("val-msg");
    let validationListElem = document.getElementById("val-list");
    let formContainer = document.querySelector(".main-container");
  
    if (!isValid) {
      validationListElem.textContent = "";
      // agregar elementos inválidos al elemento val-list.
      for (input of invalidInputs) {
        let listElement = document.createElement("li");
        listElement.innerText = input;
        validationListElem.append(listElement);
      }
      // establecer val-msg
      validationMessageElem.innerText = "Los siguientes campos son inválidos:";
  
      // aplicar estilos de error
      validationBox.style.backgroundColor = "#ffdddd";
      validationBox.style.borderLeftColor = "#f44336";
  
      // hacer visible el mensaje de validación
      validationBox.hidden = false;
    } else {
        dialog.showModal();
    }
  };
  
  
let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);

btnConfirmar.addEventListener("click", () => {
    dialog.close();
    dialogExito.showModal();
});

btnCancelar.addEventListener("click", () => {
    dialog.close();
});

btnExito.addEventListener("click", () => {
    dialogExito.close();
    console.log(form)
    form.submit();
    //window.location.href = "index.html";
});