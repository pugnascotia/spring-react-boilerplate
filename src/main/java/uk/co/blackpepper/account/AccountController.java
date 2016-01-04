package uk.co.blackpepper.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static uk.co.blackpepper.utils.State.populateStateIntoModel;

@Controller
public class AccountController {

	@RequestMapping("/signin")
	public String showSignIn(Model model, HttpServletRequest request) {
		populateStateIntoModel(model, request);
		return "index";
	}
}
