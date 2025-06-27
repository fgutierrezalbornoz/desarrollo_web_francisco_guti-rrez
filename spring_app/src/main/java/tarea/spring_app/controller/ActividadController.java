package tarea.spring_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tarea.spring_app.model.Actividad;
import tarea.spring_app.service.ActividadService;
import tarea.spring_app.service.NotaService;

import java.util.List;
import java.util.Map;

/**
 * ActividadController
 *
 * @author fgutierrez - @since 20-06-2025
 */

@Controller
public class ActividadController {
    @Autowired
    private ActividadService actividadService;
    @Autowired
    private NotaService notaService;

    @ResponseBody
    @GetMapping("/activities/retrieve")
    @Transactional(readOnly = true)
    public List<Actividad> getAll(){
        return actividadService.getAll();
    }

    @GetMapping("/activities")
    public String activities(Model model){
        return "listado-actividades";
    }

    @GetMapping("/addActivities")
    public String addActivities(Model model){
        return "agregar-actividad";
    }

    @GetMapping("/activities/evaluate")
    @Transactional(readOnly = true)
    public String getAllActivities(Model model){
        List<Actividad> actividades = actividadService.getAll();
        model.addAttribute("actividades", actividades);
        return "listado-actividades-nota";
    }
    @GetMapping("/activity/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Actividad> getById(@PathVariable Long id){
        Actividad actividad = actividadService.getById(id);
        return actividad != null ? ResponseEntity.ok(actividad) : ResponseEntity.notFound().build();
    }

    @PostMapping("post-eval-activity")
    @ResponseBody
    public String postEvalActivity(@RequestBody Map<String, Object> data){
        try{
            notaService.validateScore(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return "ok";
    }
}
