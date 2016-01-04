package uk.co.blackpepper.account;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.blackpepper.utils.StateUtils;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class AccountResource {

	@RequestMapping("/account")
	public Map<String,Object> getAccountStatus() {
		return StateUtils.getAuthState();
	}

}
