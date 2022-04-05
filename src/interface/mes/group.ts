export interface GroupReq {
  type: number | string;
  is_first: number | string;
  model_name: string;
}
export interface GroupRes {
  info: GroupInfo;
  production: GroupProduction;
  gst: GroupGst[];
  seven_data: GroupChartData;
  single_work: GroupChartData;
}
interface GroupInfo {
  work_no: string;
  //工单号
  model_no: string;
  //款号
  order_date: string;
  //下单日期
  production_name: string;
  //加工产品名
  cut_number: number | string;
  //实裁数
  delivery_date: string;
  //交单日期
}
interface GroupProduction {
  production_day: number | string;
  //当日产量
  production_plan: number | string;
  //实时计划产量
  production_total: number | string;
  //累计完成产量
  production_progress: string;
  //累计完成计划
}
interface GroupGst {
  rank: number | string;
  //序号
  time: string;
  //日期/时刻
  person_number: number | string;
  //人数
  gst: string;
  //gst/人
  beat: number | string;
  //节拍
  production_total: number | string;
  //已产数量
}
interface GroupChartData {
  xaxis: string[];
  series: number[][];
}
