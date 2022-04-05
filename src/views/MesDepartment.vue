<template>
  <ScreenBg class="mes-department" :title="titles[$route.params.type].name">
    <div class="top">
      <GaugeChart
        style="height: 20vh"
        :currentVal="departmentData.efficiency.current"
        :totalVal="departmentData.efficiency.total"
      />
      <RadiusTable
        title="本月累计下单"
        :content="departmentData.month_order"
        style="margin-left: 1vw"
      />
      <RadiusTable
        title="本月生产款式"
        :content="departmentData.month_style"
        style="margin-left: 1vw"
      />
      <RadiusTable
        title="本月累计生产件数"
        :content="departmentData.month_quantity"
        style="margin-left: 1vw"
      />
      <TimeShow style="margin: 0 2vw" />
    </div>
    <div class="center">
      <SevenProChart
        chartID="department-seven"
        style="width: 30%"
        v-loading="!!request.seven_data && is_first"
        :xAxisData="departmentData.seven_data.xaxis"
        :seriesData="departmentData.seven_data.series"
        :grid="{ top: '20%', left: '11%', right: '10%', bottom: '7%' }"
      />
      <BarRaceChart
        style="padding: 0.15rem; width: 40%"
        v-loading="!!request.month_rank && is_first"
        :xAxisData="departmentData.month_rank.xaxis"
        :seriesData="departmentData.month_rank.series"
      />
      <div class="defect" style="width: 30%">
        <div class="defect-top"></div>
        <div class="defect-center">
          <div
            class="content"
            v-for="(item, index) in departmentData.defects"
            :key="index"
            v-show="defectsShow[index]"
          >
            <div class="title">
              <div class="name animate__animated animate__fadeInLeft">
                当日生产缺陷数量
              </div>
              <div class="tag animate__animated animate__fadeInRight">
                {{ item.fault_name }}
              </div>
            </div>
            <div class="value animate__animated animate__fadeInUp">
              {{ item.fault_number }}
            </div>
          </div>
          <div class="defect-center-left-triangle"></div>
          <div class="defect-center-right-triangle"></div>
        </div>
        <div class="defect-bottom"></div>
      </div>
    </div>
    <div class="bottom">
      <MoreBarChart
        v-loading="!!request.production && is_first"
        :legendData="[
          '新款计划数',
          '新款完成数',
          '当前款计划数',
          '当前款完成数',
        ]"
        :xAxisData="departmentData.production.xaxis"
        :seriesData="departmentData.production.series"
      />
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import MoreBarChart from "@/components/chart/MoreBarChart.vue";
import RadiusTable from "@/components/board/RadiusTable.vue";
import TimeShow from "@/components/board/TimeShow.vue";
import GaugeChart from "@/components/chart/GaugeChart.vue";
import SevenProChart from "@/components/chart/SevenProChart.vue";
import BarRaceChart from "@/components/chart/BarRaceChart.vue";
import { mesDepartment } from "@/apis/mes";
import { DepartmentRes } from "@/interface/mes/department";
import { mesDepartmentTitle } from "@/const/title";

@Options({
  components: {
    ScreenBg,
    MoreBarChart,
    RadiusTable,
    TimeShow,
    GaugeChart,
    SevenProChart,
    BarRaceChart,
  },
})
export default class MesDepartment extends Vue {
  public titles = mesDepartmentTitle;
  public departmentData: DepartmentRes = {
    efficiency: {
      current: 0,
      total: 0,
    },
    month_order: "",
    month_style: "",
    month_quantity: "",
    seven_data: { xaxis: [], series: [] },
    month_rank: { xaxis: [], series: [] },
    defects: [],
    production: { xaxis: [], series: [] },
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await mesDepartment({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.departmentData![model_name] = res.data[model_name];
    }
  }
  public request: any = [];
  public defectsShow: number[] = [];
  @Watch("departmentData.defects")
  onShow(newVal: any) {
    this.defectsShow = new Array(newVal.length).fill(0);
    let i = 0;
    this.defectsShow[i] = 1;
    i++;
    setInterval(() => {
      if (i >= this.defectsShow.length) i = 0;
      this.defectsShow[i] = 1;
      this.defectsShow = this.defectsShow.map((item, index) => {
        if (index === i) {
          return 1;
        } else {
          return 0;
        }
      });
      i++;
    }, 5000);
  }

  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    Object.keys(this.departmentData!).forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      Object.keys(this.departmentData!).forEach((key) => {
        this.getData(key);
      });
    }, 300000);
  }
}
</script>

<style lang="scss" scoped>
.mes-department {
  display: block;
  .top {
    height: 17vh;
    display: flex;
    justify-content: space-between;
    .time-show {
      line-height: 0.4rem;
    }
  }
  .center {
    height: 38vh;
    display: flex;
    #department-seven {
      background-image: url("@/assets/group//mes/group/border-img.png");
      background-size: 100% 100%;
      padding: 0.15rem;
      box-sizing: border-box;
    }
    .defect {
      background-image: url("@/assets/group//mes/group/border-img.png");
      background-size: 100% 100%;
      position: relative;
      box-sizing: border-box;
      padding: 0.65rem 0.65rem;
      .defect-top {
        height: 0.4rem;
        width: 0.04rem;
        background: #00fdfd;
        border-radius: 0.02rem;
        transform: rotate(45deg);
        position: absolute;
        top: 0.2rem;
        right: 0.4rem;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      }
      .defect-bottom {
        height: 0.4rem;
        width: 0.04rem;
        background: #00fdfd;
        border-radius: 0.02rem;
        transform: rotate(45deg);
        position: absolute;
        bottom: 0.2rem;
        left: 0.4rem;
      }
      .defect-center {
        border: 0.03rem solid #00fdfd;
        height: 100%;
        position: relative;
        clip-path: polygon(
          0% 0.65rem,
          0.65rem 0,
          100% 0,
          100% calc(100% - 0.65rem),
          calc(100% - 0.65rem) 100%,
          0% 100%
        );
        .defect-center-left-triangle {
          position: absolute;
          transform: rotate(45deg);
          // background: red;
          width: 0.9rem;
          height: 0.9rem;
          top: -0.47rem;
          left: -0.48rem;
          border-right: 0.03rem solid #00fdfd;
        }
        .defect-center-right-triangle {
          position: absolute;
          transform: rotate(45deg);
          // background: red;
          width: 0.9rem;
          height: 0.9rem;
          bottom: -0.47rem;
          right: -0.48rem;
          border-left: 0.03rem solid #00fdfd;
        }
        .content {
          margin: 0.5rem 0.3rem 0.5rem 0.5rem;
          .title {
            text-align: left;
            font-size: 0.2rem;
            border-bottom: 0.02rem solid #00b5c2;
            line-height: 0.3rem;
            .name {
              display: inline-block;
            }
            .tag {
              background: #00fcfc;
              display: inline-block;
              margin-left: 0.05rem;
              color: #151538;
              font-size: 0.16rem;
              padding: 0rem 0.03rem;
              height: 80%;
              line-height: 0.2rem;
            }
          }
          .value {
            text-align: left;
            font-size: 0.3rem;
            line-height: 0.4rem;
            font-family: "DINPro-Medium";
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 37vh;
    background-image: url("@/assets/group//mes/group/border-img.png");
    background-size: 100% 100%;
    padding: 0.15rem;
    box-sizing: border-box;
  }
}
</style>
