<template>
  <main class="skill-page-container">
    
    <header class="hero-detail-header">
      <nav class="breadcrumb">
        <router-link to="/">首頁</router-link> / <span>{{ hero.name }} 技能詳解</span>
      </nav>
      <h1>{{ hero.name }}</h1>
      <p class="hero-subtitle">{{ hero.alias }}</p>
    </header>

    <div class="layout-wrapper">
      <section class="skills-section">
        <header>
          <h2>特殊技能 (Special Abilities)</h2>
        </header>
        
        <div class="skills-list">
          <article v-for="skill in hero.skills" :key="skill.name" class="skill-card">
            <div class="skill-icon">
              <i class="icon-bolt"></i>
            </div>
            <div class="skill-body">
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.effect }}</p>
              <footer class="skill-meta">
                <span class="cd-tag">CD: {{ skill.cd }}s</span>
              </footer>
            </div>
          </article>
        </div>
      </section>

      <aside class="hero-sidebar">
        <section class="bio-box">
          <h3>英雄簡介</h3>
          <p>{{ hero.description }}</p>
        </section>

        <section class="stats-box">
          <h3>能力分配</h3>
          <ul>
            <li>力量: {{ hero.cards.strength }}</li>
            <li>敏捷: {{ hero.cards.agility }}</li>
            <li>智力: {{ hero.cards.intelligence }}</li>
          </ul>
        </section>
      </aside>
    </div>

    <footer class="page-footer">
      <button @click="$router.push('/')" class="back-btn">返回英雄列表</button>
    </footer>

  </main>
</template>

<script setup>
import { computed } from 'vue';
import heroesData from '../data/heroes.json';

// 接收路由傳過來的 ID
const props = defineProps(['id']);

// 根據 ID 從 JSON 中找到對應的英雄資料
const hero = computed(() => {
  return heroesData.find(h => h.id === props.id) || heroesData[0];
});
</script>