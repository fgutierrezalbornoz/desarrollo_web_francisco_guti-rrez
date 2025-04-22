const formateaFechaLocal = (fecha) => {
    const anho = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${anho}-${mes}-${dia}T${horas}:${minutos}`;
};
window.addEventListener("DOMContentLoaded", () => {
    const ahora = new Date();
    const fechaLocal = formateaFechaLocal(ahora);
    document.getElementById("inicio").value = fechaLocal;
});
const seteaFechaTermino = () =>{
    const fechaInicial = new Date(document.getElementById("inicio").value);
    const fechaTermino = new Date(fechaInicial.getTime() + 3 * 60 * 60 * 1000);
    const terminoLocal = formateaFechaLocal(fechaTermino);
    document.getElementById("termino").value = terminoLocal;
}