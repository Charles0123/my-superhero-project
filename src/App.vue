<script setup>
import { ref, computed } from 'vue';
import Post from './components/Post.vue';

// 1. 原始資料陣列
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
  },
  {
    name: '蜘蛛人',
    alias: 'Peter Parker',
    powers: ['蜘蛛感應', '牆壁攀爬'],
    description: '好鄰居蜘蛛人。',
    cards: { strength: 75, agility: 95, intelligence: 88 }
  }
]);

// 2. 記錄當前的排序依據 (預設不排序)
const sortBy = ref('default');

// 3. 使用 computed 產生排序後的陣列
// 這樣當 sortBy 改變時，畫面會自動更新
const sortedHeroes = computed(() => {
  const list = [...heroList.value]; // 先複製一份，避免改到原始資料
  
  if (sortBy.value === 'strength') {
    return list.sort((a, b) => b.cards.strength - a.cards.strength);
  } else if (sortBy.value === 'intelligence') {
    return list.sort((a, b) => b.cards.intelligence - a.cards.intelligence);
  }
  
  return list; // 預設排序
});
</script>

<template>
  <header class="site-header">
    <h1>復仇者聯盟成員庫</h1>
    
    <div class="filter-controls">
      <span>排序依據：</span>
      <button @click="sortBy = 'default'" :class="{ active: sortBy === 'default' }">預設</button>
      <button @click="sortBy = 'strength'" :class="{ active: sortBy === 'strength' }">力量 (高->低)</button>
      <button @click="sortBy = 'intelligence'" :class="{ active: sortBy === 'intelligence' }">智力 (高->低)</button>
    </div>
  </header>

  <main>
    <section>
      <div class="hero-grid">
        <Post 
          v-for="item in sortedHeroes" 
          :key="item.name" 
          :hero="item" 
        />
      </div>
    </section>
  </main>
</template>