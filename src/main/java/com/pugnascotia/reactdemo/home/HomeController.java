package com.pugnascotia.reactdemo.home;

import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import com.pugnascotia.reactdemo.comments.CommentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pugnascotia.reactdemo.utils.State.populateModel;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Renders the home page. It loads all the comments in the repository
 * and passes them to the render context in the same shape that Redux
 * uses.
 */
@Controller
public class HomeController {

    private final CommentRepository repository;

	@Inject
	public HomeController(CommentRepository repository) {
		this.repository = repository;
	}

    @RequestMapping(value = "/", method = GET)
    public String index(Model model, HttpServletRequest request) {
		populateModel(model, request);
        model.addAttribute("comments", getCommentsState());
        return "index";
    }

	private Map<String, Object> getCommentsState() {
		Map<String,Object> state = new HashMap<>();
		state.put("status", "loaded");
		state.put("data", repository.findAll());
		return state;
	}
}
