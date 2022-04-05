<template>
  <ScreenBg :title="titles[$route.params.type].name">
    <div class="time"><TimeShow /></div>
    <div class="top">
      <div class="top-left">
        <div class="name">工单号</div>
        <div class="name">加工品名称</div>
        <div class="value">{{ groupData.info.work_no }}</div>
        <div class="value">{{ groupData.info.production_name }}</div>

        <div class="name">款号</div>
        <div class="name">实裁数</div>
        <div class="value">{{ groupData.info.model_no }}</div>
        <div class="value">{{ groupData.info.cut_number }}</div>

        <div class="name">下单日期</div>
        <div class="name">交单日期</div>
        <div class="value">{{ groupData.info.order_date }}</div>
        <div class="value">{{ groupData.info.delivery_date }}</div>
      </div>
      <div class="top-center">
        <div class="top-center-title">
          当日产量<br />
          <div class="value">{{ groupData.production.production_day }}</div>
        </div>
        <div class="designed-output">
          实时计划产量：{{ groupData.production.production_plan }}
        </div>
        <div class="total-sum">
          <div class="production">
            累计完成产量<br />
            <div class="value">{{ groupData.production.production_total }}</div>
          </div>
          <div class="progress">
            累计完成进度<br />
            <div class="value">
              {{ groupData.production.production_progress }}%
            </div>
          </div>
        </div>
      </div>
      <div class="top-right">
        <GroupScrollTable
          :headerLists="[
            { key: 'rank', name: '序号' },
            { key: 'time', name: '日期/时刻', flex: 2 },
            { key: 'person_number', name: '人数' },
            { key: 'gst', name: 'GST/人' },
            { key: 'beat', name: '节拍' },
            { key: 'production_total', name: '已产数量' },
          ]"
          :tablelist="groupData.gst"
          v-loading="!!request.gst && is_first"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <SevenProChart
          v-loading="!!request.seven_data && is_first"
          :xAxisData="groupData.seven_data.xaxis"
          :seriesData="groupData.seven_data.series"
        />
      </div>
      <div class="bottom-right">
        <SingleWork
          v-loading="!!request.single_work && is_first"
          :xAxisData="groupData.single_work.xaxis"
          :seriesData="groupData.single_work.series"
        />
      </div>
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import SevenProChart from "@/components/chart/SevenProChart.vue";
import SingleWork from "@/components/chart/SingleWork.vue";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import { mesGroup } from "@/apis/mes";
import { GroupRes } from "@/interface/mes/group";
import { mesGroupTitle } from "@/const/title";
import TimeShow from "@/components/board/TimeShow.vue";
import GroupScrollTable from "@/components/board/GroupScrollTable.vue";

@Options({
  components: {
    SevenProChart,
    SingleWork,
    ScreenBg,
    TimeShow,
    GroupScrollTable,
  },
})
export default class extends Vue {
  public titles = mesGroupTitle;
  public groupData: GroupRes = {
    info: {
      work_no: "",
      //工单号
      model_no: "",
      //款号
      order_date: "",
      //下单日期
      production_name: "",
      //加工产品名
      cut_number: "",
      //实裁数
      delivery_date: "",
      //交单日期
    },
    production: {
      production_day: "",
      //当日产量
      production_plan: "",
      //实时计划产量
      production_total: "",

      //累计完成产量
      production_progress: "",
      //累计完成计划
    },
    gst: [],
    seven_data: { xaxis: [], series: [] },
    single_work: { xaxis: [], series: [] },
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await mesGroup({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.groupData![model_name] = res.data[model_name];
    }
  }
  public request: any = [];
  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    Object.keys(this.groupData!).forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      Object.keys(this.groupData!).forEach((key) => {
        this.getData(key);
      });
    }, 300000);
  }
}
</script>
<style lang="scss" scoped>
.time {
  position: absolute;
  top: 0.2rem;
  right: 0.5vw;
  .time-show {
    font-size: 0.16rem;
    width: 3.2rem;
    font-size: 0.22rem;
  }
}
.top {
  display: flex;
  height: 40vh;
  .top-left,
  .top-right {
    background-image: url("@/assets/group/mes/group/border-img.png");
    background-size: 100% 100%;
    height: 100%;

    width: 36vw;
    height: 100%;
    font-size: 0.18rem;
  }
  .top-center {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 0.2rem;
    .top-center-title {
      width: 100%;
      font-weight: 600;
      .value {
        margin-top: 0.1rem;
        font-size: 0.35rem;
        font-weight: 600;
        display: inline-block;
        width: 15vw;
        background-color: rgb(41, 52, 99);
        color: rgb(255, 255, 255);
        line-height: 0.3rem;
      }
    }
    .designed-output {
      width: 100%;
    }
    .total-sum {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .production {
        .value {
          font-size: 0.21rem;
          margin-top: 0.1rem;
          color: rgb(47, 235, 119);
          font-weight: 600;
        }
      }
      .progress {
        .value {
          font-size: 0.21rem;
          margin-top: 0.1rem;
          font-weight: 600;
          color: rgb(240, 40, 75);
        }
      }
    }
  }
  .top-left {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: rgb(255, 255, 255);
    text-align: center;
    align-content: flex-start;
    padding-top: 1vh;
    box-sizing: border-box;
    .value {
      width: 40%;
      background: url("@/assets/group/mes/group/border-img-small.png") no-repeat
        center;
      image-rendering: -webkit-optimize-contrast;
      background-size: 100% 100%;
      line-height: 0.4rem;
    }
    .name {
      width: 40%;
      height: 0.4rem;
      line-height: 0.4rem;
    }
  }
}
.bottom {
  width: 100%;
  height: calc(60vh - 0.6rem);
  display: flex;
  .bottom-left,
  .bottom-right {
    box-sizing: border-box;
    padding-top: 2vh;
    flex: 1 1;
    background-image: url("@/assets/group/mes/group/border-img.png");
    background-size: 100% 100%;
  }
}
@media all and (max-width: 767px) {
  .time-show {
    display: none;
  }
  .top {
    height: auto;
    flex-wrap: wrap;
    .top-left,
    .top-center,
    .top-right {
      width: 100%;
      margin-bottom: 0.2rem;
    }
    .top-left {
      height: 3.3rem;
      .value,
      .name {
        line-height: 0.5rem;
        height: 0.5rem;
      }
    }
    .top-right {
      min-height: 3rem;
    }
  }
  .bottom {
    flex-wrap: wrap;
    height: 8rem;
    .bottom-left,
    .bottom-right {
      width: 100%;
      flex: 0 1 auto;
    }
  }
}
</style>
