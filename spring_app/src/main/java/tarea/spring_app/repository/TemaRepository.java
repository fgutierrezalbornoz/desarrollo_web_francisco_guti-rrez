package tarea.spring_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tarea.spring_app.model.Tema;
import tarea.spring_app.model.TemaEnum;

import java.util.Optional;

public interface TemaRepository extends JpaRepository<Tema, Long> {
    Optional<Tema> findByTema(TemaEnum tema);
    boolean existsByTema(TemaEnum tema);

}
