export interface LineReq {
  type: number | string;
  is_first: number | string;
  model_name: string;
}
export interface LineRes {
  online: number | string;
  //今日上线款式
  expect: number | string;
  //周内预计上线款式
  day_online: LineDayOnline[];
  //今日顺线信息明细
  week_expect: LineWeekExpect[];
  //周内预计顺线信息明细
}
interface LineDayOnline {
  group: string;
  //组别
  work_no: string;
  //工单号
  model_no: string;
  // 款号
  order_number: number;
  //单量
  start_time: string;
  //顺线开始时间
  end_time: string;
  //顺线结束时间
  time: string;
  //顺线耗时
  ie: string;
  //负责IE
}
interface LineWeekExpect {
  group: string;
  // 组别
  work_no: string;
  // 工单号
  model_no: string;
  //款号
  order_number: number;
  //单量
  expect_time: string;
  // 预计顺线日期
  ie: string;
  //负责IE
}
