import { ErrorShowType } from './ErrorShowType';

export class Result<T = any> {
  success: boolean;
  data: T;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
  static success(data: any) {
    const r = new Result();
    r.success = true;
    r.data = data;
    return r;
  }
  static fail(
    errorMessage: string,
    showType = ErrorShowType.ERROR_MESSAGE,
    errorCode = 201,
  ) {
    const r = new Result();
    r.success = false;
    r.errorMessage = errorMessage;
    r.showType = showType;
    r.errorCode = errorCode;
    return r;
  }
}
