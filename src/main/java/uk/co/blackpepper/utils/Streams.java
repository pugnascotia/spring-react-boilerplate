package uk.co.blackpepper.utils;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class Streams {

	public static <T> Stream<T> asStream(Iterable<T> iterable) {
		return asStream(iterable, false);
	}

	public static <T> Stream<T> asStream(Iterable<T> iterable, boolean parallel) {
		return iterable == null ? null : StreamSupport.stream(iterable.spliterator(), parallel);
	}
}
