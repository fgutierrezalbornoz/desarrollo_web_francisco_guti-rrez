package tarea.spring_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tarea.spring_app.model.Actividad;
import tarea.spring_app.repository.ActividadRepository;
import tarea.spring_app.repository.NotaRepository;

import java.util.List;

/**
 * ActividadService
 *
 * @author fgutierrez - @since 20-06-2025
 */

@Service
public class ActividadService {
    @Autowired
    private ActividadRepository actividadrepository;
    @Autowired
    private NotaRepository notaRepository;

    public List<Actividad> getAll() {
        List<Actividad> actividades = actividadrepository.findAllWithTemas();
        for (Actividad actividad : actividades) {
            Double promedio = notaRepository.getPromedioByActividadId(actividad.getId());
            actividad.setNotaPromedio(promedio != null ? Math.round(promedio * 10.0) / 10.0 : null);
        }
        return actividades;
    }
    public Actividad getById(Long id) {
        Actividad actividad = actividadrepository.findByIdWithTema(id).orElse(null);
        return actividad;
    }
}
