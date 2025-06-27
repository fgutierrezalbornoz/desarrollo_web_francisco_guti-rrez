let modal = document.getElementById("modalEvaluar");
let actividadIdActual = null;
let actividadActual = null;
let divActividad = document.getElementById("info-actividad")
let cancelBtn = document.getElementById("btnCancelar");
let evalBtn = document.getElementById("btnEvaluar");

async function abrirModal(object) {
    actividadIdActual = object.getAttribute('data-id');
    try{
        response = await fetch(`http://localhost:8080/activity/${actividadIdActual}`);
        if (response.ok) {
            actividadActual = await response.json();
            renderInfo(actividadActual);
            modal.showModal();
        } else {
            throw new Error("Error al consultar por una actividad");
        }
    } catch(error) {
        console.error("Error al consultar por una actividad: ", error.message);
    }
}

function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function renderInfo(actividad){
    divActividad.innerHTML = `
        <div class="info-container">
            <p id="id-actividad"><strong>ID:</strong>${escapeHtml(actividad.id.toString())}</p>
            <p><strong>Nombre:</strong> ${escapeHtml(actividad.nombre)}</p>
            <p><strong>Sector:</strong> ${escapeHtml(actividad.sector)}</p>
            <p><strong>Tema:</strong> 
                ${actividad.tema.tema != "otro" ?
                    escapeHtml(actividad.tema.tema) : 
                    escapeHtml(actividad.tema.tema + ' - ' + actividad.tema.glosaOtro)}</p>
            <p><strong>Descripción:</strong> ${escapeHtml(actividad.descripcion)}</p>
            <p><strong>Fecha de Inicio:</strong> 
                    ${new Date(escapeHtml(actividad.diaHoraInicio)).toLocaleString()}
            </p>
        </div>
    `;
    divActividad.style.color = "#10394e";

}

function isValid(){
    let valid = true;
    let form = document.getElementById("formEvaluar");
    const nota = document.getElementById("nota").value;
    const notaRegex = /^[1-7]$/;
    return notaRegex.test(nota);
}

cancelBtn.addEventListener("click", (event) => {
    document.getElementById("nota").value = "";
    modal.close();
})
function enviarEvaluacion(){
    const nota = document.getElementById("nota").value;
    let pID = document.getElementById('id-actividad').innerText;
    let actividadActualId = pID.split(':')[1];
    if(isValid()){
        fetch('/post-eval-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actividadId: actividadActualId,
                nota: nota
            })
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error al evaluar');
                }
            })
            .catch(error => {
                document.getElementById('msg').textContent = 'Error al enviar la evaluación';
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').style.color = 'red';
            });

    } else {
        msg = document.getElementById("msg");
        msg.style.display = "block";
        msg.innerHTML = "La nota debe un número entero entre 1 y 7";
        msg.style.color = "red";
    }
}
evalBtn.addEventListener("click", () => enviarEvaluacion())