export interface OrderReq {
  type: number | string;
  is_first: number | string;
  model_name: string;
}
interface PieInterface {
  name: string;
  value: number | string;
}
interface OrderListInterface {
  work_no: string;
  model_no: string;
  order_time: string;
  delivery_demand: string;
  production_property: string;
  order_quantity: number | string;
  stage_at: string;
  warning: string;
  storage_quantity: number | string;
}
interface ProcessingInterface {
  work_no: string;
  model_no: string;
  order_number: number | string;
  production: string;
  sewing_team: string;
  cut_number: number | string;
  garment_production: string;
  delivery_date: string;
  delivery_day_number: number | string;
  inventory_status: string;
}
export interface OrderRes {
  order_month_total: number | string;
  delivery_month: {
    order: number | string;
    piece: number | string;
  };
  division: PieInterface[];
  distribution: PieInterface[];
  order_finish: PieInterface[];
  order_list: OrderListInterface[];
  processing: ProcessingInterface[];
  order_delivery: {
    order: number | string;
    delivery: number | string;
  };
  material: {
    raw: number | string;
    delivery: number | string;
  };
  cut_order_finish: {
    order: number | string;
    cut_number: number | string;
  };
  capacity_completed: {
    completed: number | string;
    capacity: number | string;
  };
}
