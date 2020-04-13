export const getAllQuery = `
SELECT
    bo.books_out_id,
    bo.book_id,
    bo.student_id,
    bo.check_out_date,
    bo.check_in_date,
    s.first_name || ' ' || s.last_name as student_name,
    b.name book_name,
    bo.return_on
FROM
    books_out bo
JOIN
    book b
    ON bo.book_id = b.book_id
JOIN
    student s
    ON bo.student_id = s.student_id`;

export const booksOverdueQuery = `
SELECT
	s.first_name || ' ' || s.last_name student_name,
	b.name book_name,
	a.name || ' ' || a.second_name || ' ' || a.surname author_name,
	bo.return_on
FROM	
	books_out bo
JOIN	
	book b
	ON bo.book_id = b.book_id
JOIN
	student s
	ON s.student_id = bo.student_id
JOIN
 	class c
	ON s.class_id = c.class_id
JOIN
	author a
	on b.author_id = a.author_id
WHERE
	STRFTIME('%Y-%m-%d',bo.return_on) <= STRFTIME('%Y-%m-%d', $date)
	AND bo.check_in_date IS NULL 
`;

export const scannsQuery = `
SELECT
    t.first_name || ' ' || t.last_name teacher,
    c.grade || c.class_name class,
    b.name book,
    a.name || ' ' || a.second_name || ' ' || a.surname author,
    s.first_name || ' ' || s.last_name student,
    bo.check_in_date,
    bo.check_out_date
FROM	
    books_out bo
JOIN
    book b
    ON bo.book_id = b.book_id
JOIN
    author a
    ON b.author_id = a.author_id
JOIN	
    student s
    ON bo.student_id = s.student_id
JOIN
    class c
    ON s.class_id = c.class_id
JOIN
    teacher t
    ON c.class_id = t.class_id
WHERE
    STRFTIME('%Y-%m-%d', bo.check_in_date) = STRFTIME('%Y-%m-%d', $date)
    OR STRFTIME('%Y-%m-%d', bo.check_out_date) = STRFTIME('%Y-%m-%d', $date)
`;

export const checkinBookQuery = `
    UPDATE books_out 
    SET
        check_in_date = $check_in_date
    WHERE
        books_out_id = $books_out_id
`;

export const checkoutBookQuery = `
    INSERT INTO books_out(book_id, student_id, return_on, check_out_date)
    VALUES($book_id, $student_id, $return_on, $check_out_date);
`;

export const countBooksCheckedOutTodayQuery = `SELECT COUNT(*) as count FROM books_out WHERE check_out_date =  STRFTIME('%Y-%m-%d', 'now')`;
export const countBooksCheckedInTodayQuery = `SELECT COUNT(*) as count FROM books_out WHERE check_in_date =  STRFTIME('%Y-%m-%d', 'now')`;
