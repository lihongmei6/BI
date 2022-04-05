<template>
  <div class="time-show">{{ secondDate }}{{ weekDay }}</div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class TimeShow extends Vue {
  public weekDay = "";
  public secondDate = "";
  public mounted() {
    setInterval(() => {
      this.secondDate = new Date().toLocaleString();
      this.weekDay = " 星期" + "日一二三四五六".charAt(new Date().getDay());
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.time-show {
  width: 1rem;
  padding: 0 0.15rem;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  color: rgb(204, 255, 255);
  letter-spacing: 0.02rem;
  font-family: "DINPro-Medium";
}
</style>
