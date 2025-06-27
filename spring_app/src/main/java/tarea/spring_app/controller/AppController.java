package tarea.spring_app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * AppController
 *
 * @author fgutierrez - @since 26-06-2025
 */

@Controller
public class AppController {

    @GetMapping("/")
    public String home(Model model){
        return "index";
    }

    @GetMapping("/stats")
    public String stats(Model model){
        return "estadisticas";
    }

}
