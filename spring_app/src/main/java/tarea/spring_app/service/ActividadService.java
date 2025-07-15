package tarea.spring_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tarea.spring_app.model.Actividad;
import tarea.spring_app.model.Tema;
import tarea.spring_app.repository.ActividadRepository;
import tarea.spring_app.repository.NotaRepository;
import tarea.spring_app.repository.TemaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private TemaRepository temaRepository;

    public List<Actividad> getAll() {
        List<Actividad> actividades = actividadrepository.findAll();
        for (Actividad actividad : actividades) {
            Double promedio = notaRepository.getPromedioByActividadId(actividad.getId());
            actividad.setNotaPromedio(promedio != null ? Math.round(promedio * 10.0) / 10.0 : null);
            Tema tema = temaRepository.findByActividadId(actividad.getId().intValue());
            actividad.setTema(tema);
        }
        return actividades;
    }
    public Actividad getById(Integer id) {
        Actividad actividad = actividadrepository.findById(id).orElse(null);
        Tema tema = temaRepository.findByActividadId(actividad.getId().intValue());
        actividad.setTema(tema);
        return actividad;
    }

    public List<Actividad> getActivitiesData(Integer pageNumber, int pageSize) {
        List<Actividad> activities = actividadrepository.findAllByOrderByIdDesc(PageRequest.of(pageNumber - 1, pageSize)).getContent();

        for (Actividad actividad : activities) {
            Double promedio = notaRepository.getPromedioByActividadId(actividad.getId());
            actividad.setNotaPromedio(promedio != null ? Math.round(promedio * 10.0) / 10.0 : null);
            Tema tema = temaRepository.findByActividadId(actividad.getId().intValue());
            actividad.setTema(tema);
        }

        return activities;
    }
}
