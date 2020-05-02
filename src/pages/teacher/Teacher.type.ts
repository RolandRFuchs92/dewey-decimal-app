import { DatatabelDataModel } from 'components/page/PageBase.type';
import { TeacherRepoModel } from './Teacher.repo';

export interface TeacherSchema {
  first_name: string;
  last_name: string;
  teacher_id: string;
  teacherName: string;
  is_active: boolean;
  mobile: string;
  email: string;
  class_id: number;
}

export type TableTeacherSchema = TeacherSchema;

export type TeacherModalProps = {
  isOpen: boolean;
  teacher: DatatabelDataModel<TeacherSchema>;
  reset: () => void;
  handleClose: () => void;
};
