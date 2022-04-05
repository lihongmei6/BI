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

export default class BarChart extends Vue {
  @Prop({ type: String, default: "BarChart" })
  readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[];
  @Prop({ type: String, default: "" }) readonly title!: string;
  public chartOptions: any = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    title: {
      text: "",
      left: "center",
      textStyle: {
        fontSize: fontSize(0.2),
        color: "rgb(31, 173, 229)",
      },
    },
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
      top: "10%",
      left: "2%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "订单数",
        data: [120, 200, 150, 80],
        type: "bar",
        label: {
          show: true,
          position: "top",
          color: "#fff",
        },
        itemStyle: {
          normal: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#6fe590",
              },
              {
                offset: 1,
                color: "#73D8FF",
              },
            ]),
          },
        },
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    this.chartOptions.xAxis.data = this.xAxisData ?? [];
    this.chartOptions.series[0].data = this.seriesData[0] ?? [];
    this.chartOptions.title.text = this.title;
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
  }
  @Watch("xAxisData", { deep: true })
  @Watch("seriesData", { deep: true })
  onData() {
    this.chartInit();
  }
  public mounted() {
    this.chartInit();
  }
}
</script>
<style lang="scss" scoped></style>
