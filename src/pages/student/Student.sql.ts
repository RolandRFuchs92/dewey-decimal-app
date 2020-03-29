export const queryStudentDropdown = `
	SELECT
        s.student_id as value,
        s.first_name || ' ' || s.last_name || '- Grade ' || c.grade ||  SUBSTR(c.class_name, 1, 2)  text
	FROM
		student s
	JOIN
		class c
		ON s.class_id = c.class_id
`;

export const getStudentsWithBirthdaysQuery = `
    SELECT
        s.first_name,
        s.last_name,
        s.birthdate,
        c.grade,
        c.class_name,
        t.first_name || ' ' || t.last_name as teacher
    FROM	
        student s
    JOIN
        class c
        on s.class_id = c.class_id
    JOIN
        teacher t
        on c.class_id = t.class_id
    WHERE
        strftime('%d %m', s.birthdate) = STRFTIME('%d %m', $date)
`;

export const getStudentsWithBirthdaysCountQuery = `
    SELECT
        COUNT(*)
    FROM
        student s
    WHERE
        strftime('%d %m', s.birthdate) = STRFTIME('%d %m', $date)
`;

export const getStudentSelectListSearchQuery = `
    SELECT
        c.grade || c.class_name || ' - ' || s.first_name || ' '  || s.last_name as text,
        s.student_id value,
        c.grade || c.class_name class,
        t.first_name || ' ' || t.last_name teacher
    FROM
        student s 
    JOIN
        class c
        ON s.class_id = c.class_id
    JOIN
        teacher t
        ON c.class_id = t.class_id
    WHERE
        (c.grade || c.class_name || ' - ' || s.first_name || ' '  || s.last_name) LIKE $searchTerm
`;

export const getAllQuery = `
    SELECT
        s.student_id,
        s.first_name,
        s.last_name,
        s.birthdate,
        s.mother_name,
        s.mother_mobile,
        s.mother_email,
        s.father_name,
        s.father_mobile,
        s.father_email,
        s.class_id,
        s.is_active,
        c.class_name,
        c.grade
    FROM
        student s
    JOIN
        class c
        on s.class_id = c.class_id
`;
