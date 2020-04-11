import { format } from 'date-fns';

import repoBase from 'components/page/repo.base';
import { all, single } from 'db/repo';
import { getStudentBooksHistory } from 'pages/books/Book.repo';
import { DropdownListModel } from 'types/generic.type';
import appSettings from 'appSettings.json';

import {
  StudentModel,
  GetStudentsWithBirthdaysModel,
  StudentSelectListSearchModel
} from './Student.type';
import {
  getAllQuery,
  queryStudentDropdown,
  getStudentsWithBirthdaysQuery,
  getStudentSelectListSearchQuery,
  getStudentsWithBirthdaysCountQuery
} from './Student.sql';

const repo = repoBase<StudentModel>('student', 'student_id');

repo.getAll = async () => {
  return await all<StudentModel>(getAllQuery);
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
            s.student_id = $student_id
    `;
  const studentDataStatementObject = { $student_id: student_id };

  const studentData = await all<StudentModel>(
    studentProfileDataQuery,
    studentDataStatementObject
  );
  const historyData = await getStudentBooksHistory(student_id);

  return { studentData, historyData };
}

export async function getStudentsWithBirthdays(date: string) {
  const statementObject = { $date: date };
  return await all<GetStudentsWithBirthdaysModel>(
    getStudentsWithBirthdaysQuery,
    statementObject
  );
}

export async function countStudentsWithBirthdayToday(date = new Date()) {
  const statementObject = { $date: format(date, appSettings.formatDate.to) };
  return await single(getStudentsWithBirthdaysCountQuery, statementObject);
}

export const getStudentSelectListSearch = async (value: string) => {
  const result = await all<StudentSelectListSearchModel>(
    getStudentSelectListSearchQuery,
    {
      $searchTerm: `%${value}%`
    }
  );
  return result;
};
