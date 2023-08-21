import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeepWith, isDate } from 'lodash';

function formatDate(obj) {
  return cloneDeepWith(obj, (value) => {
    if (isDate(value)) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }
  });
}

@Injectable()
export class DateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => formatDate(value)));
  }
}
