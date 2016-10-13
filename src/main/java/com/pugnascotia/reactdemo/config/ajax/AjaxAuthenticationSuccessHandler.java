package com.pugnascotia.reactdemo.config.ajax;

import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.pugnascotia.reactdemo.utils.Cookies;
import com.pugnascotia.reactdemo.utils.State;

/**
 * A handler that returns HTTP 200 OK for successful AJAX authentications,
 * and includes the user's roles in the response body.
 */

@Component
public class AjaxAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final ObjectMapper mapper;

	@Inject
	public AjaxAuthenticationSuccessHandler(ObjectMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_OK);
		Cookies.setSecurityTokens(request, response);

		ServletOutputStream outputStream = response.getOutputStream();

		mapper.writeValue(outputStream, State.getAuthState(request));

		outputStream.close();
	}
}
