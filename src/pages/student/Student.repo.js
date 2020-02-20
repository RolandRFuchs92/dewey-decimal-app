import { startCase } from 'lodash';

import repoBase from 'components/page/repo.base';
import appSettings from 'appSettings';
import { all } from 'db/repo';
import { getStudentBooksHistory } from 'pages/books/book.repo';

const {tables: {student: {pk, name}}} = appSettings;
const repo = repoBase(name);

const getAllQuery = `
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
`

repo.getAll = async () => {
    return await all(getAllQuery);
}
export default repo;

const queryStudentDropdown = `
	SELECT
		${appSettings.tables.student.pk},
		first_name,
		last_name,
		class_name, 
		grade
	FROM
		student s
	JOIN
		class c
		ON s.class_id = c.class_id
`;

export async function getSelectList() {
	const data = await all(queryStudentDropdown);
	return data.map(({[appSettings.tables.student.pk]: pk,first_name, last_name, class_name, grade}) => {
		return {
			value: pk,
			text: `${startCase(first_name)} ${last_name} - Grade ${grade}${startCase(class_name.substr(0,2))}`
		}
	});
}

export async function getStudentProfileData(student_id) {
    const studentProfileDataQuery = `
        ${getAllQuery} 
        WHERE
            s.student_id = student_id
    `;
    const studentData = await all(studentProfileDataQuery);
    const historyData = await getStudentBooksHistory();

    return { studentData, historyData}

}