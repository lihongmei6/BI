<template>
  <ScreenBg :title="titles[$route.params.type].name">
    <div class="top">
      <div class="top-left-one">
        <KeyTable
          title="本月累计下单"
          :content="`${orderData.order_month_total} 款`"
        />
      </div>
      <div class="top-center">
        <KeyTable
          title="本月累计交付"
          :content="`${orderData.delivery_month.order} 单/ ${orderData.delivery_month.piece} 件`"
        />
      </div>
      <div style="width: 2.54rem">
        <LinePieChart
          chartTitle="本月事业部下单占比"
          chartID="department"
          :pieChartData="orderData.division"
        />
      </div>
      <div style="width: 2.54rem">
        <LinePieChart
          chartTitle="本月本厂/经销占比"
          chartID="workspace"
          :pieChartData="orderData.distribution"
        />
      </div>
      <div style="width: 2.54rem">
        <LinePieChart
          chartTitle="本月订单完成情况"
          chartID="order-month"
          :pieChartData="orderData.order_finish"
        />
      </div>
      <TimeShow />
    </div>
    <div class="center">
      <ScrollTable
        v-loading="!!request.order_list && is_first"
        :headerLists="orderListHeader"
        :tablelist="orderData.order_list"
        title="当月订单在途明细"
        style="width: 50%"
      />
      <ScrollTable
        v-loading="!!request.processing && is_first"
        title="当月生产加工明细"
        :headerLists="processingListHeader"
        :tablelist="orderData.processing"
        style="width: 50%"
      />
    </div>
    <div class="bottom">
      <KeyTable
        title="今日下单/交付"
        :content="`${orderData.order_delivery.order} 款/ ${orderData.order_delivery.delivery} 件`"
      />
      <KeyTable
        title="今日原料发料"
        :content="`${orderData.material.raw} 单/ ${orderData.material.delivery} 件`"
      />
      <KeyTable
        title="今日裁剪订单/完成"
        :content="`${orderData.cut_order_finish.order} 单/ ${orderData.cut_order_finish.cut_number} 件`"
      />
      <KeyTable
        title="今日品牌产能与完成"
        :content="`${orderData.capacity_completed.completed} 件/ ${orderData.capacity_completed.capacity} 件`"
      />
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import KeyTable from "@/components/board/KeyTable.vue";
import ScrollTable from "@/components/board/ScrollTable.vue";
import LinePieChart from "@/components/chart/LinePieChart.vue";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import TimeShow from "@/components/board/TimeShow.vue";
import { mesOrder } from "@/apis/mes";
import { OrderRes } from "@/interface/mes/order";
import { mesOrderTitle } from "@/const/title";

@Options({
  components: {
    KeyTable,
    LinePieChart,
    ScrollTable,
    ScreenBg,
    TimeShow,
  },
})
export default class extends Vue {
  public titles = mesOrderTitle;
  public orderData: OrderRes = {
    order_month_total: "",
    delivery_month: {
      order: "",
      piece: "",
    },
    division: [],
    distribution: [],
    order_finish: [],
    order_list: [],
    processing: [],
    order_delivery: {
      order: "",
      delivery: "",
    },
    material: {
      raw: "",
      delivery: "",
    },
    cut_order_finish: {
      order: "",
      cut_number: "",
    },
    capacity_completed: {
      completed: "",
      capacity: "",
    },
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await mesOrder({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.orderData[model_name] = res.data[model_name];
    }
  }
  public request: any = [];
  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    Object.keys(this.orderData).forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      Object.keys(this.orderData).forEach((key) => {
        this.getData(key);
      });
    }, 300000);
  }
  public orderListHeader = [
    {
      key: "work_no",
      name: "工单号",
      flex: 1.4,
    },
    {
      key: "model_no",
      name: "款号",
      flex: 1.3,
    },
    {
      key: "order_time",
      name: "下单日期",
    },
    {
      key: "delivery_demand",
      name: "需求交期",
    },
    {
      key: "order_quantity",
      name: "下单件数",
    },
    {
      key: "production_property",
      name: "生产属性",
    },
    {
      key: "stage_at",
      name: "当前阶段",
    },
    {
      key: "storage_quantity",
      name: "入库件数",
    },
    {
      key: "warning",
      name: "预警",
      color: "red",
      flex: 0.5,
    },
  ];
  public processingListHeader = [
    {
      key: "work_no",
      name: "工单号",
      flex: 1.5,
    },
    {
      key: "model_no",
      name: "款号",
    },
    {
      key: "order_number",
      name: "订单数",
    },
    {
      key: "production",
      name: "生产阶段",
    },
    {
      key: "sewing_team",
      name: "缝制班组",
    },
    {
      key: "cut_number",
      name: "实裁数",
      flex: 0.8,
    },
    {
      key: "garment_production",
      name: "成衣产出",
    },
    {
      key: "delivery_date",
      name: "交期",
    },
    {
      key: "delivery_day_number",
      name: "计划交付",
    },
    {
      key: "inventory_status",
      name: "入库状态",
    },
  ];
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  height: 18vh;
  .time-show {
    line-height: 0.36rem;
  }
}
.center {
  display: flex;
  justify-content: space-between;
  height: 54vh;
}
.bottom {
  display: flex;
  height: 18vh;
  justify-content: space-around;
}
</style>
