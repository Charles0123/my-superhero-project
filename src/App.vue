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
    <h1>超級英雄學院</h1>
  </header>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <footer>
    <p>&copy; 2026 Superhero Project</p>
  </footer>
</template>

<style lang="scss">
/* 簡單的切換動畫 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
body {
  background-color: #05080a; /* 極黑背景 */
  margin: 0;
}
</style>