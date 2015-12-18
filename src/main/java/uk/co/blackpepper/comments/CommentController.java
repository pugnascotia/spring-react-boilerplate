package uk.co.blackpepper.comments;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static uk.co.blackpepper.utils.StateUtils.populateStateIntoModel;

@Controller
public class CommentController {

    @Inject
    private CommentRepository repository;

    @RequestMapping(value = { "/", "/add" }, method = GET)
    public String index(Model model, HttpServletRequest request) {
		populateStateIntoModel(model, request);
        model.addAttribute("comments", repository.findAll());
        return "index";
    }
}
