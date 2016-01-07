package uk.co.blackpepper.comments;

import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static uk.co.blackpepper.utils.State.populateModel;

@Controller
public class CommentController {

    @Inject
    private CommentRepository repository;

	/**
	 * Handles most requests for the application. This method has two mappings
	 * because it can render two routes without any change in behaviour. In a
	 * bigger application, the work required for each route to set up the
	 * correct state would vary more, and we would have more methods.
	 */

    @RequestMapping(value = { "/", "/add" }, method = GET)
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
