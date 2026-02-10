<script setup>
import { ref, onMounted, computed } from 'vue'

// 接收來自路由的 :id 參數
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const allHeroes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // 因為 heroes.json 在 public，路徑直接寫 /heroes.json 即可
    const response = await fetch('/heroes.json')
    allHeroes.value = await response.json()
  } catch (error) {
    console.error('資料載入失敗:', error)
  } finally {
    loading.value = false
  }
})

// 透過 ID 比對找出該位英雄
const hero = computed(() => {
  return allHeroes.value.find(h => h.id === props.id)
})
</script>

<template>
  <div v-if="loading" class="loading">載入中...</div>
  
  <main v-else-if="hero" class="skill-view">
    <header class="hero-banner">
      <button @click="$router.push('/')" class="back-btn">← 返回列表</button>
      <h1>{{ hero.name }}</h1>
      <p class="alias">{{ hero.alias }}</p>
    </header>

    <div class="content-grid">
      <section class="skills-list">
        <h2>特殊技能詳解</h2>
        <div class="grid">
          <article v-for="skill in hero.skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <h3>{{ skill.name }}</h3>
              <span class="cd">CD: {{ skill.cd }}s</span>
            </div>
            <p>{{ skill.effect }}</p>
          </article>
        </div>
      </section>

      <aside class="hero-stats">
        <h3>英雄屬性</h3>
        <div class="stat-bar">力量: {{ hero.cards.strength }}</div>
        <div class="stat-bar">敏捷: {{ hero.cards.agility }}</div>
        <div class="stat-bar">智力: {{ hero.cards.intelligence }}</div>
      </aside>
    </div>
  </main>

  <div v-else class="error">
    <h2>找不到該英雄資料</h2>
    <router-link to="/">回到首頁</router-link>
  </div>
</template>