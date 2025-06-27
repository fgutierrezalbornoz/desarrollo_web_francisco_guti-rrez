package tarea.spring_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarea.spring_app.model.Nota;
import tarea.spring_app.repository.ActividadRepository;
import tarea.spring_app.repository.NotaRepository;

import java.util.Map;

/**
 * NotaService
 *
 * @author fgutierrez - @since 26-06-2025
 */

@Service
public class NotaService {
    @Autowired
    private ActividadRepository actividadrepository;
    @Autowired
    private NotaRepository notaRepository;

    public void validateScore (Map<String, Object> data) throws Exception{
        String actividadIdStr = String.valueOf(data.get("actividadId"));
        Long actividadId;
        try {
            actividadId = Long.parseLong(actividadIdStr);
        } catch (NumberFormatException e) {
            throw new Exception("El ID de actividad debe ser un número válido");
        }

        Object notaObj = data.get("nota");
        Double nota;
        try {
            if (notaObj instanceof String) {
                nota = Double.parseDouble((String) notaObj);
            } else if (notaObj instanceof Number) {
                nota = ((Number) notaObj).doubleValue();
            } else {
                throw new Exception("Formato de nota inválido");
            }
        } catch (NumberFormatException e) {
            throw new Exception("La nota debe ser un número válido");
        }
        // Validaciones
        if (nota == null) {
            throw new Exception("No se ha proporcionado la nota");
        }
        if (nota != Math.floor(nota)){
            throw new Exception("La nota debe ser un número entero");
        }
        if (nota < 1 || nota > 7) {
            throw new Exception("La nota debe estar entre 1 y 7");
        }
        if (actividadId == null) {
            throw new Exception("No se ha proporcionado el id de la actividad");
        }
        if (!actividadrepository.existsById(actividadId)) {
            throw new Exception("La actividad con el id " + actividadId + " no existe");
        }
        Nota notaInst = new Nota(actividadId, (int) Math.floor(nota));
        notaRepository.save(notaInst);
    }
}
