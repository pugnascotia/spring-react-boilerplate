package uk.co.blackpepper.utils;

import javax.servlet.http.HttpServletRequest;

public final class RequestUtils {

	public static String getRequestPath(HttpServletRequest request) {
		return request.getRequestURI() +
			(request.getQueryString() == null ? "" : "?" + request.getQueryString());
	}
}
