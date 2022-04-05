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

export default class SingleWork extends Vue {
  @Prop({ type: String, default: "SingleWork" }) readonly chartID!: string; //id
  @Prop({ type: Array, default: [] }) readonly xAxisData!: string[]; //X轴
  @Prop({ type: Array, default: [] }) readonly seriesData!: any[][]; //
  public chartOptions: any = {
    textStyle: {
      fontSize: fontSize(0.14),
      color: "#fff",
    },
    title: {
      text: "单款作业过程学习曲线",
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: fontSize(0.18),
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: 40,
      data: ["节拍值", "人均gst"],
      textStyle: {
        color: "#ffffff",
        fontSize: fontSize(0.14),
      },
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "3%",
      top: "20%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "value",
      data: [],
      name: "单位/件",
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff", //更改坐标轴文字颜色
          fontSize: fontSize(0.14),
        },
      },
      splitLine: { show: false },
      interval: 100,
    },
    yAxis: {
      type: "value",
      name: "单位/秒",
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff", //更改坐标轴文字颜色
          fontSize: fontSize(0.14),
        },
      },
      splitLine: { show: false },
    },
    series: [
      {
        name: "节拍值",
        type: "line",
        step: "end",
        data: [],
        symbolSize: fontSize(0.14),
      },
      {
        name: "人均gst",
        type: "line",
        step: "end",
        data: [],
        symbolSize: fontSize(0.14),
      },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    let xAxisData = this.xAxisData.map((item) => Number(item));
    if (xAxisData[xAxisData.length - 1] >= 8000) {
      this.chartOptions.xAxis.interval = 1000;
    } else if (xAxisData[xAxisData.length - 1] >= 4000) {
      this.chartOptions.xAxis.interval = 500;
    } else if (xAxisData[xAxisData.length - 1] >= 2000) {
      this.chartOptions.xAxis.interval = 200;
    }
    this.chartOptions.xAxis.data = xAxisData;
    for (let i = 0; i < 2; i++) {
      this.chartOptions.series[i].data = this.getYData(
        this.seriesData[i],
        xAxisData
      );
    }
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
  }
  public getYData(arr: number[], xAxisData: number[]) {
    if (arr instanceof Array && arr.length) {
      let newArr = arr.map((item, index) => {
        return [xAxisData[index], item];
      });
      let spliceIndex: number[] = [];
      newArr.reduce((prev: any, cur: any, index: number) => {
        if (prev[1] && prev[1] === cur[1] && index !== newArr.length - 1) {
          spliceIndex.push(index);
        }
        return (prev = cur);
      }, []);
      newArr = newArr.filter((item, index) => {
        if (spliceIndex.indexOf(index) === -1) {
          return item;
        }
      });
      console.log(newArr);
      return newArr;
    } else {
      return [];
    }
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
