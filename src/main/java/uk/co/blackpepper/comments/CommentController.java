package uk.co.blackpepper.comments;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static uk.co.blackpepper.utils.RequestUtils.getRequestPath;

@Controller
public class CommentController {

    @Inject
    private CommentRepository repository;

    @RequestMapping(value = { "/", "/add" }, method = GET)
    public String index(Model model, HttpServletRequest request) {
        model.addAttribute("comments", repository.findAll());
		model.addAttribute("__requestPath", getRequestPath(request));
        return "index";
    }
}
