export const getBookByCallNumberQuery = `
SELECT
  bo.books_out_id,
  b.book_id,
	b.name book_name,
	a.name || ' ' || a.second_name || ' ' || a.surname author_name,
	b.call_number,
	s.first_name || ' ' || s.last_name student_name,
	c.grade || ' ' || c.class_name class,
	t.first_name || ' ' || t.last_name teacher_name,
	bo.check_out_date,
	bo.return_on,
	bo.check_in_date
FROM	
	book b
JOIN
	author a
	ON b.author_id = a.author_id
LEFT JOIN
	books_out bo
  ON b.book_id = bo.book_id
  AND bo.check_in_date IS NULL
LEFT JOIN
	student s
	ON bo.student_id = s.student_id
LEFT JOIN
	class c
	ON s.class_id = c.class_id
LEFT JOIN
	teacher t
	ON c.class_id = t.class_id
WHERE	
  b.call_number = $call_number
`;

export const getStudentBooksHistoryQuery = `
SELECT	
  bo.student_id,
  a.name || ' ' || a.second_name || ' '|| a.surname author_name,
  b.name as book_name,
  bo.check_out_date,
  bo.check_in_date,
  bo.return_on
FROM	
  books_out bo
JOIN
  book b
  on bo.book_id = b.book_id	
JOIN
  author a
  on b.author_id = a.author_id
WHERE
  student_id = $student_id
ORDER by 
	bo.check_out_date DESC
`;

export const getBooksSelectListQuery = `
  SELECT
    book_id,
    name,
    call_number
  FROM
    book
`;

export const getAllQuery = `
SELECT	
  b.book_id,
  a.author_id,
  dd.decimal_id,
  dd.name as dewey_decimal_name,
  a.name || ' ' || a.surname as author_name,
  b.call_number,
  b.name,
  b.publisher
FROM
  book b
JOIN
  author   a
  ON b.author_id = a.author_id
JOIN
  dewey_decimal dd
  ON b.decimal_id = dd.decimal_id
`;
