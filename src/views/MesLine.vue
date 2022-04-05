<template>
  <ScreenBg :title="titles[$route.params.type].name">
    <div class="top">
      <div class="top-left" style="display: flex">
        <div class="top-left-left">
          <KeyTable title="今日上线款式" :content="`${lineData.online} 款`" />
        </div>
        <div class="top-left-right">
          <KeyTable
            title="周内预计上线款式"
            :content="`${lineData.expect} 款`"
          />
        </div>
      </div>

      <TimeShow />
    </div>
    <div class="center">
      <ScrollTable
        title="今日顺线信息明细"
        v-loading="!!request.day_online && is_first"
        :headerLists="dayOnlineHeader"
        :tablelist="lineData.day_online"
      />
      <ScrollTable
        title="周内预计顺线信息明细"
        v-loading="!!request.week_expect && is_first"
        :headerLists="weekExpectHeader"
        :tablelist="lineData.week_expect"
      />
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import KeyTable from "@/components/board/KeyTable.vue";
import ScrollTable from "@/components/board/ScrollTable.vue";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import TimeShow from "@/components/board/TimeShow.vue";
import { mesLine } from "@/apis/mes";
import { LineRes } from "@/interface/mes/line";
import { mesLineTitle } from "@/const/title";
@Options({
  components: {
    KeyTable,
    ScrollTable,
    ScreenBg,
    TimeShow,
  },
})
export default class extends Vue {
  public titles = mesLineTitle;
  public lineData: LineRes = {
    online: "",
    //今日上线款式
    expect: "",
    //周内预计上线款式
    day_online: [],
    //今日顺线信息明细
    week_expect: [],
    //周内预计顺线信息明细
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await mesLine({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.lineData[model_name] = res.data[model_name];
      if (model_name === "day_online") {
        this.lineData["online"] = res.data["online"];
      } else {
        this.lineData["expect"] = res.data["expect"];
      }
    }
  }
  public request: any = [];
  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    ["day_online", "week_expect"].forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      ["day_online", "week_expect"].forEach((key) => {
        this.getData(key);
      });
    }, 300000);
  }
  public dayOnlineHeader = [
    {
      key: "group",
      name: "组别",
    },
    {
      key: "work_no",
      name: "工单号",
    },
    {
      key: "model_no",
      name: "款号",
    },
    {
      key: "order_number",
      name: "单量",
    },
    {
      key: "start_time",
      name: "顺线开始时间",
    },
    // {
    //   key: "end_time",
    //   name: "顺线结束时间",
    // },
    // {
    //   key: "time",
    //   name: "顺线耗时",
    // },
    {
      key: "ie",
      name: "负责IE",
    },
  ];
  public weekExpectHeader = [
    {
      key: "group",
      name: "组别",
    },
    {
      key: "work_no",
      name: "工单号",
    },
    {
      key: "model_no",
      name: "款号",
    },
    {
      key: "order_number",
      name: "单量",
    },
    {
      key: "expect_time",
      name: "预计顺线日期",
    },
    {
      key: "ie",
      name: "负责IE",
    },
  ];
}
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  height: 18vh;
  .top-left {
    width: 40%;
    display: flex;
    justify-content: space-around;
  }
  .time-show {
    line-height: 0.4rem;
    margin-right: 0.8rem;
  }
}
.center {
  display: flex;
  flex-wrap: wrap;
  height: 72vh;
  .scroll-table {
    width: 100%;
    height: 50%;
    padding: 0 5.1vw 0 3vw;
  }
}
</style>
