<template>
  <div class="key-table">
    <div class="key-table-title">{{ title }}</div>
    <div class="key-table-content">
      {{ content }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";

export default class extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
  @Prop({ type: String, default: "" }) readonly content!: string;
}
</script>
<style lang="scss" scoped>
.key-table {
  background-image: url("@/assets/group/mes/order/border-img.png");
  background-size: 100% 100%;
  width: 2.26rem;
  height: 100%;
  text-align: center;
  .key-table-title {
    display: inline-block;
    width: 88%;
    text-align: center;
    margin-top: 0.2rem;
    padding-bottom: 0.15rem;
    font-size: 0.18rem;
    border-bottom: 0.02rem solid #9be5ff;
    border-radius: 0.01rem;
    color: #a6efff;
  }
  .key-table-content {
    width: 100%;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.2rem;
    color: #85caa1;
  }
}
</style>
