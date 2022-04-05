<template>
  <ScreenBg :title="titles[$route.params.type].name">
    <div class="logistics">
      <div class="logic-left">
        <div class="left-1">
          <TimeShow />
          <div class="left-target">
            次日待完成量： {{ logisticsData.base.next_completed }}
          </div>
        </div>
        <div
          class="left-2 logistics-table"
          v-loading="!!request.procurements && is_first"
        >
          <div class="table-title">电商生产采购(件)</div>
          <table border="0">
            <tr>
              <th>总件数</th>
              <th>已扫描数</th>
              <th>待扫描数</th>
            </tr>
            <tr>
              <td>{{ logisticsData.procurements.wait_receiving }}</td>
              <td>{{ logisticsData.procurements.wait_racking }}</td>
              <td>{{ logisticsData.procurements.completed }}</td>
            </tr>
          </table>
        </div>
        <div
          class="left-3 logistics-table"
          v-loading="!!request.storage && is_first"
        >
          <div class="table-title">电商调拨入库(件)</div>
          <table border="0">
            <tr>
              <th>总件数</th>
              <th>已上架数</th>
              <th>待上架数</th>
            </tr>
            <tr>
              <td>{{ logisticsData.storage.total }}</td>
              <td>{{ logisticsData.storage.been_on }}</td>
              <td>{{ logisticsData.storage.wait_racking }}</td>
            </tr>
          </table>
        </div>
        <div class="left-4">
          <BarChart
            v-loading="!!request.carriers && is_first"
            chartID="logistics-bar"
            title="发货承运商统计"
            :seriesData="logisticsData.carriers.series"
            :xAxisData="logisticsData.carriers.xaxis"
          />
        </div>
      </div>
      <div class="logic-center">
        <div class="top-chart">
          <GradientStackedAreaChart
            v-loading="!!request.month_storage && is_first"
            chartID="logistics-chart-one"
            title="当月日入库件数"
            :seriesData="logisticsData.month_storage.series"
            :xAxisData="logisticsData.month_storage.xaxis"
            :legendData="[]"
          />
        </div>

        <div class="bottom-chart">
          <GradientStackedAreaChart
            v-loading="!!request.month_sales && is_first"
            chartID="logistics-chart-two"
            title="当月销售日单量"
            :seriesData="logisticsData.month_sales.series"
            :xAxisData="logisticsData.month_sales.xaxis"
            :legendData="['单数', '件数']"
          />
        </div>
      </div>
      <div class="logic-right">
        <div class="right-1">
          <div class="right-target">
            当日连单率: {{ logisticsData.base.continuous }}
          </div>
        </div>
        <div
          class="right-2 logistics-table"
          v-loading="!!request.outbound && is_first"
        >
          <div class="table-title">电商销售出库+JITX(单)</div>
          <table border="0">
            <tr>
              <th>总单量</th>
              <th>完成单量</th>
              <th>当日余量</th>
            </tr>
            <tr>
              <td>{{ logisticsData.outbound.order_total }}</td>
              <td>{{ logisticsData.outbound.completed }}</td>
              <td>{{ logisticsData.outbound.allowance }}</td>
            </tr>
          </table>
        </div>
        <div
          class="right-3 logistics-table"
          v-loading="!!request.refund && is_first"
        >
          <div class="table-title">电商唯品调拨采退(件)</div>
          <table border="0">
            <tr>
              <th>总件数</th>
              <th>完成件数</th>
              <th>待完成量</th>
            </tr>
            <tr>
              <td>{{ logisticsData.refund.total }}</td>
              <td>{{ logisticsData.refund.completed }}</td>
              <td>{{ logisticsData.refund.allowance }}</td>
            </tr>
          </table>
        </div>
        <div
          class="right-4 logistics-table"
          v-loading="!!request.undistributed && is_first"
        >
          <div class="table-title">电商未分配波次单量</div>
          <table border="0">
            <tr>
              <th>单件</th>
              <th>多件</th>
            </tr>
            <tr>
              <td>{{ logisticsData.undistributed.single }}</td>
              <td>{{ logisticsData.undistributed.more }}</td>
            </tr>
          </table>
        </div>
        <div
          class="right-5 logistics-table"
          v-loading="!!request.aging && is_first"
        >
          <div class="table-title">电商销售订单时效情况</div>
          <table border="0">
            <tr>
              <th>0-8小时</th>
              <th>8-16小时</th>
            </tr>
            <tr>
              <td style="color: #409eff">{{ logisticsData.aging.zero }}</td>
              <td style="color: #67c23a">{{ logisticsData.aging.eight }}</td>
            </tr>
          </table>
          <table border="0">
            <tr>
              <th>16-24小时</th>
              <th>已超出24时</th>
            </tr>
            <tr>
              <td style="color: #e6a23c">{{ logisticsData.aging.sixteen }}</td>
              <td style="color: #f56c6c">
                {{ logisticsData.aging.twenty_four }}
              </td>
            </tr>
          </table>
        </div>
        <div
          class="right-6 logistics-table"
          v-loading="!!request.warehouse && is_first"
        >
          <table border="0">
            <tr>
              <th>仓库SKU总数</th>
              <th>仓库库位总数</th>
              <th>仓库库存总数</th>
            </tr>
            <tr>
              <td>{{ logisticsData.warehouse.sku_total }}</td>
              <td>{{ logisticsData.warehouse.location_total }}</td>
              <td>{{ logisticsData.warehouse.stock_total }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import GradientStackedAreaChart from "@/components/chart/GradientStackedAreaChart.vue";
import TimeShow from "@/components/board/TimeShow.vue";
import BarChart from "@/components/chart/BarChart.vue";
import { logistics } from "@/apis/logistics";
import { LogisticsInfoRes } from "@/interface/logistics";
import { logisticsInfoTitle } from "@/const/title";

@Options({
  components: {
    GradientStackedAreaChart,
    ScreenBg,
    TimeShow,
    BarChart,
  },
})
export default class Logistics extends Vue {
  public titles = logisticsInfoTitle;
  public logisticsData: LogisticsInfoRes = {
    base: {
      next_completed: "", //次日待完成量
      continuous: "",
      //当日连单率
    },

    procurements: {
      //电商"",
      wait_receiving: "", //待收货数
      wait_racking: "", //待上架数
      completed: "", //完成数
    },

    storage: {
      //电商调拨入库(件)
      total: "", //总件数
      been_on: "", //已上架数
      wait_racking: "", //待上架数
    },

    outbound: {
      //电商销售出库+JITX(单)
      order_total: "", //总单量
      completed: "", //完成单量
      allowance: "", //当日余量
    },

    refund: {
      //电商唯品调拨采退(件)
      total: "", //总件数
      completed: "", //  完成件数
      allowance: "", // 待完成量
    },

    undistributed: {
      //电商未分配波次单量
      single: "", //单件
      more: "", //多件
    },

    aging: {
      //电商销售订单时效情况
      zero: "", //0-8小时
      eight: "", //8-16小时
      sixteen: "", //16-24小时
      twenty_four: "", // 已超出24时
    },

    warehouse: {
      //仓库详情
      sku_total: "",
      //仓库SKU总数
      location_total: "",
      //仓库库位总数
      stock_total: "",
      //仓库库存总数
    },
    carriers: {
      xaxis: [],
      series: [],
    }, // 发货承运商统计
    month_storage: {
      xaxis: [],
      series: [],
    }, //当月日入库件数
    month_sales: {
      xaxis: [],
      series: [],
    }, // 当月销售日单量
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await logistics({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.logisticsData[model_name] = res.data[model_name];
    }
  }
  public request: any = [];
  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    Object.keys(this.logisticsData).forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      Object.keys(this.logisticsData).forEach((key) => {
        this.getData(key);
      });
    }, 60000);
  }
}
</script>

<style lang="scss" scoped>
.logistics {
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  .logic-left {
    width: 27.5%;
    display: flex;
    flex-direction: column;
    .left-1 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 11vh;
      box-sizing: border-box;
      .left-target {
        font-size: 0.2rem;
        color: rgb(0, 255, 255);
      }
    }
    .left-4 {
      flex: 1;
      margin-top: 0.1rem;
    }
  }
  .logic-center {
    width: 45%;
    padding-top: 8.5vh;
    display: flex;
    flex-direction: column;
    .top-chart,
    .bottom-chart {
      padding-top: 0.1rem;
      flex: 1;
      background-image: url("@/assets/group/logistics/chart-bg.png");
      background-size: 100% 100%;
    }
  }
  .logic-right {
    width: 27.5%;
    .right-1 {
      display: flex;
      justify-content: center;
      .right-target {
        font-size: 0.2rem;
        color: rgb(0, 255, 255);
        line-height: 11vh;
      }
    }
    .right-5 {
      height: 25vh;
      .table-title {
        line-height: 6vh;
      }
    }
    .right-6 {
      height: 10vh;
    }
  }
  .logistics-table {
    background-image: url("@/assets/group/logistics/table-bg.png");
    background-size: 100% 100%;
    height: 18vh;
    .table-title {
      font-size: 0.14rem;
      text-align: center;
      font-weight: 600;
      line-height: 7vh;
    }
    table {
      width: 100%;
      font-size: 0.14rem;
      line-height: 0.3rem;

      td {
        text-align: center;
        font-family: DINPro-Regular;
      }
    }
  }
}
/* 手机或小平板 phone */
@media all and (max-width: 767px) {
  .logistics {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .logic-left {
      width: 100%;
      height: auto;
      .left-1 {
        line-height: 1rem;
        margin-top: 0.2rem;
        .time-show {
          display: none;
        }
      }
      .left-4 {
        flex: 1 1 4rem;
      }
    }
    .logic-center {
      width: 100%;
      height: 8rem;
    }
    .logic-right {
      width: 100%;
    }
    .logistics-table {
      table {
        // line-height: 0.9rem;
      }
    }
  }
}
</style>
