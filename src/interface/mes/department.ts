export interface DepartmentReq {
  type: number | string;
  is_first: number | string;
  model_name: string;
}
export interface DepartmentRes {
  efficiency: {
    //车间效率
    current: number | string;
    // 当前数
    total: number | string;
    //总数
  };
  month_order: number | string;
  // 本月月累计下单
  month_style: number | string;
  //本月生产款式
  month_quantity: number | string;
  //本月累计生产件数
  seven_data: DepartmentChartData;
  //近七天产值/产量图
  month_rank: DepartmentChartData;
  //月完成数量排行榜
  defects: { fault_name: string; fault_number: string | number }[];
  //当日生产缺陷
  production: DepartmentChartData;
  //今日生产实时数据
}

interface DepartmentChartData {
  xaxis: string[];
  series: number[][];
}
