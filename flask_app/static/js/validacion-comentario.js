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
const validateCommentForm = async () => {
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
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                form.reset();
                cargarComentarios();
            }
        } catch (error) {
            validationBox.hidden = false;
            validationBox.style.backgroundColor = "#ffdddd";
            validationBox.style.borderLeftColor = "#f44336";
            validationMessageElem.innerText = "Error de red.";
            validationListElem.textContent = "";
            console.error("Error al conectar con el servidor: ", error)
        }
    }
}

let submitBtn = document.getElementById("submit-comment-btn");
submitBtn.addEventListener("click", validateCommentForm);

async function cargarComentarios() {
    const match = window.location.pathname.match(/\/activity\/(\d+)/);
    if (!match) return;
    const actividadId = match[1];

    const container = document.querySelector('.comentario-container');
    container.innerHTML = "Cargando comentarios...";

    try {
        const resp = await fetch(`/get-comments/${actividadId}`);
        const comentarios = await resp.json();
        if (comentarios.length === 0) {
            container.innerHTML = "<p>No hay comentarios aún.</p>";
            return;
        }
        container.innerHTML = "";
        comentarios.forEach(c => {
            const div = document.createElement('div');
            div.className = "comentario";
            fechaLocal = new Date(c.fecha).toLocaleString("es-CL", {
                dateStyle: "short",
                timeStyle: "short"
            });
            div.innerHTML = `${fechaLocal} </br> <strong>${c.nombre}</strong>: ${c.comentario} <hr>`;
            container.appendChild(div);
        });
    } catch (e) {
        container.innerHTML = "<p>Error al cargar comentarios.</p>";
    }
}


window.addEventListener('DOMContentLoaded', cargarComentarios);