<script setup>
import { ref } from 'vue';
import Post from './components/Post.vue';

// 模擬從 API 抓來的英雄資料陣列
const heroList = ref([
  {
    name: '鋼鐵人',
    alias: 'Tony Stark',
    powers: ['飛行', '科技工程'],
    description: '天才、億萬富翁、花花公子、慈善家。',
    cards: { strength: 85, agility: 70, intelligence: 99 }
  },
  {
    name: '美國隊長',
    alias: 'Steve Rogers',
    powers: ['領導力', '超級體能'],
    description: '二戰英雄，復仇者聯盟的核心。',
    cards: { strength: 90, agility: 80, intelligence: 85 }
  }
  // 你可以繼續增加更多英雄...
]);
</script>

<template>
  <header class="site-header">
    <h1>復仇者聯盟成員庫</h1>
  </header>

  <main>
    <section>
      <h3>英雄名單</h3>
      <div class="hero-grid">
        <Post 
          v-for="item in heroList" 
          :key="item.name" 
          :hero="item" 
        />
      </div>
    </section>
  </main>
</template>