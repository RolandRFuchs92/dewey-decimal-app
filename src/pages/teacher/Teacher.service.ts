import serviceBase from 'components/page/service.base';
import { TableTeacherSchema, TeacherSchema } from './Teacher.type';

export default serviceBase<TableTeacherSchema, TeacherSchema>('teacher');
