from .db import SessionLocal
from .models import *
from sqlalchemy.orm import joinedload

def get_comunas(region_id):
    session = SessionLocal()
    comunas = session.query(Comuna).options(joinedload(Comuna.region)).filter_by(region_id=region_id).all() #joinedload carga la info de comuna.region
    #comunas = session.query(Comuna).filter_by(region_id=region_id).all()
    session.close()
    return comunas

def get_regiones():
    session = SessionLocal()
    regiones = session.query(Region).options(joinedload(Region.comunas)).all()
    session.close()
    return regiones

def get_region_n(n):
    session = SessionLocal()
    regiones = session.query(Region).options(joinedload(Region.comunas)).filter_by(id=n).first()
    session.close()
    return regiones

def get_actividades(pagina):
    por_pagina = 5
    session = SessionLocal()
    actividades = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.foto),
        joinedload(Actividad.contactar_por),
        joinedload(Actividad.actividad_tema)
    ).order_by(Actividad.id.desc())\
     .offset((pagina - 1) * por_pagina)\
     .limit(por_pagina)\
     .all()
    session.close()
    return actividades

def get_actividades_home():
    session = SessionLocal()
    actividades = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.foto),
        joinedload(Actividad.contactar_por),
        joinedload(Actividad.actividad_tema)
        ).order_by(Actividad.id.desc()).limit(5).all()
    session.close()
    return actividades

def get_actividad(id):
    session = SessionLocal()
    actividad = session.query(Actividad).options(
        joinedload(Actividad.comuna),
        joinedload(Actividad.foto),
        joinedload(Actividad.contactar_por),
        joinedload(Actividad.actividad_tema)
        ).filter_by(id=id).first()
    session.close()
    return actividad

def create_actividad(data):
    session = SessionLocal()
    new_actividad = Actividad(comuna_id=data['comuna_id'], sector=data['sector'], nombre=data['nombre'], email=data['email'], celular=data['celular'], 
                              dia_hora_inicio=data['fecha_inicio'], dia_hora_termino=data['fecha_termino'], descripcion=data['descripcion'])
    session.add(new_actividad)
    session.flush()
    new_actividad_tema = ActividadTema(tema=data['tema'], glosa_otro=data['descripcion_tema'], actividad_id=new_actividad.id)
    session.add(new_actividad_tema)
    session.flush()
    for foto in data['rutas_fotos']:
        new_foto = Foto(ruta_archivo=foto['ruta'], nombre_archivo=foto['nombre'], actividad_id=new_actividad.id)
        session.add(new_foto)
        session.flush()
    session.commit()
    session.close()