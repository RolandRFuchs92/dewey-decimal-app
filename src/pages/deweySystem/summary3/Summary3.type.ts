export type TableDeweySummary3Schema = {
  dewey_summary_3_id: number;
  summary_3_id: number;
  summary_2_id: number;
  name: string;
  dewey_summary_2_name: string;
};

export type DeweySummary3Schema = Omit<
  TableDeweySummary3Schema,
  'dewey_summary_2_name'
>;

export const deweySummary3SchemaArray: (keyof DeweySummary3Schema)[] = [
  'dewey_summary_3_id',
  'name',
  'summary_2_id',
  'summary_3_id'
];
