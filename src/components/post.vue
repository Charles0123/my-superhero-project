<script setup lang="js">
import { onMounted } from 'vue';
defineProps({
  hero: {
    type: Object,
    required: true,
    default: () => ({
      name: '未知英雄',
      alias: '無名氏',
      powers: ['劍術', '隱匿'],
      description: '這位英雄的資料尚未提供。',
      cards: {
        strength: 70,
        agility: 85,
        intelligence: 90
      }
    })
  }
})

</script>

<template>
   <article class="hero-card">
  <header>
    <h2>鋼鐵人</h2>
    <p class="alias">Tony Stark</p>
  </header>

  <section class="content">
    <p class="description">天才、億萬富翁、花花公子、慈善家。</p>
    <div class="tags">
      <span class="tag tag-power">飛行</span>
      <span class="tag tag-intel">科技工程</span>
    </div>
  </section>

  <footer>
    <h3>戰鬥規格</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="label">力量</span>
        <span class="value">85</span>
      </div>
      <div class="stat-item">
        <span class="label">敏捷</span>
        <span class="value">70</span>
      </div>
      <div class="stat-item">
        <span class="label">智力</span>
        <span class="value">99</span>
      </div>
    </div>
  </footer>
</article>
</template>