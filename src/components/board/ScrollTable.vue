<template>
  <div class="scroll-table">
    <div class="title">{{ title }}</div>
    <div class="table-header">
      <div
        class="item"
        v-for="(item, index) in headerLists"
        :key="index"
        :style="{
          flex: item.flex ?? 1,
        }"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div
      class="scroll-client"
      style="height: calc(100% - 1.2rem); overflow: hidden"
    >
      <div class="scroll" v-if="tablelist.length < limitScrollNum">
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span
            v-for="(val, index) in headerLists"
            :key="index"
            :style="{
              color: val.color && item[val.key] === '预警' ? 'red' : '',
              flex: val.flex ?? 1,
            }"
            >{{ item[val.key] }}</span
          >
        </div>
      </div>
      <vue3-seamless-scroll
        v-else
        :list="tablelist"
        class="scroll"
        :limitScrollNum="limitScrollNum"
        :step="0.5"
      >
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span
            v-for="(val, index) in headerLists"
            :key="index"
            :style="{
              color: val.color && item[val.key] === '预警' ? 'red' : '',
              flex: val.flex ?? 1,
            }"
            >{{ item[val.key] }}</span
          >
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
export default class ScrollTable extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Array, default: [] }) readonly headerLists!: object[];
  @Prop({ type: Array, default: [] }) readonly tablelist!: object[];
  public limitScrollNum = 8;
  public mounted() {
    const scrollElement = document.querySelector(
      ".scroll-client"
    ) as HTMLElement;
    const itemElement = document.querySelector(".item") as HTMLElement;
    this.limitScrollNum = Math.ceil(
      Number(scrollElement?.offsetHeight) / Number(itemElement?.offsetHeight)
    );
  }
}
</script>
<style lang="scss" scoped>
.scroll-table {
  background-image: url("@/assets/group/mes/order/border-table.png");
  background-size: 100% 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
  overflow: hidden;
  padding: 0 3vw 0 2vw;
  .title {
    font-size: 0.18rem;
    font-weight: bold;
    line-height: 0.4rem;
    color: #00fcfc;
    padding-top: 0.15rem;
  }
  .table-header {
    display: flex;
    justify-content: space-around;
    line-height: 0.36rem;
    font-size: 0.16rem;
    color: #1fade5;
    background: #022439;
    .item {
      flex: 1;
    }
  }
  .scroll {
    overflow: hidden;
    z-index: -1;
    .item {
      display: flex;
      justify-content: space-around;
      font-size: 0.12rem;
      line-height: 0.36rem;
      height: 0.36rem;
      overflow: hidden;
      &:nth-of-type(2n) {
        background: #022439;
      }
      span {
        flex: 1;
      }
    }
  }
}
</style>
