import baseRepo from 'components/page/repo.base';
import { all } from 'db/repo';
import { DropdownListModel } from 'components/page/PageBase.type';

const repo = baseRepo(`dewey_summary_2`);

const getAllQuery = `
    SELECT
        ds2.dewey_summary_2_id,
        ds2.summary_2_id,
        ds2.summary_id,
        ds2.name,
        ds.name as dewey_summary_name
    FROM
        dewey_summary_2 ds2
    JOIN
        dewey_summary ds
        ON ds2.summary_id = ds.summary_id
`;

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

const getSelectListQuery = `
SELECT
    summary_2_id as value,
    name as text
FROM 
    dewey_summary_2
`;

export const getSelectList = async () => {
  return ((await all(getSelectListQuery)) as unknown) as DropdownListModel[];
};
