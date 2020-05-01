import serviceBase from 'components/page/service.base';
import { TableDeweyDecimalSchema } from './Decimal.type';

export default serviceBase<TableDeweyDecimalSchema, TableDeweyDecimalSchema>(
  'dewey_decimal'
);
