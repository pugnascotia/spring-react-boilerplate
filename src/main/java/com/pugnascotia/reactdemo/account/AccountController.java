package com.pugnascotia.reactdemo.account;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.pugnascotia.reactdemo.utils.State.populateModel;

/**
 * Handles a request for the signin page and renders the
 * app. React Router takes care of showing the right page.
 */

@Controller
public class AccountController {

	@RequestMapping("/signin")
	public String showSignIn(Model model, HttpServletRequest request) {
		populateModel(model, request);
		return "index";
	}
}
