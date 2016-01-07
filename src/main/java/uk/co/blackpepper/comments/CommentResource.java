package uk.co.blackpepper.comments;

import java.util.List;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.blackpepper.utils.Functions;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class CommentResource {

	private static final Logger LOG = LoggerFactory.getLogger(CommentResource.class);

	@Inject
	private CommentRepository repository;

	@RequestMapping(path = "/comments", method = POST)
	public Comment add(@RequestBody Comment comment) {
		LOG.info("{}", comment);
		return repository.save(comment);
	}

	@RequestMapping(path = "/comments", method = GET)
	public List<Comment> comments() {
		// You shouldn't do this in a real app - you should page the data.
		return Functions.map(repository.findAll(), c -> c);
	}
}
