package uk.co.blackpepper;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class MainController {

    @RequestMapping(value = "/", method = GET)
    public String index(Model model) {
        model.addAttribute("message", "Hello, world!");
        return "index";
    }
}
