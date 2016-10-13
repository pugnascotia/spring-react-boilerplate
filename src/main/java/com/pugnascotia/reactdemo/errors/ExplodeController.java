package com.pugnascotia.reactdemo.errors;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * The sole purpose of this controller is to explode as soon as the /explode route
 * is accessed. In so doing, we can test the rendering of server errors, and whether
 * the "auth" state key is correctly populated for an authenticated user.
 */

@Controller
public class ExplodeController {

	@RequestMapping("/explode")
	public String explode() {
		throw new RuntimeException("Explode!");
	}
}
