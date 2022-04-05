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
  @Prop({ type: String, default: "MoreBarChart" })
  readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[];
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Array, default: [] }) readonly legendData!: any[];
  public chartOptions: any = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    title: {
      text: "今日生产实时数据",
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
      top: "25%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    legend: {
      top: "40",
      textStyle: {
        color: "#ffffff",
        fontSize: fontSize(0.12),
      },
      data: ["新款计划数", "新款完成数", "当前款计划数", "当前款完成数"],
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
        name: "新款计划数",
        data: [],
        type: "bar",
        itemStyle: {
          normal: {
            color: "#00DBFF",
          },
        },
      },
      {
        name: "新款完成数",
        data: [],
        type: "bar",

        itemStyle: {
          normal: {
            color: "#35FF35",
          },
        },
      },
      {
        name: "当前款计划数",
        data: [],
        type: "bar",

        itemStyle: {
          normal: {
            color: "#FFD300",
          },
        },
      },
      {
        name: "当前款完成数",
        data: [],
        type: "bar",

        itemStyle: {
          normal: {
            color: "#D400D4",
          },
        },
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    this.chartOptions.xAxis.data = this.xAxisData ?? [];
    for (let i = 0; i < this.legendData.length; i++) {
      this.chartOptions.series[i].data = this.seriesData[i] ?? [];
      this.chartOptions.series[i].name = this.legendData[i];
    }
    // this.chartOptions.title.text = this.title;
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
