package uk.co.blackpepper.comments;

public interface CommentRepository {

	Iterable<Comment> findAll();

	Comment save(Comment comment);

	Comment find(Long id);
}
