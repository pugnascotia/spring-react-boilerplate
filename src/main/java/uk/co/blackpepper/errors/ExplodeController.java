package uk.co.blackpepper.errors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ExplodeController {

	@RequestMapping("/explode")
	public String explode() {
		throw new RuntimeException("Explode!");
	}
}
