export const queryGetClasses = `
SELECT 
    * 
FROM 
    class
WHERE 
    is_active = 1
`;

export const queryHideClass = `
UPDATE 
    class 
SET 
    is_active = 0
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
