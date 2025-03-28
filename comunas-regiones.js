const regiones = [
  { "id": 15, "nombre": "Arica y Parinacota" },
  { "id": 1, "nombre": "Tarapacá" },
  { "id": 2, "nombre": "Antofagasta" },
  { "id": 3, "nombre": "Atacama" },
  { "id": 4, "nombre": "Coquimbo" },
  { "id": 5, "nombre": "Valparaíso" },
  { "id": 13, "nombre": "Metropolitana de Santiago" },
  { "id": 6, "nombre": "Libertador General Bernardo O'Higgins" },
  { "id": 7, "nombre": "Maule" },
  { "id": 16, "nombre": "Ñuble" },
  { "id": 8, "nombre": "Biobío" },
  { "id": 9, "nombre": "La Araucanía" },
  { "id": 14, "nombre": "Los Ríos" },
  { "id": 10, "nombre": "Los Lagos" },
  { "id": 11, "nombre": "Aysén del General Carlos Ibáñez del Campo" },
  { "id": 12, "nombre": "Magallanes y de la Antártica Chilena" }
];
const comunas = [
  { "id": 15, "nombre-comunas": ["Arica", "Camarones", "Putre", "General Lagos"] },
  { "id": 1, "nombre-comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"] },
  { "id": 2, "nombre-comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"] },
  { "id": 3, "nombre-comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"] },
  { "id": 4, "nombre-comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"] },
  { "id": 5, "nombre-comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "La Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"] },
  { "id": 13, "nombre-comunas": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"] },
  { "id": 6, "nombre-comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"] },
  { "id": 7, "nombre-comunas": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"] },
  { "id": 16, "nombre-comunas": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"] },
  { "id": 8, "nombre-comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Arauco", "Cañete", "Contulmo", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"] },
  { "id": 9, "nombre-comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"] },
  { "id": 14, "nombre-comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"] },
  { "id": 10, "nombre-comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"] }
];

const regionSelect = document.getElementById("region-select");
regiones.forEach(region => {
    let option = document.createElement("option");
    option.value = region.id;
    option.textContent = region.nombre;
    regionSelect.appendChild(option);
});

const filtraComunas = () =>{
  const comunaSelect = document.getElementById("comuna-select");
  comunaSelect.innerHTML = '<option value="">--Escoge una comuna--</option>';
  if (regionSelect.value){
    const comunasRegionSelect = comunas.find(r => r.id.toString() === regionSelect.value)["nombre-comunas"];
    comunasRegionSelect.forEach(comuna => {
      let optionComuna = document.createElement("option");
      optionComuna.value = comuna;
      optionComuna.textContent = comuna;
      comunaSelect.appendChild(optionComuna);
    })
  }
  
}
