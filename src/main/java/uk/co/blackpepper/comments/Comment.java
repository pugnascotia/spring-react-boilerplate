package uk.co.blackpepper.comments;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Comment {
	private Long id;
	private String author;
	private String content;

	public Comment(String author, String content) {
		setAuthor(author);
		setContent(content);
	}
}
