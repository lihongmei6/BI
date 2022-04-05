<template>
  <div
    :id="chartID"
    style="width: 100%; height: 100%; position: relative"
  ></div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import { fontSize } from "@/utils/index";
import * as echarts from "echarts";

export default class SevenProChart extends Vue {
  @Prop({ type: String, default: "SevenProChart" }) readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[][]; //
  @Prop({
    type: Object,
    default: {
      top: "20%",
      left: "7%",
      right: "7%",
      bottom: "7%",
    },
  })
  readonly grid!: any;

  public chartColors = ["#dbd335", "#53cdf4"];
  public chartOptions: any = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    title: {
      text: "近七天产值/产量图",
      left: "center",
      textStyle: {
        fontSize: fontSize(0.18),
        color: "#fff",
      },
    },
    color: this.chartColors,
    darkMode: true,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      top: "20%",
      left: "7%",
      right: "7%",
      bottom: "7%",
    },
    legend: {
      top: "40",
      data: ["产值", "产量"],
      textStyle: {
        color: "#ffffff",
        fontSize: fontSize(0.14),
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data: this.xAxisData,
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位/件",
        position: "right",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
        axisLabel: {
          formatter: "{value} ",
          show: true,
          textStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
        splitLine: { show: false },
      },
      {
        type: "value",
        name: "单位/元",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "产值",
        type: "bar",
        yAxisIndex: 0,
        barWidth: 20,
        data: [],
      },
      {
        name: "产量",
        type: "line",
        yAxisIndex: 1,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(58,77,233,0.8)",
            },
            {
              offset: 1,
              color: "rgba(58,77,233,0.1)",
            },
          ]),
        },
        data: [],
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    this.chartOptions.xAxis[0].data = this.xAxisData;
    for (let i = 0; i < 2; i++) {
      this.chartOptions.series[i].data = this.seriesData[i];
    }
    this.chartOptions.grid = this.grid;
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
  }
  @Watch("xAxisData")
  @Watch("seriesData")
  onData() {
    this.chartInit();
  }
  public mounted() {
    this.chartInit();
  }
}
</script>
<style lang="scss" scoped></style>
