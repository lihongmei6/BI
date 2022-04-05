<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <el-menu
        default-active="2"
        @select="handleSelect"
        :collapse="isCollapse"
        style="height: 100%"
      >
        <el-sub-menu
          :index="item.name"
          v-for="item in titleMenu"
          :key="item.name"
          default-active="/logistics/info/ds1"
        >
          <template #title>
            <el-icon
              ><location v-if="item.name === '物流部'" /><document v-else
            /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="val.path"
            v-for="val in item.children"
            :key="val.name"
            >{{ val.alias }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu></el-aside
    >

    <el-container style="height: 100%">
      <el-header>
        <div class="collapse">
          <el-icon @click="isCollapse = !isCollapse"
            ><expand v-if="isCollapse" /> <fold v-else
          /></el-icon>
        </div>

        帆软大屏信息看板
        <div class="tip" v-if="currentPath">
          <template v-if="!isMin">
            <el-button @click="copyLink">复制大屏地址</el-button>
            <el-button @click="openNew">新页面打开</el-button>
          </template>
          <template v-else>
            <el-icon style="margin-right: 0.1rem" @click="copyLink"
              ><document-copy
            /></el-icon>
            <el-icon @click="openNew"><circle-plus /></el-icon
          ></template>
        </div>
      </el-header>
      <el-main>
        <iframe
          :src="currentPath"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import {
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElIcon,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElButton,
  ElMessage,
} from "element-plus";
import "element-plus/dist/index.css";
import {
  Location,
  Document,
  Expand,
  Fold,
  DocumentCopy,
  CirclePlus,
} from "@element-plus/icons-vue";
import { titleMenu } from "@/const/title";
@Options({
  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElIcon,
    Location,
    Document,
    ElContainer,
    ElAside,
    ElMain,
    ElHeader,
    ElButton,
    Expand,
    Fold,
    DocumentCopy,
    CirclePlus,
  },
})
export default class Home extends Vue {
  public titleMenu = titleMenu;
  public currentPath = "";
  public isCollapse = false;
  public handleSelect(currentPath: string) {
    this.currentPath = currentPath;
  }
  public copyLink() {
    var oInput = document.createElement("input"); //创建一个隐藏input（重要！）
    oInput.value = window.location.origin + this.currentPath; //赋值
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = "oInput";
    oInput.style.display = "none";
    ElMessage.success("复制成功");
  }
  public openNew() {
    const { href } = this.$router.resolve({
      path: this.currentPath,
    });
    window.open(href, "_blank");
  }
  public isMin = false;
  public getCWidth() {
    let doc = document.documentElement;
    let width = doc.getBoundingClientRect().width;
    if (width > 767) {
      this.isMin = false;
    } else {
      this.isMin = true;
      this.isCollapse = true;
    }
  }
  public created() {
    this.getCWidth();
  }
}
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 2rem;
}
.el-header {
  text-align: center;
  line-height: 60px;
  font-size: 0.2rem;
  position: relative;
  .tip {
    position: absolute;
    right: 0.2rem;
    top: 0;
  }
  .collapse {
    position: absolute;
    left: 0.2rem;
    top: 0;
    color: #999;
  }
}
.el-main {
  padding: 0;
}
/* 手机或小平板 phone */
@media all and (max-width: 767px) {
  .el-menu:not(.el-menu--collapse) {
    width: 2rem;
  }
  .el-header {
    .tip {
      right: 0.1rem;
      color: #999;
    }
  }
}
</style>
