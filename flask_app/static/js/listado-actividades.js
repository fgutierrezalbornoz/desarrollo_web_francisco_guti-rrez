const actividades = [
    {
    "inicio": "2025-03-28 12:00",
    "termino": "2025-03-28 14:00",
    "comuna": "Santiago",
    "sector": "Beauchef 850, terraza",
    "tema": "Escuela de Boxeo",
    "nombreOrganizador": "CEI Uchile",
    "totalFotos": ["https://pbs.twimg.com/media/Fx4FcgVWAAEJXO6.jpg", 
                    "https://i.pinimg.com/564x/f8/39/54/f83954071bfbd9bf168f58c98e2a38b3.jpg"]
    },
    {
    "inicio": "2025-03-29 19:00",
    "termino": "2025-03-28 20:00",
    "comuna": "Ñuñoa",
    "sector": "Plaza",
    "tema": "Cómo deshidratar fruta",
    "nombreOrganizador": "I. Municipalidad de Ñuñoa",
    "totalFotos": ["https://img.freepik.com/vector-premium/dibujo-vectorial-chips-manzana-rodajas-secas-fruta-deshidratada-tentempie-manzana-comida-vegana-saludable-al-horno_687370-7.jpg"]
    },
    {
    "inicio": "2025-03-30 19:00",
    "termino": "-",
    "comuna": "Santiago",
    "sector": "Parque O'higgins",
    "tema": "Música urbana",
    "nombreOrganizador": "Ministerio de Cultura",
    "totalFotos": ["https://img.freepik.com/fotos-premium/perro-lindo-escuchando-musica-auriculares-usando-ropa-urbana-moda-gafas-sol_145713-16410.jpg", 
                    "https://i.pinimg.com/564x/77/87/ae/7787aec169a89f795c36148adca72bbf.jpg",
                    "https://comoeducarauncachorro.com/wp-content/uploads/1a1.jpg"]
    },
    {
    "inicio": "2025-03-28 12:00",
    "termino": "2025-03-30 21:00",
    "comuna": "La Reina",
    "sector": "Parque Alberto Hurtado",
    "tema": "Gastronomía",
    "nombreOrganizador": "Niam Chile",
    "totalFotos": [ "https://www.weare-family.com/mx/wp-content/uploads/sites/133/2021/11/cocinando-para-tu-perro-cocina.jpg",
                    "https://pbs.twimg.com/media/B_S2LLlW0AAcdd_.jpg",
                    "https://eq2imhfmrcc.exactdn.com/wp-content/uploads/2015/06/perro-comida.jpg?strip=all&lossy=1&ssl=1"]
    },
    {
    "inicio": "2024-12-01 12:00",
    "termino": "-",
    "comuna": "Santiago",
    "sector": "Alameda",
    "tema": "Desfile personajes Disney",
    "nombreOrganizador": "París - Cencosud",
    "totalFotos": ["https://www.corazon.cl/wp-content/uploads/2019/12/paris-parade-portada.jpg", 
                    "https://www.eldinamo.cl/wp-content/uploads/2024/10/16-123736_zsku_BeFunky-collage-53-880x500.jpg",
                    "https://static.wixstatic.com/media/a604ca_75db908403b84e7ba50114363a3e6f5c~mv2.jpg/v1/fill/w_568,h_340,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a604ca_75db908403b84e7ba50114363a3e6f5c~mv2.jpg",
                    "https://static.emol.cl/emol50/Fotos/2016/11/19/file_20161119114701.jpg"]
    }
];
const tablaActividades = document.querySelector("#listado-actividades tbody");
const guardaInfoActividad = (actividad) => {
    localStorage.setItem('actividad', JSON.stringify(actividad));
    window.location='../html/info-actividad.html';
}
const cargaTablaActividades = () => {
    for (let i = 0; i < actividades.length; i++) {
        const actividad = actividades[i];
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${actividad.inicio}</td>
            <td>${actividad.termino}</td>
            <td>${actividad.comuna}</td>
            <td>${actividad.sector}</td>
            <td>${actividad.tema}</td>
            <td>${actividad.nombreOrganizador}</td>
            <td>${actividad.totalFotos.length}</td>
        `;
        fila.addEventListener('click',() => guardaInfoActividad(actividad));
        tablaActividades.appendChild(fila);
    }
}
const seleccionaActividad = (id) => {
    window.location.href = `/activity/${id}`;
};
window.onload = () => {
    // cargaTablaActividades();
}