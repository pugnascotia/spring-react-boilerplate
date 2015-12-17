package uk.co.blackpepper.comments;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class CommentResource {

	private static final Logger LOG = LoggerFactory.getLogger(CommentResource.class);

	@Inject
	private CommentRepository repository;

	@RequestMapping(path = "/add", method = POST)
	public Comment add(@RequestBody Comment comment) {
		LOG.info("{}", comment);
		return repository.save(comment);
	}
}
