const cargaInfo = () => {
    const actividad = JSON.parse(localStorage.getItem('actividad'));

    document.getElementById('info-inicio').innerText = actividad.inicio;
    document.getElementById('info-termino').innerText = actividad.termino;
    document.getElementById('info-comuna').innerText = actividad.comuna;
    document.getElementById('info-sector').innerText = actividad.sector;
    document.getElementById('info-tema').innerText = actividad.tema;
    document.getElementById('info-organizador').innerText = actividad.nombreOrganizador;
    document.getElementById('info-fotos').innerHTML = actividad.totalFotos.map(foto => 
            ` <div id="informacion-fotos">
                <img id="foto-${foto.src}" src="${foto}" height=240 width=320 onclick="cambiaDimensionFoto(this)">
            </div>`).join('');
    localStorage.removeItem("actividad");
}


const dialogFoto= document.getElementById("dialog-foto");
const foto = document.getElementById("foto-en-dialog");
const btnCierraFoto = document.getElementById("btn-dialog-foto")
function cambiaDimensionFoto(fotoMostrada) {
    dialogFoto.showModal();
    foto.src = fotoMostrada.src;
}
const cierraFoto = () => {
    foto.src = "";
    dialogFoto.close();
}
btnCierraFoto.addEventListener("click", cierraFoto);
window.onload = () => {
    // cargaInfo();
};