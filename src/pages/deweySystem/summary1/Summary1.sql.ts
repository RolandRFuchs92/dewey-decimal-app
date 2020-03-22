export const getAllData = `
    SELECT
        dewey_summary_id,
        summary_id,
        name
    FROM 
        dewey_summary
`;

export const deleteRowQuery = `
    DELETE
    FROM
        dewey_summary
    WHERE
        dewey_summary_id=$id
`;
export const getSelectListQuery = `
    SELECT
        summary_id as value,
        name as text
    FROM
        dewey_summary
`;
