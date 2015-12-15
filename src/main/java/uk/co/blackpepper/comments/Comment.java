package uk.co.blackpepper.comments;

import lombok.Data;

@Data
public class Comment {
	private Long id;
	private final String author;
	private final String content;
}
