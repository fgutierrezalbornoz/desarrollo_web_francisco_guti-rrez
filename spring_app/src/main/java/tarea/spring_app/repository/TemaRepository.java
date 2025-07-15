package tarea.spring_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tarea.spring_app.model.Tema;
import tarea.spring_app.model.TemaEnum;

import java.util.Optional;

public interface TemaRepository extends JpaRepository<Tema, Integer> {
    Optional<Tema> findByTema(TemaEnum tema);

    boolean existsByTema(TemaEnum tema);

    @Query("SELECT t FROM Tema t WHERE t.actividadId = :actividadId")
    Tema findByActividadId(@Param("actividadId") Integer actividadId);

}
