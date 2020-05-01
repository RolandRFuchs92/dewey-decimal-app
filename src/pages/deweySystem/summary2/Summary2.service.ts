import serviceBase from 'components/page/service.base';
import { DeweySummary2Schema, TableDeweySummary2Schema } from './Summary2.type';

export default serviceBase<TableDeweySummary2Schema, DeweySummary2Schema>(
  'dewey_summary_2'
);
