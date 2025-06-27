package tarea.spring_app.repository;

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

public interface ActividadRepository extends JpaRepository<Actividad, Long> {
    @Query("SELECT DISTINCT a FROM Actividad a " +
            "LEFT JOIN FETCH a.tema t ")
    List<Actividad> findAllWithTemas();

    @Query("SELECT a FROM Actividad a " +
            "LEFT JOIN FETCH a.tema t " +
            "WHERE a.id = :id")
    Optional<Actividad> findByIdWithTema(@Param("id") Long id);



}
