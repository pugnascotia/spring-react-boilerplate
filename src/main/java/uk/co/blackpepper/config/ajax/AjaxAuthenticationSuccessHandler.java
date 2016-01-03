package uk.co.blackpepper.config.ajax;

import java.io.IOException;
import java.util.Map;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;
import uk.co.blackpepper.utils.StateUtils;

@Component
public class AjaxAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Inject
	private ObjectMapper mapper;

	/** Return 200 OK for successful AJAX authentications, plus user's roles */

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_OK);
		ServletOutputStream outputStream = response.getOutputStream();

		CsrfToken csrf = (CsrfToken) request.getAttribute("_csrf");
		if (csrf != null) {
			Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
			String token = csrf.getToken();
			if (cookie == null || token != null && !token.equals(cookie
				.getValue())) {
				cookie = new Cookie("XSRF-TOKEN", token);
				cookie.setPath("/");
				response.addCookie(cookie);
			}
		}

		Map<String, Object> authState = StateUtils.getAuthState();

		mapper.writeValue(outputStream, authState);

		outputStream.close();
	}
}
