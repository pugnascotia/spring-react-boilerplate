package uk.co.blackpepper.comments;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public class InMemoryCommentRepository implements CommentRepository {

	private static AtomicLong counter = new AtomicLong();

	private final ConcurrentMap<Long, Comment> comments = new ConcurrentHashMap<>();

	@PostConstruct
	public void populateRepository() {
		this.save(new Comment("Brian Clozel", "This is a test!"));
		this.save(new Comment("Stéphane Nicoll", "This is a test too!"));
	}

	@Override
	public Comment save(Comment comment) {
		Long id = comment.getId();
		if (id == null) {
			id = counter.incrementAndGet();
			comment.setId(id);
		}
		this.comments.put(id, comment);
		return comment;
	}

	@Override
	public Comment find(Long id) {
		return this.comments.get(id);
	}

	@Override
	public Iterable<Comment> findAll() {
		return this.comments.values();
	}
}
