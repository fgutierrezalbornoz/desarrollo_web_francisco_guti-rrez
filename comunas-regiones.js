const regionComunas = [
  { "id": 15, "nombreRegion": "Arica y Parinacota", "nombreComuna": ["Arica", "Camarones", "Putre", "General Lagos"] },
  { "id": 1, "nombreRegion": "Tarapacá", "nombreComuna": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
  { "id": 2, "nombreRegion": "Antofagasta", "nombreComuna": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
  { "id": 3, "nombreRegion": "Atacama", "nombreComuna": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
  { "id": 4, "nombreRegion": "Coquimbo", "nombreComuna": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
  { "id": 5, "nombreRegion": "Valparaíso", "nombreComuna": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar"] },
  { "id": 6, "nombreRegion": "Libertador General Bernardo O'Higgins", "nombreComuna": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
  { "id": 7, "nombreRegion": "Maule", "nombreComuna": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
  { "id": 16, "nombreRegion": "Ñuble", "nombreComuna": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
  { "id": 8, "nombreRegion": "Biobío", "nombreComuna": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Arauco", "Cañete", "Contulmo", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"] },
  { "id": 9, "nombreRegion": "La Araucanía", "nombreComuna": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
  { "id": 14, "nombreRegion": "Los Ríos", "nombreComuna": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
  { "id": 10, "nombreRegion": "Los Lagos", "nombreComuna": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"] },
  { "id": 11, "nombreRegion": "Aysén del General Carlos Ibáñez del Campo", "nombreComuna": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Río Ibáñez", "Chile Chico", "Cochrane", "O’Higgins", "Tortel"] },
  { "id": 12, "nombreRegion": "Magallanes y de la Antártica Chilena", "nombreComuna": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"] },
  { "id": 13, "nombreRegion": "Metropolitana de Santiago", "nombreComuna": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] }
  ]
  

const regionSelect = document.getElementById("region-select");
const cargaRegiones = () => {
  regionComunas.forEach(region => {
      let option = document.createElement("option");
      option.value = region.id;
      option.textContent = region.nombreRegion;
      regionSelect.appendChild(option);
  });
}


const filtraComunas = () =>{
  const comunaSelect = document.getElementById("comuna-select");
  comunaSelect.innerHTML = '<option value="">--Escoge una comuna--</option>';
  if (regionSelect.value){
    const comunasRegionSelect = regionComunas.find(r => r.id.toString() === regionSelect.value)["nombreComuna"];
    comunasRegionSelect.forEach(comuna => {
      let optionComuna = document.createElement("option");
      optionComuna.value = comuna;
      optionComuna.textContent = comuna;
      comunaSelect.appendChild(optionComuna);
    })
  }
  
}

window.onload = () => {
  cargaRegiones();
};