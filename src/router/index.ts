import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Logistics" */ "../views/Home.vue"),
  },
  {
    path: "/mes/group/:type",
    name: "MesGroup",
    component: () =>
      import(/* webpackChunkName: "MesGroup" */ "../views/MesGroup.vue"),
  },
  {
    path: "/mes/order/:type",
    name: "MesOrder",
    component: () =>
      import(/* webpackChunkName: "MesOrder" */ "../views/MesOrder.vue"),
  },
  {
    path: "/mes/line/:type",
    name: "MesLine",
    component: () =>
      import(/* webpackChunkName: "MesLine" */ "../views/MesLine.vue"),
  },
  {
    path: "/mes/department/:type",
    name: "MesDepartment",
    component: () =>
      import(
        /* webpackChunkName: "MesDepartment" */ "../views/MesDepartment.vue"
      ),
  },
  {
    path: "/logistics/info/:type",
    name: "Logistics",
    component: () =>
      import(/* webpackChunkName: "Logistics" */ "../views/Logistics.vue"),
  },
  {
    path: "/logistics/ranking/:type",
    name: "LogisticsRanking",
    component: () =>
      import(
        /* webpackChunkName: "LogisticsRanking" */ "../views/LogisticsRanking.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
