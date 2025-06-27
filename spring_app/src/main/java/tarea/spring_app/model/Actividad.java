package tarea.spring_app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="comuna_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "actividades"})
    private Comuna comuna;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "actividad_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Tema tema;

    @Transient
    private Double notaPromedio;

    @Column(length = 100)
    private String sector;

    @Column(length = 200, nullable = false)
    private String nombre;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 15)
    private String celular;

    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @Column(length = 500)
    private String descripcion;

    // Getters y Setters

    public Tema getTema() { return tema; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Comuna getComuna() {
        return comuna;
    }

    public void setComuna(Comuna comuna) {
        this.comuna = comuna;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public void setDiaHoraInicio(LocalDateTime diaHoraInicio) {
        this.diaHoraInicio = diaHoraInicio;
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public void setDiaHoraTermino(LocalDateTime diaHoraTermino) {
        this.diaHoraTermino = diaHoraTermino;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getNotaPromedio() { return notaPromedio; }

    public void setNotaPromedio(Double notaPromedio) { this.notaPromedio = notaPromedio; }

}
