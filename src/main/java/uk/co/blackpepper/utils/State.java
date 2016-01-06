package uk.co.blackpepper.utils;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;

import static uk.co.blackpepper.utils.Functions.map;

public final class State {

	/** Populates standard parts of the shared client/server model into the Spring {@link Model}.
	 * Values prefixed with "__" will be made available to the JavaScript
	 * render function only. All other values will be passed in the client's state object.
	 */
	public static void populateStateIntoModel(Model model, HttpServletRequest request) {
		model.addAttribute("__requestPath", getRequestPath(request));
		model.addAttribute("auth", getAuthState(request));
	}

	/**
	 * Returns the request string, including the query fragment, so that it can be made available
	 * during server-side react-router rendering.
	 */
	private static String getRequestPath(HttpServletRequest request) {
		String queryString = request.getQueryString();
		return request.getRequestURI() + (queryString == null ? "" : "?" + queryString);
	}

	/**
	 * Returns a representation of the user's authentication state, in the shape expected by the client.
	 */
	public static Map<String, Object> getAuthState(HttpServletRequest request) {
		Optional<List<String>> optionalRoles = getRoles(request);

		return optionalRoles.map(roles -> {
			Map<String, Object> authState = new HashMap<>();
			authState.put("signedIn", !roles.contains("ROLE_ANONYMOUS"));
			authState.put("roles", roles);

			return authState;
		})
		.orElseGet(() -> {
			Map<String, Object> authState = new HashMap<>();
			authState.put("signedIn", false);
			authState.put("roles", Collections.singletonList("ROLE_ANONYMOUS"));

			return authState;
		});
	}

	/**
	 * Return a list of the current user's roles. If they are not authenticated then they will
	 * have "ROLE_ANONYMOUS".
	 */
	private static Optional<List<String>> getRoles(HttpServletRequest request) {
		return getAuthentication(request)
			.map(a -> map(a.getAuthorities(), GrantedAuthority::getAuthority));
	}

	/**
	 * Getting the current authentication object ought to be easy, by getting a context with
	 * {@link SecurityContextHolder#getContext()}, then calling {@link SecurityContext#getAuthentication()}.
	 * However there are circumstances where that doesn't work reliably, such as when handling
	 * exceptions. This method makes several attempts to get an {@link Authentication} instance.
	 */
	private static Optional<Authentication> getAuthentication(HttpServletRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null) {
			RequestAttributes requestAttributes = new ServletRequestAttributes(request);
			SecurityContext securityContext = (SecurityContext) requestAttributes.getAttribute("SPRING_SECURITY_CONTEXT", RequestAttributes.SCOPE_SESSION);
			if (securityContext == null) {
				securityContext = (SecurityContext) requestAttributes.getAttribute("SPRING_SECURITY_CONTEXT", RequestAttributes.SCOPE_GLOBAL_SESSION);
			}
			if (securityContext != null) {
				authentication = securityContext.getAuthentication();
			}
		}

		return Optional.ofNullable(authentication);
	}
}
