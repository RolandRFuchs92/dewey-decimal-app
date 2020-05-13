import { DeweyDecimalSchema } from '../decimal/Decimal.type';

export type TableDeweySummary2Schema = {
  dewey_summary_2_id: number;
  summary_2_id: number;
  summary_id: number;
  name: string;
  dewey_summary_name: string;
};

export type DeweySummary2Schema = {
  dewey_summary_2_id: number;
  summary_2_id: number;
  summary_id: number;
  name: string;
};

export const deweySummary2SchemaArray: (keyof DeweySummary2Schema)[] = [
  'dewey_summary_2_id',
  'name',
  'summary_2_id',
  'summary_id'
];
