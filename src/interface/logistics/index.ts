export interface LogisticsInfoReq {
  type: number | string;
  is_first: number | string;
  model_name: string;
}
interface ChartInterface {
  xaxis: string[];
  series: any[];
}
export interface LogisticsInfoRes {
  base: {
    next_completed: number | string; //次日待完成量
    continuous: string;
    //当日连单率
  };
  procurements: {
    //电商生产采购(件)
    wait_receiving: number | string; //待收货数
    wait_racking: number | string; //待上架数
    completed: number | string; //完成数
  };

  storage: {
    //电商调拨入库(件)
    total: number | string; //总件数
    been_on: number | string; //已上架数
    wait_racking: number | string; //待上架数
  };

  outbound: {
    //电商销售出库+JITX(单)
    order_total: number | string; //总单量
    completed: number | string; //完成单量
    allowance: number | string; //当日余量
  };

  refund: {
    //电商唯品调拨采退(件)
    total: number | string; //总件数
    completed: number | string; //  完成件数
    allowance: number | string; // 待完成量
  };

  undistributed: {
    //电商未分配波次单量
    single: number | string; //单件
    more: number | string; //多件
  };

  aging: {
    //电商销售订单时效情况
    zero: number | string; //0-8小时
    eight: number | string; //8-16小时
    sixteen: number | string; //16-24小时
    twenty_four: number | string; // 已超出24时
  };

  warehouse: {
    //仓库详情
    sku_total: number | string;
    //仓库SKU总数
    location_total: number | string;
    //仓库库位总数
    stock_total: number | string;
    //仓库库存总数
  };
  carriers: ChartInterface; // 发货承运商统计
  month_storage: ChartInterface; //当月日入库件数
  month_sales: ChartInterface; // 当月销售日单量
}
export type LogisticsRankingReq = LogisticsInfoReq;
interface Ranking {
  rank: number;
  name: string;
  packages_number: number;
  yield: number;
}
export interface LogisticsRankingRes {
  base: {
    next_completed: number | string;
    continuous: number | string;
  };
  warehousing: Ranking[];
  transfer_shelves: Pick<Ranking, "rank" | "name" | "packages_number">[];
  picking: Pick<Ranking, "rank" | "name" | "packages_number">[];
  review: Pick<Ranking, "rank" | "name" | "packages_number">[];
  vipshop_review: Ranking[];
  person_day_ranking: Pick<Ranking, "rank" | "name" | "packages_number">[];
  warehousing_month: Pick<Ranking, "rank" | "name" | "packages_number">[];
  shelves_month: Pick<Ranking, "rank" | "name" | "packages_number">[];
  picking_month: Pick<Ranking, "rank" | "name" | "packages_number">[];
  review_month: Pick<Ranking, "rank" | "name" | "packages_number">[];
  vipshop_month: Pick<Ranking, "rank" | "name" | "packages_number">[];
  preson_month_ranking: Pick<Ranking, "rank" | "name" | "packages_number">[];
}
