package uk.co.blackpepper.config.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class AjaxLogoutSuccessHandler implements LogoutSuccessHandler {

	/** Return 200 OK for successful AJAX logout */

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_OK);
	}
}
