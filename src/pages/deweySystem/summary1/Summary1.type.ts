export type DeweySummarySchema = {
  dewey_summary_id?: number;
  summary_id: number;
  name: string;
};

export type TableDeweySummarySchema = DeweySummarySchema;

export const DeweySummarySchemaArray: (keyof DeweySummarySchema)[] = [
  'dewey_summary_id',
  'name',
  'summary_id'
];
