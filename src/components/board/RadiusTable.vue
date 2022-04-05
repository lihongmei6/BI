<template>
  <div class="radius-table">
    <div class="radius-table-title">{{ title }}</div>
    <div class="radius-table-content">
      {{ content }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";

export default class extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: [String, Number], default: "" }) readonly content!:
    | string
    | number;
}
</script>
<style lang="scss" scoped>
.radius-table {
  background: url("@/assets/group/logistics/table-bg.png");
  background-size: 100% 100%;
  width: 90%;
  height: 90%;
  text-align: center;
  padding: 0 0.3rem;
  .radius-table-title {
    display: inline-block;
    width: 90%;
    text-align: left;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
    font-size: 0.14rem;
    color: #fff;
    border-left: 0.02rem solid #fff;
    padding-left: 0.05rem;
    width: 100%;
  }
  .radius-table-content {
    border-top: 0.02rem solid #8ea3af;
    width: 100%;
    text-align: left;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #fff;
    font-family: "DINPro-Medium";
  }
}
</style>
