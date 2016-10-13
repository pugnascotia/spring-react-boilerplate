package com.pugnascotia.reactdemo.utils;

import java.util.Spliterator;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * Utilities for working with streams. See also {@link Functions}.
 */
public class Streams {

	/**
	 * Wrapper around {@link #asStream(Iterable, boolean)} that sets 'parallel' to false.
	 */
	public static <T> Stream<T> asStream(Iterable<T> iterable) {
		return asStream(iterable, false);
	}

	/**
	 * Return a {@link Stream} for the supplied {@link Iterable}, since iterables by themselves can only
	 * give a {@link Spliterator}.
	 * @param iterable the object to stream.
	 * @param parallel whether to return a parallel stream or not.
	 */
	public static <T> Stream<T> asStream(Iterable<T> iterable, boolean parallel) {
		return iterable == null ? null : StreamSupport.stream(iterable.spliterator(), parallel);
	}
}
