import { DatatabelDataModel } from 'components/page/PageBase.type';
import { TeacherRepoModel } from './Teacher.repo';

export interface TeacherSchema {
  teacher_id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  class_id: number;
  is_active: boolean;
}

export type TableTeacherSchema = {} & TeacherSchema;

export type TeacherModalProps = {
  isOpen: boolean;
  teacher: DatatabelDataModel<TeacherSchema>;
  reset: () => void;
  handleClose: () => void;
};
