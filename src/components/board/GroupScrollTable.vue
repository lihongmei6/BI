<template>
  <div class="group-scroll-table">
    <div class="title">{{ title }}</div>
    <div class="table-header">
      <div
        class="item"
        v-for="(item, index) in headerLists"
        :key="index"
        :style="{ flex: item.flex ?? 1 }"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="scroll-client">
      <div class="scroll" v-if="tablelist.length < limitScrollNum">
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span
            v-for="(val, index) in headerLists"
            :key="index"
            :style="{ flex: val.flex ?? 1 }"
            >{{ item[val.key] }}</span
          >
        </div>
      </div>
      <vue3-seamless-scroll
        v-else
        :list="tablelist"
        class="scroll"
        :limitScrollNum="limitScrollNum"
        :hover="true"
        :step="0.5"
        :copyNum="1"
      >
        <div class="item" v-for="(item, index) in tablelist" :key="index">
          <span
            v-for="(val, index) in headerLists"
            :key="index"
            :style="{ flex: val.flex ?? 1 }"
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
export default class extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: Array, default: [] }) readonly headerLists!: object[];
  @Prop({ type: Array, default: [] }) readonly tablelist!: object[];
  public limitScrollNum = 11;
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
.group-scroll-table {
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;

  .table-header {
    display: flex;
    justify-content: space-around;
    line-height: 0.24rem;
    font-size: 0.12rem;
    color: #fff;
    div {
      flex: 1;
    }
  }
  .scroll-client {
    height: calc(100% - 0.24rem);
    overflow: hidden;
    .scroll {
      overflow: hidden;
      z-index: -1;
      .item {
        display: flex;
        justify-content: space-around;
        font-size: 0.12rem;
        line-height: 0.24rem;
        span {
          flex: 1;
        }
      }
    }
  }
}
</style>
