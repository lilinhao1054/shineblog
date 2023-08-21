interface Result<T> {
  success: boolean;
  data: T;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

interface Page<T> {
  total: number;
  records: T[];
}
