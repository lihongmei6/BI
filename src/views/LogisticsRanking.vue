<template>
  <ScreenBg :title="titles[$route.params.type].name">
    <div class="logistics-ranking">
      <div class="top">
        <TimeShow />
        <div class="next-day">
          次日待完成量： <span>{{ logisticsRanking.base.next_completed }}</span>
        </div>
        <div class="continuous">
          当日连单率: <span>{{ logisticsRanking.base.continuous }}</span>
        </div>
      </div>
      <div class="content">
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
            { key: 'yield', name: '单量' },
          ]"
          title="入库排名"
          :tablelist="logisticsRanking.warehousing"
          v-loading="request.warehousing && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="调拨上架排名"
          :tablelist="logisticsRanking.transfer_shelves"
          v-loading="request.transfer_shelves && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="拣货排名"
          :tablelist="logisticsRanking.picking"
          v-loading="request.picking && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
            { key: 'yield', name: '单量' },
          ]"
          title="复核排名"
          :tablelist="logisticsRanking.review"
          v-loading="request.review && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
            { key: 'yield', name: '单量' },
          ]"
          title="唯品会复核排名"
          :tablelist="logisticsRanking.vipshop_review"
          v-loading="request.vipshop_review && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '最终数据' },
          ]"
          title="当日个人综合排名"
          :tablelist="logisticsRanking.person_day_ranking"
          v-loading="request.person_day_ranking && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="当月入库排名"
          :tablelist="logisticsRanking.warehousing_month"
          v-loading="request.warehousing_month && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="当月上架排名"
          :tablelist="logisticsRanking.shelves_month"
          v-loading="request.shelves_month && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="当月拣货排名"
          :tablelist="logisticsRanking.picking_month"
          v-loading="request.picking_month && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="当月复核排名"
          :tablelist="logisticsRanking.review_month"
          v-loading="request.review_month && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '件数' },
          ]"
          title="当月唯品会排名"
          :tablelist="logisticsRanking.vipshop_month"
          v-loading="request.vipshop_month && is_first"
        />
        <LogisticsScrollTable
          :headerLists="[
            { key: 'rank', name: '排名' },
            { key: 'name', name: '姓名' },
            { key: 'packages_number', name: '最终数据' },
          ]"
          title="当月个人综合排名"
          :tablelist="logisticsRanking.preson_month_ranking"
          v-loading="request.preson_month_ranking && is_first"
        />
      </div>
    </div>
  </ScreenBg>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import ScreenBg from "@/components/bg/ScreenBg.vue";
import TimeShow from "@/components/board/TimeShow.vue";
import { logisticsRanking } from "@/apis/logistics";
import { LogisticsRankingRes } from "@/interface/logistics";
import LogisticsScrollTable from "@/components/board/LogisticsScrollTable.vue";
import { logisticsRankingTitle } from "@/const/title";

@Options({
  components: {
    ScreenBg,
    TimeShow,
    LogisticsScrollTable,
  },
})
export default class Logistics extends Vue {
  public titles = logisticsRankingTitle;
  public logisticsRanking: LogisticsRankingRes = {
    base: {
      next_completed: "",
      continuous: "",
    },
    warehousing: [],
    transfer_shelves: [],
    picking: [],
    review: [],
    vipshop_review: [],
    person_day_ranking: [],
    warehousing_month: [],
    shelves_month: [],
    picking_month: [],
    review_month: [],
    vipshop_month: [],
    preson_month_ranking: [],
  };
  public is_first = 1;
  public async getData(model_name: string) {
    if (this.request[model_name]) return;
    this.request[model_name] = 1;
    let res = await logisticsRanking({
      is_first: this.is_first,
      type: String(this.$route.params.type) ?? 1,
      model_name: model_name,
    });
    this.request[model_name] = 0;
    if (res.code === 200) {
      this.logisticsRanking[model_name] = res.data[model_name];
    }
  }
  public request: any = [];
  public mounted() {
    document.title = this.titles[String(this.$route.params.type)].name;
    Object.keys(this.logisticsRanking).forEach((key) => {
      this.getData(key);
    });

    setInterval(() => {
      this.is_first = 0;
      Object.keys(this.logisticsRanking).forEach((key) => {
        this.getData(key);
      });
    }, 60000);
  }
}
</script>

<style lang="scss" scoped>
.logistics-ranking {
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  top: 0;
  .top {
    width: 100%;
    height: 9vh;
    display: flex;
    justify-content: flex-start;
    padding-top: 0.2rem;
    box-sizing: border-box;
    font-size: 0.2rem;
    color: rgb(0, 255, 255);
    position: relative;
    font-family: DINPro-Medium;
    .time-show {
      top: 0.1rem;
      position: absolute;
      font-size: 0.14rem;
      width: 0.6rem;
      line-height: 0.16rem;
    }
    .next-day {
      margin-left: 2rem;
      width: 70%;
      text-align: left;
    }
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 91vh;
    .logistics-scroll-table {
      width: 16.66%;
      height: 50%;
    }
  }
}
/* 手机或小平板 phone */
@media all and (max-width: 767px) {
  .logistics-ranking {
    display: block;
    overflow: auto;
    .top {
      display: block;
      text-align: center;
      padding-top: 0;
      .next-day {
        margin: 0 0 0.2rem 0;
        width: 100%;
        text-align: center;
      }
      .time-show {
        display: none;
      }
      margin-top: 1rem;
    }
    .content {
      margin-top: 0.3rem;
      flex: 1;
      width: 100%;
      .logistics-scroll-table {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>
