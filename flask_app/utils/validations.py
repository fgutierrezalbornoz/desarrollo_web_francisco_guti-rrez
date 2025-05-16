import re
import filetype
from datetime import datetime
from utils.utils import estructuraRequest

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif'}
ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/jpg"}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_sector(sector):
    if not sector: return True
    return 4 <= len(sector.strip()) <= 100

def validate_name(name):
    if not name: return False
    return len(name.strip()) >= 4 and len(name.strip()) <= 200

def validate_email(email):
    if not email: return False
    length_valid = len(email) <= 100
    pattern = r'^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    format_valid = re.match(pattern, email) is not None
    return length_valid and format_valid

def validate_phone(phonenumber):
    if not phonenumber: return True
    length_valid = len(phonenumber) >= 8
    pattern = r'^\+\d{3}\.\d{8}$'
    format_valid = re.match(pattern, phonenumber) is not None
    return length_valid and format_valid

def validate_photos(photos):
    firstPhoto = True#si es que hay más de una foto
    for photo in photos:
        # check if a file was submitted
        if photo is None:
            return not firstPhoto
        # check if the browser submitted an empty file
        if photo.filename == "":
            return not firstPhoto
        # check file extension
        ftype_guess = filetype.guess(photo)
        if ftype_guess.extension not in ALLOWED_EXTENSIONS:
            return False
        # check mimetype
        if ftype_guess.mime not in ALLOWED_MIMETYPES:
            return False
        firstPhoto = False
    return True

def validate_region(region):
    if region and re.fullmatch(r'\d{1,2}', region):
        return True
    return False

def validate_comuna(comuna):
    if comuna and re.fullmatch(r'\d+', comuna):
        return True
    return False

def validate_date(initial, end):
    if not initial: return False
    pattern = r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$"

    format_valid_initial = re.fullmatch(pattern, initial) is not None
    if not end and format_valid_initial: return True

    format_valid_end = re.fullmatch(pattern, end or "") is not None
    if not format_valid_initial or not format_valid_end: return False

    try:
        initial_dt = datetime.fromisoformat(initial)
        end_dt = datetime.fromisoformat(end)
        if end_dt < initial_dt: return False
    except ValueError:
        return False
    return True

def validate_topic(topic, description=''):
    if not topic: return False
    if topic=='otro':
        length_valid = 3 <= len(description.strip()) <= 15
        return length_valid
    return True

def validate_contact(contacts):
    if len(contacts) > 5: return True
    for option in contacts:
        id = option['identificador']
        length_valid = 4 <= len(id.strip()) <= 50
        if not length_valid: return False
    return True

def validator(request):
    data = estructuraRequest(request)
    msg_error = []
    if not validate_region(data['region_id']):
        msg_error.append('Region Inválida')
    if not validate_comuna(data['comuna_id']):
        msg_error.append('Comuna Inválida')
    if not validate_sector(data['sector']):
        msg_error.append('Sector Inválido')
    if not validate_name(data['nombre']):
        msg_error.append('Nombre Inválido')
    if not validate_email(data['email']):
        msg_error.append('Email Inválido')
    if not validate_phone(data['celular']):
        msg_error.append('Nro Celular Inválido')
    if not validate_contact(data['contactar_por']):
        msg_error.append('Contacto Inválido')
    if not validate_date(data['fecha_inicio'], data['fecha_termino']):
        msg_error.append('Fecha Inválida')
    if not validate_topic(data['tema'], data['descripcion_tema']):
        msg_error.append('Tema Inválido')
    if not validate_photos(data['fotos']):
        msg_error.append('Foto Inválida')
    return len(msg_error)==0, msg_error