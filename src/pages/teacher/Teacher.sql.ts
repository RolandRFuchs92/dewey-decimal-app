export const queryAllTeachers = `
SELECT
    teacher_id,
    first_name,
    last_name,
    mobile,
    email,
    class_id,
    is_active
FROM
    teacher
WHERE
    is_active = 1;
`;

export const queryHideTeacher = `
DELETE 
FROM 
    teacher
WHERE
    teacher_id = $teacher_id
`;

export const querySelectListTeachers = `
    SELECT
        teacher_id,
        first_name
    FROM
        teacher
    WHERE
        is_active = 1
    ORDER BY 
        teacher_id ASC
`;
