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

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("user").password("password").roles("USER").and()
			.withUser("admin").password("admin").roles("USER", "ADMIN");
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/js/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/", "/signin").permitAll()
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

	private static CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}
}
