

CREATE TABLE IF NOT EXISTS dewey_summary (
	dewey_summary_id INTEGER PRIMARY KEY,
	summary_id INTEGER,
	name TEXT
);

CREATE TABLE IF NOT EXISTS dewey_summary_2 (
	dewey_summary_2_id INTEGER PRIMARY KEY,
	summary_2_id INTEGER,
	summary_id INTEGER,
	name TEXT,
	CONSTRAINT fk_summary_id FOREIGN KEY(summary_id) REFERENCES dewey_summary(summary_id)
);

CREATE TABLE IF NOT EXISTS dewey_summary_3 (
	dewey_summary_3_id INTEGER PRIMARY KEY,
	summary_3_id INTEGER,
	summary_2_id INTEGER,
	name TEXT,
	CONSTRAINT fk_summary_2_id FOREIGN KEY(summary_2_id) REFERENCES dewey_summary_2(summary_2_id)
);

CREATE TABLE IF NOT EXISTS dewey_decimal (
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

CREATE TABLE IF NOT EXISTS student ( 
	student_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate TEXT NOT NULL,
	mother_name text,
	mother_mobile TEXT,
	mother_email TEXT,
	father_name TEXT,
	father_mobile TEXT,
	father_email TEXT,
	class_id INTEGER NOT NULL,
	is_active INTEGER NOT NULL,
	CONSTRAINT fk_class_id FOREIGN KEY(class_id) REFERENCES class(class_id)
);

CREATE TABLE IF NOT EXISTS teacher (
	teacher_id INTEGER PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	mobile TEXT,
	email TEXT,
    class_id INTEGER,
    is_active INTEGER,
    CONSTRAINT fk_class_id FOREIGN KEY(class_id) REFERENCES class(class_id)
);

 CREATE TABLE IF NOT EXISTS class (
	class_id INTEGER PRIMARY KEY,
	class_name TEXT,
	grade INTEGER,
	is_active INTEGER
);


CREATE TABLE IF NOT EXISTS  books_out(
	books_out_id INTEGER PRIMARY KEY,
	book_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	check_out_date INTEGER NOT NULL,
	check_in_date INTEGER,
	CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES book(book_id),
	CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES student(student_id)
)