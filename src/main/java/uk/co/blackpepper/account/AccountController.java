package uk.co.blackpepper.account;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

import static uk.co.blackpepper.utils.RequestUtils.getRequestPath;

@Controller
public class AccountController {

	@RequestMapping("/signin")
	public String showSignIn(Model model, HttpServletRequest request) {
		model.addAttribute("__requestPath", getRequestPath(request));
		return "index";
	}
}
