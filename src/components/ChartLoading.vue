<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #022748;
}
.loading span {
  display: inline-block;
  width: 0.04rem;
  height: 0.2rem;
  border-radius: 0.02rem;
  background: lightgreen;
  animation: load 1s ease infinite;
  margin-left: 0.02rem;
}
@keyframes load {
  0%,
  100% {
    height: 0.2rem;
    background: lightgreen;
  }
  50% {
    height: 0.35rem;
    margin: -0.08rem 0;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  animation-delay: 0.8s;
}
</style>
