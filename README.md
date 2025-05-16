# desarrollo_web_francisco_guti-rrez

## Tarea 2
Esta tarea consiste en desarrollar el servidor que responde a las peticiones realizadas por la aplicación desarrollada en la tarea 1. Los archivos fueron reubicados en la carpeta `flask_app`, la cual contiene 4 subdirectorios:
- database: Aquí se encuentran los archivos que definen la estructura de la base de datos (modelos relacionales) y los scripts con los cuales se configura la base de datos (`db.py`), se definen los modelos (`models.py`) y que se realizan querys (`db_access.py`) desde el controller del servidor.
  
- static: Aquí se encuentran los directorios css, js e img de la tarea 1. Se agrega el directorio uploads donde se almacenan los archivos entregados vía el formulario para agregar una actividad, los nombres asignados se realizan usando hashing siguiendo las buenas prácticas vistas en clases.

- templates: Mismo directorio de la tarea 1. Los archivos html, tienen secciones con código jinja para mostrar en el lado del cliente los datos enviados desde el servidor.

- utils: Contiene dos scripts. `utils.py` script en el que se definen funciones utilizadas para mantener un código más legible y `validations.py` script en el que se definen funciones para validar del lado del servidor la data recibida desde el cliente.

### Observaciones

- Inicialmente no se muestran actividades ya que lo único que está mostrado de forma estática es la sección estadísticas.
  
- Es necesario ejecutar el código sql contenido en (`/flask_app/database/`): `create_user.sql` (crea y le da los privilegios necesarios al usuario cc5002), `tarea2.sql` y `region-comuna.sql` (en ese orden). 

- El archivo js que se encargaba de los datos del formulario y manipular las ventanas con mensajes de confirmación hace submit del formulario y esta solicitud es manejada por el endpoint /post-activity. 

- Las regiones y comunas siguen siendo consultadas desde un archivo .js y no desde la base de datos, ya que no fue detallado en el enunciado de la tarea.

- Habían unas discordancia con el nombre de las variables definidas en la tarea 1 y la base de datos entrega (por ejemplo, contactar_por y actividad_tema) y el case. Decidí seguir lo definido en las bases de datos.

---

## Tarea 1
Esta es la tarea 1 del curso desarrollo de aplicaciones web del DCC Uchile semestre otoño 2025. 
Consiste en elaborar una aplicación web utilizando html, css y js. Los archivos están organizados por carpeta según nombre de extensión y el archivo raíz de la aplicación es `index.html`.
Los gráficos utilizados en la sección de estadísticas se encuentran contenidos en `estadisticas.ipynb` y almacenados en archivos .png en la carpeta `/Graficos`.

Para mostrar la confirmación del formulario y la imagen agrandada se usaron modales (dialog en html) solo para intentar implementar algo diferente a lo visto en auxiliares. 
Solo el formulario se implementó con ancho absoluto para evitar pérdida de las posiciones relativas entre elementos al modificar el tamaño de la ventana (solo por simplicidad).

En el estilado, los colores elegidos son por gusto personal manteniendo sobriedad en la interfaz y codificación de acciones positiva y negativa.
