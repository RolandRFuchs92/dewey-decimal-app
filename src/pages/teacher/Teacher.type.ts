import { DataTableDataModel } from 'components/page/PageBase.type';

export interface TeacherSchema {
  teacher_id?: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  class_id: number;
  is_active: boolean;
}

export const teacherSchemaArray: Array<keyof TeacherSchema> = [
  'teacher_id',
  'first_name',
  'last_name',
  'email',
  'mobile',
  'is_active',
  'class_id'
];

export type TeacherRepoModel = {
  teacher_id: string;
  is_active: boolean | 0 | 1;
};

export type TableTeacherSchema = {} & TeacherSchema;

export type TeacherModalProps = {
  isOpen: boolean;
  teacher: DataTableDataModel<TeacherSchema>;
  reset: () => void;
  handleClose: () => void;
};
