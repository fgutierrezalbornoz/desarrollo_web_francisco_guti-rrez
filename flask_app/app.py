from flask import Flask, render_template, request, redirect, url_for
from database import db_access
from datetime import datetime
import filetype
from werkzeug.utils import secure_filename
import os
import hashlib
from utils.utils import formateaFechaHora 


UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

@app.route('/', methods=["GET"])
def home():
    actividades = db_access.get_actividades_home()
    formateaFechaHora(actividades)
    return render_template("index.html", actividades=actividades)

@app.route('/addactivity')
def addActivity():
    return render_template("agregar-actividad.html")

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

@app.route('/regiones/<n>')
def regiones(n):
    regionObj = db_access.get_region_n(n)
    region = regionObj.nombre
    comunas = regionObj.comunas
    return render_template("regiones.html", region=region, comunas=comunas)

@app.route("/post-activity", methods=["POST"])
def post_actividad():
    data = {
        "region_id" : int(request.form.get("region")), #retorna el id
        "comuna_id" : int(request.form.get("comuna")), #retorna el id
        "sector" : request.form.get("sector"), #retorna un string
        "nombre" : request.form.get("nombre"), #retorna string
        "email" : request.form.get("email"), #string email
        "celular" : request.form.get("celular"), #string numero
        "fecha_inicio" : datetime.fromisoformat(request.form.get("fechaInicio")), #2025-05-03T00:45
        "fecha_termino" : None if request.form.get("fechaTermino") == '' else datetime.fromisoformat(request.form.get("fechaTermino")),
        "descripcion" : request.form.get("descripcion"), #string
        "tema" : request.form.get("tema"), #string,
        "descripcion_tema" : request.form.get("descripcion-tema"),
        "fotos" : [request.files.get(f"foto{i}") for i in range(1,6)], #none
        "rutas_fotos":[]
    }
    for i in range(5):
        if data['fotos'][i].filename != '':
            # 1. generate random name for img
            _filename = hashlib.sha256(
                secure_filename(data['fotos'][i].filename) # nombre del archivo
                .encode("utf-8") # encodear a bytes
                ).hexdigest()
            _extension = filetype.guess(data['fotos'][i]).extension
            img_filename = f"{_filename}.{_extension}"

            # 2. save img as a file
            ruta = os.path.join(app.config["UPLOAD_FOLDER"], img_filename)
            try:
                data['fotos'][i].save(ruta)
                
            except Exception as e:
                print(f"Error al guardar la imagen: {e}")
            data['rutas_fotos'].append({'ruta': ruta, 'nombre': img_filename})
    db_access.create_actividad(data)

    return redirect(url_for("home"))



if __name__ == "__main__":
    app.run(debug=True)
    
