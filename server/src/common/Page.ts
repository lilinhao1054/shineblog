export class Page<T> {
  total?: number;
  records?: T[];
  current: number;
  pageSize: number;
  constructor(current: number, pageSize: number) {
    this.current = current;
    this.pageSize = pageSize;
  }
}
