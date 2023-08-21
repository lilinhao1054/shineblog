import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { cloneWith } from 'lodash';

@Injectable()
export class ParseIntFromObjectPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const res = cloneWith(value, (val, key) => {
      if (key === metadata.data) {
        if (typeof key === 'string') val = parseInt(val);
        else throw new Error('no such key to string type value');
      }
    });
  }
}
