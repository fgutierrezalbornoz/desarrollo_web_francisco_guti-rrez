package tarea.spring_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

/**
 * Nota
 *
 * @author fgutierrez - @since 26-06-2025
 */

@Entity
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer nota;

    @Column(nullable = false)
    private Long actividadId;

    public Nota(Long actividadId, int nota) {
        this.actividadId = actividadId;
        this.nota = nota;
    }
    public Nota(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Nota{" +
                "id=" + id +
                ", nota=" + nota +
                ", actividad_id=" + actividadId +
                '}';
    }
}
