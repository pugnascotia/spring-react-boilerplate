package uk.co.blackpepper.config;

import javax.script.ScriptEngine;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

/**
 * Configures how Spring will render views to the client.
 */
@Configuration
public class ViewConfig {

	/**
	 * These are scripts needed to render a React application.
	 * <ul>
	 *     <li><code>polyfill.js</code> - implements some standard functions from a browser / NodeJS environment</li>
	 *     <li><code>ejs.min.js</code> - EJS, a small JavaScript rendering library</li>
	 *     <li><code>render.js</code> - code that invokes EJS with the correct values</li>
	 *     <li><code>bundle.js</code> - all our application code, bundled up by Webpack</li>
	 * </ul>
	 */
    private static final String[] scripts = {
        "static/js/polyfill.js",
        "static/js/ejs.min.js",
        "static/js/render.js",
        "static/js/bundle.js"
    };

	/**
	 * Configures where to find the views that we can render. We actually only have one, "index.ejs".
	 */
    @Bean
    public ViewResolver reactViewResolver() {
        ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();
        viewResolver.setPrefix("templates/");
        viewResolver.setSuffix(".ejs");
        return viewResolver;
    }

	/**
	 * Configures the {@link ScriptEngine} that will render our views.
	 */
    @Bean
    public ScriptTemplateConfigurer reactConfigurer() {
        ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
        configurer.setEngineName("nashorn");

		/* Initialise the ScriptEngine with these scripts. */
        configurer.setScripts(scripts);

		/* The ScriptEngine will call this function to perform the render */
        configurer.setRenderFunction("render");

		/* We cannot share a ScriptEngine between threads when rendering React applications */
        configurer.setSharedEngine(false);

        return configurer;
    }
}
