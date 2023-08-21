interface ChartData {
  date: Date;
  value: number;
}

export class DashboardDto {
  articleNum: number;
  tagNum: number;
  categoryNum: number;
  totalPageView: number;
  articlePubData: ChartData[];
  pageViewData: ChartData[];
}
