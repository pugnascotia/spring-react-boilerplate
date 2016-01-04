package uk.co.blackpepper.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;

import static uk.co.blackpepper.utils.Functions.map;

public final class State {

	/** Populates standard parts of the shared client/server model into the Spring {@link Model}.
	 * Values prefixed with "__" will be made available to the JavaScript
	 * render function only. All other values will be passed in the client's state object.
	 */
	public static void populateStateIntoModel(Model model, HttpServletRequest request) {
		model.addAttribute("__requestPath", getRequestPath(request));
		model.addAttribute("auth", getAuthState());
	}

	/**
	 * Returns the request string, including the query fragment, so that it can be made available
	 * during server-side react-router rendering.
	 */
	private static String getRequestPath(HttpServletRequest request) {
		return request.getRequestURI() +
			(request.getQueryString() == null ? "" : "?" + request.getQueryString());
	}

	/**
	 * Returns a representation of the user's authentication state, in the shape expected by the client.
	 */
	public static Map<String, Object> getAuthState() {
		List<String> roles = getRoles();

		Map<String, Object> authState = new HashMap<>();
		authState.put("signedIn", !roles.contains("ROLE_ANONYMOUS"));
		authState.put("roles", roles);

		return authState;
	}

	/**
	 * Return a list of the current user's roles. If they are not authenticated then they will
	 * have "ROLE_ANONYMOUS".
	 */
	private static List<String> getRoles() {
		return map(
			SecurityContextHolder.getContext().getAuthentication().getAuthorities(),
			GrantedAuthority::getAuthority);
	}
}
