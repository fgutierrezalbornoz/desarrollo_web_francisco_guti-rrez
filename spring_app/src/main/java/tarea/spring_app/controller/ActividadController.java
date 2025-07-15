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
    @GetMapping("/activities/all")
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

    @GetMapping("/activity/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Actividad> getById(@PathVariable Integer id){
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

    @GetMapping("/activities/{nPage}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Actividad>> activityByPage(Model model, @PathVariable Integer nPage){
        int pageSize = 10;
        List<Actividad> modelData = actividadService.getActivitiesData(nPage, pageSize);
        return modelData != null ? ResponseEntity.ok(modelData) : ResponseEntity.notFound().build();
    }

    @GetMapping("/activities/evaluate")
    public String listActivities(
            @RequestParam(defaultValue = "1") int nPage,
            Model model,
            @RequestHeader(value = "X-Requested-With", required = false) String requestedWith) {
        int pageSize = 10;
        List<Actividad> actividades = actividadService.getActivitiesData(nPage, pageSize);
        model.addAttribute("actividades", actividades);
        model.addAttribute("pagina", nPage);
        model.addAttribute("ultima", actividades.size() < pageSize);

        if ("XMLHttpRequest".equals(requestedWith)) {
            return "fragments/actividades :: listaActividades";
        }

        return "listado-actividades-nota";
    }
}
