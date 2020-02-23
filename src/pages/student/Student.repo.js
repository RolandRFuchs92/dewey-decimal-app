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
    const historyData = await getStudentBooksHistory(student_id);

    return { studentData, historyData}

}

const getStudentsWithBirthdaysQuery = `
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
`

export async function getStudentsWithBirthdays(date) {
    const statementObject = { $date: date };
    return await all(getStudentsWithBirthdaysQuery, statementObject);
}

const getStudentSelectListSearchQuery = `
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

export const getStudentSelectListSearch = async value => {
    const result = await all(getStudentSelectListSearchQuery, { $searchTerm : `%${value}%` })
    return result;
}