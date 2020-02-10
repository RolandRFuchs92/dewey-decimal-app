CREATE TABLE IF NOT EXISTS dewey_summary (
	dewey_summary_id INTEGER PRIMARY KEY,
	summary_id INTEGER,
	name TEXT
);

CREATE TABLE IF NOT EXISTS dewey_summary_2(
	dewey_summary_2_id INTEGER PRIMARY KEY,
	summary_2_id INTEGER,
	summary_id INTEGER,
	name TEXT,
	CONSTRAINT fk_summary_id FOREIGN KEY(summary_id) REFERENCES dewey_summary(summary_id)
);

CREATE TABLE IF NOT EXISTS dewey_summary_3(
	dewey_summary_3_id INTEGER PRIMARY KEY,
	summary_3_id INTEGER,
	summary_2_id INTEGER,
	name TEXT,
	CONSTRAINT fk_summary_2_id FOREIGN KEY(summary_2_id) REFERENCES dewey_summary_2(summary_2_id)
);

CREATE TABLE IF NOT EXISTS dewey_decimal(
	dewey_decimal_id INTEGER PRIMARY KEY,
	summary_3_id INTEGER,
	decimal_id INTEGER,
	name TEXT,
	CONSTRAINT fk_summary_3_id FOREIGN KEY(summary_3_id) REFERENCES dewey_summary_3(summary_3_id)
);

CREATE TABLE IF NOT EXISTS author (
	author_id INTEGER PRIMARY KEY,
	name TEXT,
	second_name TEXT,
	surname TEXT
);

CREATE TABLE IF NOT EXISTS book (
	book_id INTEGER PRIMARY KEY,
	author_id INTEGER,
	dewey_decimal_id INTEGER,
	call_number TEXT,
	name TEXT,
	publisher TEXT, 
	created_on TEXT,
	CONSTRAINT fk_author_id FOREIGN KEY(author_id) REFERENCES author(author_id),
	CONSTRAINT fk_dewey_decimal_id FOREIGN KEY(dewey_decimal_id) REFERENCES dewey_decimal(dewey_decimal_id)
);