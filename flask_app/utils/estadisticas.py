def actividades_por_dia(actividades):
    dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    data = {dia: 0 for dia in dias}
    for actividad in actividades:
        fecha_local = actividad.dia_hora_inicio.astimezone()
        idx = fecha_local.weekday()
        data[dias[idx]] += 1
    return data

def actividades_por_tipo(actividades):
    temas = ['música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro']
    data = {tema: 0 for tema in temas}
    n_actividades = len(actividades)
    for actividad in actividades:
        for tema_obj in actividad.actividad_tema:
            if tema_obj.tema in data:
                data[tema_obj.tema] += 1 / n_actividades
    return data

def actividades_por_mes(actividades):
    meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", 
             "septiembre", "octubre", "noviembre", "diciembre"]
    data = {mes:{"mañana": 0, "mediodia": 0, "tarde": 0} for mes in meses}
    for actividad in actividades:
        fecha_local = actividad.dia_hora_inicio.astimezone()
        idx = fecha_local.month - 1
        horario = "mañana" if fecha_local.hour<11 else ("mediodia" if fecha_local.hour<16 else "tarde")
        data[meses[idx]][horario] += 1
    return data