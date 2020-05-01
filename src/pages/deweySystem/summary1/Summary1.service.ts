import serviceBase from 'components/page/service.base';
import { DeweySummarySchema } from './Summary1.type';

export default serviceBase<DeweySummarySchema, DeweySummarySchema>(
  'dewey_summary'
);
