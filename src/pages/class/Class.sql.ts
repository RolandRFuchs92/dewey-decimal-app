export const queryGetClasses = `
SELECT 
    class_id,
    class_name,
    grade,
    is_active
FROM 
    class
`;

export const queryHideClass = `
DELETE 
FROM
    class 
WHERE
    class_id=$class_id
`;

export const getSelectListQuery = `
SELECT
    class_id value,
    grade || ' - ' || class_name as text
FROM
    class
`;
