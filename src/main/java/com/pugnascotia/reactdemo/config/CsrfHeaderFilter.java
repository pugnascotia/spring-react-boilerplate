package com.pugnascotia.reactdemo.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;
import com.pugnascotia.reactdemo.utils.Cookies;

/**
 * This filter ensures that if a request does not supply a CSRF token in a cookie,
 * or if the token is not up-to-date, we set it in our response so that subsequent
 * requests can succeed.
 */

class CsrfHeaderFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		Cookies.setSecurityTokens(request, response);
		filterChain.doFilter(request, response);
	}
}
