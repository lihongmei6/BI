<template>
  <div
    :id="chartID"
    style="width: 100%; height: 100%; position: relative"
  ></div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import { fontSize } from "@/utils/index";
import * as echarts from "echarts";

export default class GradientStackedAreaChart extends Vue {
  @Prop({ type: String, default: "GradientStackedAreaChart" })
  readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[];
  @Prop({ type: Array, default: [] }) readonly legendData!: any[];
  @Prop({ type: String, default: "" }) readonly title!: string;
  public chartColors = ["#1165c5", "#53cdf4"];
  public chartOptions = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    title: {
      text: "",
      left: "center",
      textStyle: {
        fontSize: fontSize(0.18),
        color: "#fff",
      },
    },
    color: this.chartColors,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      top: "40",
      textStyle: {
        color: "#ffffff",
        fontSize: fontSize(0.12),
      },
      data: ["测试"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [""],
    },
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "",
        type: "line",
        stack: "Total",
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgba(55, 162, 255,0)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "",
        type: "line",
        stack: "Total",
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(59,158,197)",
            },
            {
              offset: 1,
              color: "rgba(59,158,197,0)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit(is_dispatch = 0) {
    this.chartOptions.xAxis.data = this.xAxisData;
    for (let i = 0; i < this.seriesData.length; i++) {
      this.chartOptions.series[i].data = this.seriesData[i] ?? [];
      this.chartOptions.series[i].name = this.legendData[i];
    }
    this.chartOptions.legend.data = this.legendData;
    this.chartOptions.title.text = this.title;
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
    if (is_dispatch) {
      this.myChart.dispatchAction({
        type: "showTip", //提示框
        seriesIndex: 0,
        dataIndex: this.xAxisData.length - 1, //第 lightIndex   柱子高亮
      });
    }
  }
  @Watch("xAxisData")
  @Watch("seriesData", { deep: true })
  onData() {
    this.chartInit(1);
  }

  public mounted() {
    this.chartInit();
  }
}
</script>
<style lang="scss" scoped></style>
