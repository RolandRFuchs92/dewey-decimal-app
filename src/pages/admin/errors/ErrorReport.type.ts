export type ProcessErrorLogResultModel = {
  timestamp: string;
  message: string;
  stack: string;
};

export type ErrorListProps = {
  errors: ProcessErrorLogResultModel[];
  isLoading: boolean;
};
