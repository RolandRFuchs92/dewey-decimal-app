import repoBase from 'components/page/repo.base';
import { all } from 'db/repo';
import { getStudentBooksHistory } from 'pages/books/book.repo';
import { StudentModel } from './Student.type';
import {
  getAllQuery,
  queryStudentDropdown,
  getStudentsWithBirthdaysQuery,
  getStudentSelectListSearchQuery
} from './Student.sql';
import { DropdownListModel } from 'types/Generic';

const repo = repoBase('student');

repo.getAll = async () => {
  return await all(getAllQuery);
};

export default repo;

export async function getSelectList() {
  const data = await all<DropdownListModel>(queryStudentDropdown);
  return data;
}

export async function getStudentProfileData(student_id: string) {
  const studentProfileDataQuery = `
        ${getAllQuery} 
        WHERE
            s.student_id = student_id
    `;
  const studentData = await all<StudentModel>(studentProfileDataQuery);
  const historyData = await getStudentBooksHistory(student_id);

  return { studentData, historyData };
}

export async function getStudentsWithBirthdays(date: string) {
  const statementObject = { $date: date };
  return await all(getStudentsWithBirthdaysQuery, statementObject);
}

export const getStudentSelectListSearch = async (value: string) => {
  const result = await all(getStudentSelectListSearchQuery, {
    $searchTerm: `%${value}%`
  });
  return result;
};
