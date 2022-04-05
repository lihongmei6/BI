<template>
  <div class="gauge">
    <div
      :id="chartID"
      style="width: 100%; height: 100%; position: relative"
    ></div>
    <div class="tip">
      <p>{{ totalVal ? ((currentVal * 100) / totalVal).toFixed(1) : 0 }}%</p>
      <p>车间效率</p>
      <p>{{ currentVal + "/" + totalVal }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
// import { fontSize } from "@/utils/index";
import * as echarts from "echarts";

export default class BarChart extends Vue {
  @Prop({ type: String, default: "BarChart" })
  readonly chartID!: string; //id
  @Prop({ type: Number, default: 0 }) readonly currentVal!: number; //X轴
  @Prop({ type: Number, default: 0 }) readonly totalVal!: number;
  @Prop({ type: String, default: "" }) readonly title!: string;
  public chartOptions: any = {
    series: [
      {
        type: "gauge",
        startAngle: 220,
        endAngle: -40,
        min: 0,
        max: 100,
        splitNumber: 13,
        itemStyle: {
          normal: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#2623FA",
              },
              {
                offset: 1,
                color: "#02CB9F",
              },
            ]),
          },
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 12,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 12,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 0,
          },
        ],
      },
      // {
      //   type: "gauge",
      //   axisLine: {
      //     lineStyle: {
      //       width: 10,
      //       color: [
      //         [0.3, "#02CB9F"],
      //         [0.7, "#DBD335"],
      //         [1, "#fd666d"],
      //       ],
      //     },
      //   },
      //   pointer: {
      //     itemStyle: {
      //       color: "auto",
      //     },
      //   },
      //   axisTick: {
      //     distance: -10,
      //     length: 4,
      //     lineStyle: {
      //       color: "#fff",
      //       width: 1,
      //     },
      //   },
      //   splitLine: {
      //     distance: -10,
      //     length: 10,
      //     lineStyle: {
      //       color: "#fff",
      //       width: 2,
      //     },
      //   },
      //   axisLabel: {
      //     color: "auto",
      //     distance: 12,
      //     fontSize: fontSize(0.12),
      //   },
      //   detail: {
      //     show: false,
      //     // valueAnimation: true,
      //     // formatter: "{value} %",
      //     // color: "#fff",
      //     // fontSize: fontSize(0.25),
      //     // offsetCenter: [130, "-50%"],
      //   },
      //   title: {
      //     show: false,
      //     // offsetCenter: ["140%", "20%"],
      //     // fontSize: fontSize(0.14),
      //     // textStyle: {
      //     //   color: "#fff",
      //     //   overflow: "break",
      //     // },
      //   },
      //   data: [
      //     {
      //       value: 0,
      //       name: "0/0",
      //     },
      //   ],
      // },
    ],
  };
  public myChart: any = undefined;
  public chartInit() {
    let value = (this.currentVal * 100) / this.totalVal;
    this.chartOptions.series[0].data[0] = {
      value: Number(value.toFixed(2)),
      name: `     车间效率

  ${this.currentVal}/${this.totalVal}
      `,
    };
    let chartNode = document.getElementById(this.chartID)!;
    this.myChart = echarts.init(chartNode);
    this.myChart.setOption(this.chartOptions);
  }
  @Watch("currentVal", { deep: true })
  @Watch("totalVal", { deep: true })
  onData() {
    this.chartInit();
  }
  public mounted() {
    this.chartInit();
  }
}
</script>
<style lang="scss" scoped>
.gauge {
  width: 100%;
  height: 100%;
  position: relative;
  .tip {
    position: absolute;
    left: 72%;
    top: 18%;
    font-size: 0.24rem;
    text-align: left;
    p {
      &:nth-of-type(2) {
        font-size: 0.12rem;
      }
      &:nth-of-type(3) {
        margin-top: 0.02rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
