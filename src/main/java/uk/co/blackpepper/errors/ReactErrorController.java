package uk.co.blackpepper.errors;

import java.util.Map;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.autoconfigure.web.AbstractErrorController;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import uk.co.blackpepper.utils.State;

/**
 * Largely pinched from {@link org.springframework.boot.autoconfigure.web.BasicErrorController}
 * and customised to render our React template, along with an appropriate populated state.
 */

@Controller
@RequestMapping("/error")
public class ReactErrorController extends AbstractErrorController {

	private final ServerProperties serverProperties;

	@Inject
	public ReactErrorController(ErrorAttributes errorAttributes, ServerProperties serverProperties) {
		super(errorAttributes);
		this.serverProperties = serverProperties;
	}

	/**
	 * Render the standard template, but include all the error information we know about. In
	 * a production application, you may not want to pass all that information to the client.
	 */
	@RequestMapping(produces = "text/html")
	public String errorHtml(Model model, HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(getStatus(request).value());
		model.addAttribute("errors", getErrorAttributes(request, isIncludeStackTrace(request)));

		State.populateStateIntoModel(model, request);

		return "index";
	}

	@RequestMapping
	@ResponseBody
	public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
		Map<String, Object> body = getErrorAttributes(request, isIncludeStackTrace(request));
		HttpStatus status = getStatus(request);
		return new ResponseEntity<>(body, status);
	}

	@Override
	public String getErrorPath() {
		return this.serverProperties.getError().getPath();
	}

	/**
	 * Determine if the stacktrace attribute should be included.
	 * @param request the source request
	 * @return if the stacktrace attribute should be included
	 */
	protected boolean isIncludeStackTrace(HttpServletRequest request) {
		ErrorProperties.IncludeStacktrace include = serverProperties.getError().getIncludeStacktrace();
		if (include == ErrorProperties.IncludeStacktrace.ALWAYS) {
			return true;
		}
		if (include == ErrorProperties.IncludeStacktrace.ON_TRACE_PARAM) {
			return getTraceParameter(request);
		}
		return false;
	}
}
