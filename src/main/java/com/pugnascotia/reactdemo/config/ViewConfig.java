package com.pugnascotia.reactdemo.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;
import javax.script.ScriptEngine;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

/**
 * Configures how Spring will render views to the client.
 */
@Configuration
public class ViewConfig {

	@Inject
	private ResourceLoader resourceLoader;

	@Inject
	private ObjectMapper mapper;

	/**
	 * Configures where to find the views that we can render. Since we
	 * actually do all the rendering in 'render.js', we only have a single
	 * placeholder file.
	 */
    @Bean
    public ViewResolver reactViewResolver() {
        ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();
        viewResolver.setPrefix("templates/");
        viewResolver.setSuffix(".txt");
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
        configurer.setScripts(getScripts());

		/* The ScriptEngine will call this function to perform the render */
        configurer.setRenderFunction("render");

		/* We cannot share a ScriptEngine between threads when rendering React applications */
        configurer.setSharedEngine(false);

        return configurer;
	}

	/**
	 * These are the scripts needed to render our React application.
	 * <ul>p
	 *   <li><code>polyfill.js</code> - implements some standard functions from a browser / NodeJS environment</li>
	 *   <li><code>renderer.js</code> - code that renders the page with the correct values</li>
	 *   <li><code>main.[hash].js</code> - all our application code, bundled up by Webpack, with a hashcode in the name</li>
	 * </ul>
	 */
	private String[] getScripts() {
		return new String[] {
			"js/polyfill.js",
			"js/renderer.js",
			getBundleName()
		};
	}

	@SneakyThrows(IOException.class)
	private String getBundleName() {
		Resource manifestResource = resourceLoader.getResource("classpath:public/asset-manifest.json");

		TypeReference<HashMap<String,String>> typeRef = new TypeReference<HashMap<String,String>>() {};
		Map<String, String> manifest = mapper.readValue(manifestResource.getFile(), typeRef);

		return "public/" + manifest.get("main.js");
	}
}
