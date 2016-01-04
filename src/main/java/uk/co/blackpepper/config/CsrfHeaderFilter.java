package uk.co.blackpepper.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;
import uk.co.blackpepper.utils.Cookies;

public class CsrfHeaderFilter extends OncePerRequestFilter {

	/** Ensure that if a request does not supply a CSRF token in a cookie, or
	 * if the token is not up-to-date, we set it in our response so that subsequent
	 * requests can succeed. */

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		Cookies.setSecurityTokens(request, response);
		filterChain.doFilter(request, response);
	}
}
