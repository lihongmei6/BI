<template>
  <div class="scree-bg">
    <div class="title">
      <div class="logo">
        <img src="@/assets/group/bg/logo.png" alt="" />
      </div>
      <div v-if="!title.indexOf('在途订单')">{{ title }}</div>
      <div v-else>
        <span style="color: #00f7f8">{{
          title.substring(0, title.indexOf("·"))
        }}</span
        >{{ title.substring(title.indexOf("·"), title.length) }}
      </div>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";

export default class ScreenBg extends Vue {
  @Prop({ type: String, default: "" }) readonly title!: string;
}
</script>
<style lang="scss" scoped>
.scree-bg {
  color: rgb(255, 255, 255);
  background-image: url("@/assets/group/bg/bg-bottom.png");
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-size: 100%;
  box-sizing: border-box;
  .title {
    display: flex;
    justify-content: center;
    font-size: 0.2rem;
    font-weight: 600;
    margin-top: 0.1rem;
    box-sizing: border-box;
    height: 0.5rem;
    background-image: url("@/assets/group/bg/bg-title.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    color: #fafafa;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
      0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
      0px 8px 7px #001135;

    .logo {
      height: 0.5rem;
      width: 0.5rem;
      display: flex;
      justify-content: center;
      background-image: url("@/assets/group/bg/logo-loading.webp");
      background-size: 200% 200%;
      background-repeat: no-repeat;
      background-position: 50% 66%;
      img {
        margin-top: 20%;
        width: 25%;
        height: 25%;
      }
    }
  }
}
@media all and (max-width: 767px) {
  .scree-bg {
    color: rgb(255, 255, 255);
    background-image: linear-gradient(#021b1f, #261b53);
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-size: 100% 100%;
    box-sizing: border-box;
    .title {
      display: flex;
      justify-content: center;
      font-size: 0.14rem;
      font-weight: 600;
      margin-top: 0.1rem;
      box-sizing: border-box;
      height: 0.5rem;
      background-image: url("@/assets/group/bg/bg-title.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 100%;
      color: #fafafa;
      letter-spacing: 0;
      text-shadow: none;

      .logo {
        height: 0.4rem;
        width: 0.4rem;
        display: flex;
        justify-content: center;
        background-image: url("@/assets/group/bg/logo-loading.webp");
        background-size: 200% 200%;
        background-repeat: no-repeat;
        background-position: 50% 66%;
        img {
          margin-top: 20%;
          width: 25%;
          height: 25%;
        }
      }
    }
  }
}
</style>
