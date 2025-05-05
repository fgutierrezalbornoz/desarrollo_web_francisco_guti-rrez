def formateaFechaHora(actividades):
    for actividad in actividades:
            fechaInicio = actividad.dia_hora_inicio
            fechaTermino = actividad.dia_hora_termino
            if  fechaInicio is not None:
                actividad.dia_hora_inicio = fechaInicio.strftime('%Y-%m-%d <br> %H:%M')
            if fechaTermino is not None:
                actividad.dia_hora_termino = fechaTermino.strftime('%Y-%m-%d <br> %H:%M')
            else: 
                actividad.dia_hora_termino = ' - ' 
    return actividades