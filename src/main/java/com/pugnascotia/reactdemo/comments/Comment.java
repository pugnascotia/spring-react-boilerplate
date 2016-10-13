package com.pugnascotia.reactdemo.comments;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple data container class. We need a no-args constructor so that Jackson
 * can deserialise these.
 */
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
