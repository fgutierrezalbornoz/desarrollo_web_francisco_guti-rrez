from flask import Flask, render_template, request, redirect, url_for, flash#, jsonify
from database import db_access
from utils.utils import formateaFechaHora, guardaArchivos, formatRequest
from utils.validations import validator
import os

UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1000 * 1000

@app.route('/', methods=["GET"])
def home():
    actividades = db_access.get_actividades_home()
    formateaFechaHora(actividades)
    return render_template("index.html", actividades=actividades)

@app.route('/addactivity')
def addActivity():
    return render_template("agregar-actividad.html")
    # Para carga de regiones desde flask
    # regiones = db_access.get_regiones()
    # return render_template("agregar-actividad.html", regiones = regiones)

# @app.route('/comunas/<int:region_id>')
# def getComunas(region_id):
#     comunas = db_access.get_comunas(region_id)
#     return jsonify([{"id": c.id, "nombre": c.nombre} for c in comunas])

@app.route('/activities', methods=["GET"])
@app.route('/activities/<pagina>', methods=["GET"])
def listActivities(pagina=1):
    pagina = int(pagina)
    actividades = db_access.get_actividades(pagina)
    formateaFechaHora(actividades)
    for actividad in actividades:
        actividad.n_fotos = len(actividad.foto)
    return render_template("listado-actividades.html", actividades=actividades, pagina=pagina)

@app.route('/statistics')
def statistics():
    return render_template("estadisticas.html")

@app.route('/activity/<id>', methods=["GET"])
def get_actividad_id(id):
    actividad = db_access.get_actividad(id)
    return render_template("info-actividad.html", actividad=actividad)

@app.route("/post-activity", methods=["POST"])
def post_actividad():
    is_valid, msg_error = validator(request) # valida los datos del formulario
    if not is_valid: # si los datos no son válidos, se muestra un mensaje en la parte superior del formulario
        flash(f"Error del servidor: {msg_error}")
        return redirect(request.referrer)
    data = formatRequest(request) # se almacena la información en un diccionario
    data, msg_error_archivos = guardaArchivos(data, app) #se almacenan las fotos en /uploads
    if not msg_error_archivos is None: # si hay un error al almacenar las fotos se muestra en la parte superior del formulario
        flash(f"Error del servidor: {msg_error_archivos}")
        return redirect(request.referrer)
    db_access.create_actividad(data) # se almacena la info en la base de datos 
    return redirect(url_for("home"))



if __name__ == "__main__":
    app.run(debug=True)
    
