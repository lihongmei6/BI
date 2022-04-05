<template>
  <div class="line-pie-title">{{ chartTitle }}</div>
  <div :id="chartID" style="height: calc(100% - 0.18rem)"></div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import { fontSize } from "@/utils/index";
import * as echarts from "echarts";

interface PieChartDataInterface {
  name: string;
  value: number;
}

export default class LinePieChart extends Vue {
  @Prop({ type: String, default: "LinePieChart" }) readonly chartID!: string; //id
  @Prop({ type: String, default: "" }) readonly chartTitle!: string; //title
  @Prop({ type: Array, default: [] })
  readonly pieChartData!: PieChartDataInterface[]; //数据
  public chartOptions: any = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    tooltip: {
      trigger: "item",
    },
    color: ["#029EF8", "#02F6F4"],
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c}款}",
          minMargin: 5,
          edgeDistance: 5,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: fontSize(0.13),
              color: "##85CAA1",
              fontWeight: 600,
            },
            name: {
              fontSize: fontSize(0.13),
              color: "##85CAA1",
              fontWeight: 600,
            },
          },
        },
        labelLine: {
          length: 1,
          length2: 1,
        },
        data: [],
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    this.chartOptions.series[0].data = this.pieChartData;
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
  }
  @Watch("pieChartData")
  onPieChartData() {
    this.chartInit();
  }
  public mounted() {
    this.chartInit();
  }
}
</script>
<style lang="scss" scoped>
.line-pie-title {
  color: #a6efff;
  font-size: 0.16rem;
}
</style>
