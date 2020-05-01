export type TableDeweyDecimalSchema = {
  dewey_decimal_id: number;
  summary_3_id: number;
  decimal_id: number;
  name: string;
  dewey_summary_3_name: string;
};

export type DeweyDecimalSchema = Omit<
  TableDeweyDecimalSchema,
  'dewey_summary_3_name'
>;
