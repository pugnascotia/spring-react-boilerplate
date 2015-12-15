package uk.co.blackpepper;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import uk.co.blackpepper.comments.CommentRepository;

import javax.inject.Inject;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class MainController {

    @Inject
    private CommentRepository repository;

    @RequestMapping(value = "/", method = GET)
    public String index(Model model) {
        model.addAttribute("messages", repository.findAll());
        return "index";
    }
}
