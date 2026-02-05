<script setup>
import { ref, computed } from 'vue';
import Post from './components/Post.vue';

const heroList = ref([
  { name: '鋼鐵人', alias: 'Tony Stark', powers: ['飛行', '科技'], cards: { strength: 85, agility: 70, intelligence: 99 }, description: '天才、億萬富翁。' },
  { name: '美國隊長', alias: 'Steve Rogers', powers: ['領導', '體能'], cards: { strength: 90, agility: 80, intelligence: 85 }, description: '復仇者聯盟核心。' },
  { name: '蜘蛛人', alias: 'Peter Parker', powers: ['感應', '攀爬'], cards: { strength: 75, agility: 95, intelligence: 88 }, description: '好鄰居蜘蛛人。' }
]);

const sortBy = ref('default');
const searchQuery = ref(''); // 搜尋關鍵字

// 結合搜尋與排序的計算屬性
const filteredAndSortedHeroes = computed(() => {
  // A. 先進行搜尋過濾
  let result = heroList.value.filter(hero => {
    const nameMatch = hero.name.includes(searchQuery.value);
    const aliasMatch = hero.alias.toLowerCase().includes(searchQuery.value.toLowerCase());
    return nameMatch || aliasMatch;
  });

  // B. 再進行排序
  if (sortBy.value === 'strength') {
    result.sort((a, b) => b.cards.strength - a.cards.strength);
  } else if (sortBy.value === 'intelligence') {
    result.sort((a, b) => b.cards.intelligence - a.cards.intelligence);
  } else if (sortBy.value === 'agility') {
    result.sort((a, b) => b.cards.agility - a.cards.agility);
  }

  return result;
});
</script>

<template>
  <header class="site-header">
    <h1>英雄管理系統</h1>
    
    <div class="controls-bar">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜尋英雄名稱或別名..."
        >
      </div>

      <div class="filter-controls">
        <button @click="sortBy = 'default'" :class="{ active: sortBy === 'default' }">預設</button>
        <button @click="sortBy = 'strength'" :class="{ active: sortBy === 'strength' }">力量</button>
        <button @click="sortBy= 'agility'" :class="{ active: sortBy === 'agility' }">敏捷</button>
        <button @click="sortBy = 'intelligence'" :class="{ active: sortBy === 'intelligence' }">智力</button>
      </div>
    </div>
  </header>

  <main>
    <div class="hero-grid">
      <Post 
        v-for="item in filteredAndSortedHeroes" 
        :key="item.name" 
        :hero="item" 
      />
      <p v-if="filteredAndSortedHeroes.length === 0" class="no-result">
        找不到符合 "{{ searchQuery }}" 的英雄
      </p>
    </div>
  </main>
</template>