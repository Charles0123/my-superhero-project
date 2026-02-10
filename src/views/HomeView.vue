<script setup>
import { ref, computed, onMounted } from 'vue';
import Post from '../components/post.vue'; // 注意路徑多了一層 ..

const heroList = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  const res = await fetch('/heroes.json');
  heroList.value = await res.json();
});

const filteredHeroes = computed(() => {
  return heroList.value.filter(hero => 
    hero.name.includes(searchQuery.value) || hero.alias.includes(searchQuery.value)
  );
});
</script>

<template>
  <div class="search-container">
    <!-- <div class="search-bar">
      <input v-model="searchQuery" placeholder="搜尋英雄...">
    </div> -->
    <div class="hero-grid">
      <Post v-for="hero in filteredHeroes" :key="hero.id" :hero="hero" />
    </div>
  </div>
</template>