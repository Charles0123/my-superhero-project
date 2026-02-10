import { createRouter, createWebHistory } from "vue-router";
// 引入你的頁面組件
import HomeView from "../views/HomeView.vue";
import SkillView from "../views/SkillView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    // :id 是一個動態參數，會對應到 heroes.json 裡的 id
    path: "/skills/:id",
    name: "HeroSkills",
    component: SkillView,
    // 開啟 props: true，這樣 SkillView 就能透過 defineProps(['id']) 直接接收參數
    props: true,
  },
];

const router = createRouter({
  // 使用 HTML5 History 模式，讓網址看起來很自然（沒有 # 號）
  history: createWebHistory(),
  routes,
});

export default router;
