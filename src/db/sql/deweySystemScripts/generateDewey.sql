CREATE TABLE IF NOT EXISTS dewey_classification (
	dewey_classification_id INTEGER PRIMARY KEY,
	classification_id INTEGER,
	name TEXT
);

CREATE TABLE IF NOT EXISTS dewey_subdivision_1(
	dewey_subdivision_id INTEGER PRIMARY KEY,
	classification_id INTEGER,
	sub_division_id INTEGER
	name TEXT,
	CONSTRAINT fk_classification_id FOREIGN KEY(classification_id) REFERENCES dewey_classification(classification_id)
);

CREATE TABLE IF NOT EXISTS dewey_section(
	dewey_section_id INTEGER PRIMARY KEY,
	sub_division_id INTEGER,
	section_id INTEGER,
	name TEXT,
	CONSTRAINT fk_subdivision_id FOREIGN KEY(sub_division_id) REFERENCES dewey_subdivision_1(sub_division_id)
);

CREATE TABLE IF NOT EXISTS dewey_decimal(
	dewey_decimal_id INTEGER PRIMARY KEY,
	section_id INTEGER,
	decimal_id INTEGER,
	name TEXT,
	CONSTRAINT fk_section_id FOREIGN KEY(section_id) REFERENCES dewey_section(section_id)
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
	CONSTRAINT fk_dewey_decimal_id FOREIGN KEY(dewey_decimal_id) REFERENCES dewey_decimal(dewey_decimal_id),
);