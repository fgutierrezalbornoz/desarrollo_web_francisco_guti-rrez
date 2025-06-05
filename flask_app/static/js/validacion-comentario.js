const form = document.getElementById("form-comentario");


const validaNombreComentario = (nombre) => {
    if(!nombre) return false;
    let lengthValid = nombre.trim().length >= 3 && nombre.trim().length <= 80;
    return lengthValid;
}
const validaComentario = (comentario) => {
    if(!comentario) return false;
    return comentario.trim().length >= 5;
}
const validateCommentForm = () => {
    console.log("comienza a validar")
    let formComentario = document.forms["form-comentario"];
    let nombre = formComentario["nombre"].value
    let comentario = formComentario["comentario"].value
    let invalidInputs = [];
    let isValid = true;
    const setInvalidInput = (inputName) => {
      invalidInputs.push(inputName);
      isValid &&= false;
    };
    if (!validaNombreComentario(nombre)) {
      setInvalidInput("Nombre");
    }
    if (!validaNombreComentario(comentario)) {
      setInvalidInput("Comentario");
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
        form.submit();
    }
}

let submitBtn = document.getElementById("submit-comment-btn");
submitBtn.addEventListener("click", validateCommentForm);