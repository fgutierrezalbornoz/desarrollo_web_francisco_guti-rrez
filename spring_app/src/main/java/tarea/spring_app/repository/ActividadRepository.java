package tarea.spring_app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tarea.spring_app.model.Actividad;

import java.util.List;
import java.util.Optional;

/**
 * ActividadController
 *
 * @author fgutierrez - @since 20-06-2025
 */

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    Page<Actividad> findAllByOrderByIdDesc(Pageable pageable);

}
