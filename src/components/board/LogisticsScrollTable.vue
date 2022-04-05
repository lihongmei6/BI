<template>
  <div class="logistics-scroll-table">
    <div class="title">{{ title }}</div>
    <div class="table-header">
      <div class="item" v-for="(item, index) in headerLists" :key="index">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="scroll-client">
      <div class="scroll" v-if="tablelist.length < limitScrollNum">
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span v-for="(val, index) in headerLists" :key="index">{{
            item[val.key]
          }}</span>
        </div>
      </div>
      <vue3-seamless-scroll
        v-else
        :list="tablelist"
        class="scroll"
        :limitScrollNum="limitScrollNum"
        :hover="true"
        :step="0.5"
        :copyNum="0"
      >
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span v-for="(val, index) in headerLists" :key="index">{{
            item[val.key]
          }}</span>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Options } from "vue-property-decorator";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

@Options({
  components: {
    Vue3SeamlessScroll,
  },
})
export default class LogisticsScrollTable extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Array, default: [] }) readonly headerLists!: object[];
  @Prop({ type: Array, default: [] }) readonly tablelist!: object[];
  public limitScrollNum = 10;
  public mounted() {
    const scrollElement = document.querySelector(
      ".scroll-client"
    ) as HTMLElement;
    const itemElement = document.querySelector(".item") as HTMLElement;
    this.limitScrollNum = Math.ceil(
      Number(scrollElement?.offsetHeight) / Number(itemElement?.offsetHeight)
    );
    console.log(
      scrollElement?.offsetHeight,
      itemElement?.offsetHeight,
      this.limitScrollNum
    );
  }
}
</script>
<style lang="scss" scoped>
.logistics-scroll-table {
  background-image: url("@/assets/group/logistics/table-bg.png");
  background-size: 100% 100%;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
  overflow: hidden;
  .title {
    font-size: 0.18rem;
    font-weight: bold;
    line-height: 0.4rem;
  }
  .table-header {
    display: flex;
    justify-content: space-around;
    line-height: 0.3rem;
    font-size: 0.16rem;
    div {
      flex: 1;
    }
  }
  .scroll-client {
    height: calc(100% - 0.8rem);
    overflow: hidden;
    .scroll {
      overflow: hidden;
      z-index: -1;
      .item {
        display: flex;
        justify-content: space-around;
        font-size: 0.14rem;
        line-height: 0.28rem;
        span {
          flex: 1;
        }
      }
    }
  }
}
</style>
