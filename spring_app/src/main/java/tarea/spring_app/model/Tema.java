package tarea.spring_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;


/**
 * Tema
 *
 * @author fgutierrez - @since 26-06-2025
 */

@Entity
@Table(name = "actividad_tema")
public class Tema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "actividad_id")
    private Integer actividadId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TemaEnum tema;

    @Column(name = "glosa_otro", length = 15)
    private String glosaOtro;

    public TemaEnum getTema() {
        return tema;
    }

    public void setTema(TemaEnum tema) {
        this.tema = tema;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGlosaOtro() {
        return glosaOtro;
    }

    public void setGlosaOtro(String glosaOtro) {
        this.glosaOtro = glosaOtro;
    }
}
