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