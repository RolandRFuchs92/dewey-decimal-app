import { get } from 'utils/ajax';
import { student } from 'endpoints.json';
import { BirthdaysType } from 'pages/home/Home.type';
import {
  StudentCardProps,
  StudentSearchGET,
  StudentProfileGET,
  TableStudentSchema,
  StudentSchema
} from './Student.type';
import { Result, DropdownListModel, CountObj } from 'types/generic.type';
import serviceBase from 'components/page/service.base';

export default serviceBase<TableStudentSchema, StudentSchema>('student');

export async function getBirthdaysTodayCount(): Promise<Result<CountObj>> {
  try {
    const result = await get<{}, CountObj>(student.birthdayscount.uri);
    return result;
  } catch (error) {
    return {
      result: {
        count: 0
      }
    };
  }
}

export async function getSelectList() {}

export async function getBirthdaysToday(): Promise<BirthdaysType[]> {
  try {
    const { result } = await get<{}, BirthdaysType[]>(student.birthdays.uri);
    return result!;
  } catch (error) {
    return [];
  }
}

export async function getStudentProfile(
  student_id: number
): Promise<Result<StudentCardProps>> {
  try {
    const param: StudentProfileGET = {
      student_id
    };
    const result = await get<StudentProfileGET, StudentCardProps>(
      student.profile.uri,
      param
    );
    return result;
  } catch (error) {
    return {
      message:
        'There was an error finding this student, please try again later.',
      result: {
        historyData: [],
        studentData: undefined
      }
    };
  }
}

export async function studentSearch(
  namepart: string
): Promise<Result<DropdownListModel[]>> {
  try {
    const param: StudentSearchGET = {
      namepart
    };
    const studentResult = await get<StudentSearchGET, DropdownListModel[]>(
      student.search.uri,
      param
    );
    return studentResult;
  } catch (error) {
    return {
      message: 'There was an error while searching.',
      result: []
    };
  }
}
