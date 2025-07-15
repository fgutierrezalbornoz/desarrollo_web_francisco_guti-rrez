package tarea.spring_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tarea.spring_app.model.Nota;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    List<Nota> findByActividadId(Integer actividadId);

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.actividadId = ?1")
    Double getPromedioByActividadId(Integer actividadId);

}
