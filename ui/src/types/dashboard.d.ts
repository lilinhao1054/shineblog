interface ChartData {
  date: string;
  value: number;
}

interface Dashboard {
  articleNum: number;
  tagNum: number;
  categoryNum: number;
  totalPageView: number;
  articlePubData: ChartData[];
  pageViewData: ChartData[];
}
