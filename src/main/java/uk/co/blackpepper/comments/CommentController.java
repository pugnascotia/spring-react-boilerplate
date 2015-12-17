package uk.co.blackpepper.comments;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import uk.co.blackpepper.comments.CommentRepository;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

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

    private static String getRequestPath(HttpServletRequest request) {
        return request.getRequestURI() +
			(request.getQueryString() == null ? "" : "?" + request.getQueryString());
    }

}
