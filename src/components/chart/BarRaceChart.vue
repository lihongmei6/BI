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
export default class BarRaceChart extends Vue {
  @Prop({ type: String, default: "BarRaceChart" })
  readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[];
  @Prop({ type: String, default: "" }) readonly title!: string;
  public chartOptions: any = {
    title: {
      text: "月完成数量排行榜",
      left: "center",
      textStyle: {
        fontSize: fontSize(0.18),
        color: "#fff",
      },
    },
    grid: {
      top: "10%",
      left: "8%",
      right: "5%",
      bottom: "8%",
    },
    xAxis: {
      max: "dataMax",
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: [],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: fontSize(0.14),
          color: "#fff",
        },
      },
    },
    series: [
      {
        realtimeSort: true,
        name: "X",
        type: "bar",
        data: [],
        label: {
          show: true,
          position: "inside",
          valueAnimation: true,
          textStyle: {
            fontSize: fontSize(0.14),
            color: "#fff",
          },
        },
        itemStyle: {
          normal: {
            borderRadius: [3, 20, 20, 3],
            color: function (params: any) {
              // 设置柱形图的颜色
              if (params.dataIndex === 0) {
                return "#d84430";
              } else if (params.dataIndex === 1) {
                return "#f38237";
              } else if (params.dataIndex === 2) {
                return "#e2aa20";
              } else {
                return "#608289";
              }
            },
          },
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
  public myChart: any = undefined;
  public chartInit() {
    this.chartOptions.yAxis.data = this.xAxisData ?? [];

    this.chartOptions.series[0].data = this.seriesData[0] ?? [];

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
