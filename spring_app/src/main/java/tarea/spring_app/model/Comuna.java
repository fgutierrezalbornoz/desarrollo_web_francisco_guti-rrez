package tarea.spring_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

/**
 * Comuna
 *
 * @author fgutierrez - @since 20-06-2025
 */

@Entity
@Table(name = "comuna")
public class Comuna {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "comuna", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("comuna")
    private List<Actividad> actividades;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "comunas"})
    private Region region;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Actividad> getActividades() {
        return actividades;
    }

    public void setActividades(List<Actividad> actividades) {
        this.actividades = actividades;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }
}
