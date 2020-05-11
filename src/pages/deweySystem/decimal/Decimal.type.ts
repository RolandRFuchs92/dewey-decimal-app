export type TableDeweyDecimalSchema = {
  dewey_decimal_id?: number;
  summary_3_id: number;
  decimal_id: number;
  name: string;
  dewey_summary_3_name: string;
};

export type DeweyDecimalSchema = Omit<
  TableDeweyDecimalSchema,
  'dewey_summary_3_name'
>;

export const decimalSchemaArray: (keyof DeweyDecimalSchema)[] = [
  'decimal_id',
  'dewey_decimal_id',
  'name',
  'summary_3_id'
];
