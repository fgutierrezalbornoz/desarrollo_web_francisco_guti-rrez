# desarrollo_web_francisco_guti-rrez

## Tarea 4
Esta tarea consiste en implementar funcionalidades en Spring Boot y Thymeleaf.

Se reeimplementó el esqueleto de las tareas pasadas y se puede acceder a las distintas secciones anteriormente definidas. En las funcionalidades implementadas con Flask, solo se muestra un html con un mensaje de que esa sección ya fue implementada en Flask.
### Evaluación de actividad
A esta sección se puede acceder mediante el link `Evaluar actividad` que se encuentra en la parte superior (navbar implementado con fragmentos) y redirecciona a una pantalla que muestra el html `listado-actividades-nota.html`. En este, se listan las actividades con información según el enunciado y con un link de evaluar. Al clickear en el link, se despliega un modal con información un poco más detallada de la actividad a evaluar y un pequeño formulario con un input para ingresar la nota que el usuario quiera entregar. 

La validación en frontend se realiza utilizando el script `evaluar.js` (que la nota sea un número entero entre 1 y 7 ambos incluidos). Al terminar la evaluación se genera una petición AJAX que actualiza la nota en lista.

Del lado del servidor la petición se realiza al endpoint `/post-eval-activity` y es manejada por `ActividadController` quien utiliza el servicio `NotaService` para realizar la validación del lado del servidor.

### Implementaciones necesarias

Para atender las solicitudes se definieron modelos asociados a actividad, comuna, nota, region, tema y temaenum en la carpeta `model`. 

Además, se definieron las interfaces para actividad, nota y tema en `repository`, en el contrato se definieron querys específicas para métodos asociados ya que así me resultó más sencillo que probar con distintos métodos definidos por defecto en JPA. 

En la carpeta `service` se definen los servicios asociados a actividad y nota que son utilizados por los controllers definidos en la carpeta `controller`. 

Se definieron 3 controllers, `ActividadController` que manejan las solicitudes necesarias para implementar las funcionalidades pedidas, `AppController` que maneja las solicitudes para renderizar las secciones que no están directamente relacionadas a esta tarea y `NotFoundController` para manejar solicitudes a direcciones no definidas.

---
## Tarea 3
Esta tarea consiste en implementar AJAX en algunas consultas realizadas al servidor. 
### Comentarios
En `templates/info-actividad.html` se implementa una sección con comentarios, la parte superior de esta sección contiene comentarios que se han realizado y están separados por una línea para que quede clara la separación. Cada comentario contiene una fecha (en horario local) en la cual se realizó, el nombre de la persona que lo realizó (este se resalta en comparación con la demás información) y el comentario como tal. La petición de los comentarios se realiza utilizando fetch. 
La implementación de parte del servidor es: 
- Se agrega un endpoint `/post-comment` que recibe los datos del formulario.
- Se agrega un endpoint `/get-comments` que al consultarlo devuelve los comentarios asociados a una actividad en particular.
- La validación del comentario enviado desde el cliente se realiza con la función `validate_comment()` que está implementada en `validations.py`.
- Se agrega a la base de datos la tabla definida en el archivo `tabla-comentario.sql` entregada por el cuerpo docente.
- Se implementa el modelo Comentario en `models.py`.
### Estadísticas
Del lado del cliente, en `estadisticas.js` se implementa 3 funciones las cuales generan los gráficos pedidos. Estos se muestran con un gráfico principal y hay 3 miniaturas de los gráficos que al clickear alguna de ellas, cambia el gráfico principal por la opción seleccionada. Estos gráficos, utilizan la información consultada utilizando fetch al endpoint `/get-stats-data`, aquí se llama a 3 funciones (implementadas en `estadisticas.py`)donde cada una prepara los datos para cada gráfico de la siguiente manera:
- `actividades_por_dia()`: a partir de las actividades, incrementa un contador del día dependiendo de qué día de la semana es el inicio de esta actividad.
- `actividad_por_tema()`: a partir de las actividades, incrementa un contador relativo dependiendo del tema de la actividad. Esto es para que del lado del cliente se muestre directamente el porcentaje.
- `actividad_por_mes()`: a partir de las actividades, incrementa un contador que se separa por mes y por cada mes se divide en mañana (antes de las 11hrs), mediodia (entre las 11hrs y las 16hrs) y tarde (luego de las 16hrs).
Obs: Inicialmente, había implementado el cambio de gráfico con una función que hacia el fetch y generaba el gráfico, entonces cada vez que se seleccionaba un gráfico distinto se hacia el fetch. Finalmente, cambié la implementación por solo un fetch ya que así no se realizan consultas innecesarias.
---
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
