package uk.co.blackpepper.config;

import javax.inject.Inject;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import uk.co.blackpepper.config.ajax.AjaxAuthenticationFailureHandler;
import uk.co.blackpepper.config.ajax.AjaxAuthenticationSuccessHandler;
import uk.co.blackpepper.config.ajax.AjaxLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Inject
	private AjaxAuthenticationSuccessHandler authSuccessHandler;

	@Inject
	private AjaxAuthenticationFailureHandler authFailureHandler;

	@Inject
	private AjaxLogoutSuccessHandler logoutSuccessHandler;

	/**
	 * Demo-only users. Replace this with a real authentication config.
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("user").password("password").roles("USER").and()
			.withUser("admin").password("admin").roles("USER", "ADMIN");
	}

	/**
	 * Specify the path that Spring Security will completely ignore. This is distinct
	 * from paths that are available to all users.
	 */
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/js/**", "/favicon.ico");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/", "/signin", "/api/account").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/signin")
				.loginProcessingUrl("/api/authenticate")
				.successHandler(authSuccessHandler)
				.failureHandler(authFailureHandler)
				.permitAll()
			.and()
				.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
				.csrf().csrfTokenRepository(csrfTokenRepository())
			.and()
				.logout()
				.logoutUrl("/signout")
				.logoutSuccessHandler(logoutSuccessHandler)
				.permitAll();
	}

	/**
	 * Change the standard CSRF token header name to match what the front-end code expects.
	 * See also {@link CsrfHeaderFilter}.
	 */
	private static CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}
}
