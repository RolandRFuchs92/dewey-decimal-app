import serviceBase from 'components/page/service.base';
import { TableDeweyDecimalSchema, DeweyDecimalSchema } from './Decimal.type';

export default serviceBase<TableDeweyDecimalSchema, DeweyDecimalSchema>(
  'dewey_decimal'
);
