from datetime import datetime
import os
import hashlib
import filetype
from werkzeug.utils import secure_filename

def formateaFechaHoraActividad(actividad):
    fechaInicio = actividad.dia_hora_inicio
    fechaTermino = actividad.dia_hora_termino
    if  fechaInicio is not None:
        actividad.dia_hora_inicio = fechaInicio.strftime('%Y-%m-%d <br> %H:%M')
    if fechaTermino is not None:
        actividad.dia_hora_termino = fechaTermino.strftime('%Y-%m-%d <br> %H:%M')
    else: 
        actividad.dia_hora_termino = ' - '
    return actividad

def formateaFechaHora(actividades):
    for actividad in actividades:
        actividad = formateaFechaHoraActividad(actividad)
    return actividades


def recuperaContacto(request, data):
    wsp_check = request.form.get("whatsapp_check")
    ig_check = request.form.get("instagram_check")
    tg_check = request.form.get("telegram_check")
    x_check = request.form.get("x_check")
    tiktok_check = request.form.get("tiktok_check")
    otra_check = request.form.get("otra_check")
    contactos = []
    if wsp_check == 'on':
        wsp_val = request.form.get("whatsapp_val")
        contactos.append({'nombre': 'whatsapp', 'identificador': wsp_val})
    if ig_check == 'on':
        ig_val = request.form.get("instagram_val")
        contactos.append({'nombre': 'instagram', 'identificador': ig_val})
    if tg_check == 'on':
        tg_val = request.form.get("telegram_val")
        contactos.append({'nombre': 'telegram', 'identificador': tg_val})
    if x_check == 'on':
        x_val = request.form.get("x_val")
        contactos.append({'nombre': 'X', 'identificador': x_val})
    if tiktok_check == 'on':
        tiktok_val = request.form.get("tiktok_val")
        contactos.append({'nombre': 'tiktok', 'identificador': tiktok_val})
    if otra_check == 'on':
        otra_val = request.form.get("otra_val")
        contactos.append({'nombre': 'otra', 'identificador': otra_val})
    data['contactar_por'] = contactos
    return data

def estructuraRequest(request):
    data = {
        "region_id" : request.form.get("region"), #retorna el id
        "comuna_id" : request.form.get("comuna"), #retorna el id
        "sector" : request.form.get("sector"), #retorna un string
        "nombre" : request.form.get("nombre"), #retorna string
        "email" : request.form.get("email"), #string email
        "celular" : request.form.get("celular"), #string numero
        "fecha_inicio" : request.form.get("fechaInicio"), #2025-05-03T00:45
        "fecha_termino" : request.form.get("fechaTermino"),
        "descripcion" : request.form.get("descripcion"), #string
        "tema" : request.form.get("tema"), #string,
        "descripcion_tema" : request.form.get("descripcion-tema"),
        "fotos" : [request.files.get(f"foto{i}") for i in range(1,6)], #none
        "rutas_fotos":[]
    }
    return recuperaContacto(request, data)

def formatRequest(request):
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
    return recuperaContacto(request, data)


def guardaArchivos(data, app):
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
            ruta = os.path.join(app.config["UPLOAD_FOLDER"], img_filename).replace("\\", "/")
            try:
                data['fotos'][i].save(ruta)
                
            except Exception as e:
                msg_error = f"Error al guardar la imagen: {e}"
                print(msg_error)
                return {}, msg_error
            data['rutas_fotos'].append({'ruta': ruta, 'nombre': img_filename})
    return data, None