import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/styles/common.scss";
import loadingDirective from "./directive/loading";
import "@/assets/font/font.css";
import "animate.css/animate.min.css";

const app = createApp(App).directive("loading", loadingDirective);

app.use(store).use(router).mount("#app");
