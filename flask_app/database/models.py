from .db import Base
from sqlalchemy import Column, BigInteger, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
class Region(Base):
    __tablename__ = 'region'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    #relaciones entre tablas
    comunas = relationship("Comuna", back_populates="region", cascade="all, delete")
class Comuna(Base):
    __tablename__ = 'comuna'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(BigInteger, ForeignKey('region.id'), nullable=False)
    #relaciones entre tablas
    region = relationship("Region", back_populates="comunas")
    actividad = relationship("Actividad", back_populates="comuna")

class Actividad(Base):
    __tablename__ = 'actividad'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    comuna_id = Column(BigInteger, ForeignKey('comuna.id'), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime)
    descripcion = Column(String(500))
    #relaciones entre tablas
    comuna = relationship("Comuna", back_populates="actividad")
    foto = relationship("Foto", back_populates="actividad")
    contactar_por = relationship("ContactarPor", back_populates="actividad")
    actividad_tema = relationship("ActividadTema", back_populates="actividad")
    comentario = relationship("Comentario", back_populates="actividad")

class Foto(Base):
    __tablename__ = 'foto'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('actividad.id'), nullable=False)
    #relaciones entre tablas
    actividad = relationship("Actividad", back_populates="foto")

class ContactarPor(Base):
    __tablename__ = 'contactar_por'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('actividad.id'), nullable=False)
    #relaciones entre tablas
    actividad = relationship("Actividad", back_populates="contactar_por")

class ActividadTema(Base):
    __tablename__ = 'actividad_tema'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    tema = Column(Enum('música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro = Column(String(15))
    actividad_id = Column(BigInteger, ForeignKey('actividad.id'), nullable=False)
    #relaciones entre tablas
    actividad = relationship("Actividad", back_populates="actividad_tema")

class Comentario(Base):
    __tablename__ = 'comentario'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    actividad_id = Column(BigInteger, ForeignKey('actividad.id'), nullable=False)
    #relaciones entre tablas
    actividad = relationship("Actividad", back_populates="comentario")