<script setup lang="js">
// 定義從父層傳進來的 hero 物件
const props = defineProps({
  hero: {
    type: Object,
    required: true,
    default: () => ({
      name: '未知英雄',
      alias: '無名氏',
      powers: [],
      description: '尚未提供。',
      cards: { strength: 0, agility: 0, intelligence: 0 }
    })
  }
})
</script>

<template>
  <article class="hero-card">
    <header>
      <h2>{{ hero.name }}</h2>
      <p class="alias">{{ hero.alias }}</p>
    </header>
<article class="hero-card" @click="$router.push(`/skills/${hero.id}`)">
  <header>
    <h2>{{ hero.name }}</h2>
    <small>點擊查看技能</small>
  </header>
  </article>
    <section class="content">
      <p class="description">{{ hero.description }}</p>
      <div class="tags">
        <span 
          v-for="power in hero.powers" 
          :key="power" 
          class="tag"
          :class="{ 
            'tag-power': power.includes('力') || power.includes('飛'), 
            'tag-intel': power.includes('科技') || power.includes('智') 
          }"
        >
          {{ power }}
        </span>
      </div>
    </section>

    <footer>
      <h3>戰鬥規格</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="label">力量</span>
          <span class="value">{{ hero.cards.strength }}</span>
        </div>
        <div class="stat-item">
          <span class="label">敏捷</span>
          <span class="value">{{ hero.cards.agility }}</span>
        </div>
        <div class="stat-item">
          <span class="label">智力</span>
          <span class="value">{{ hero.cards.intelligence }}</span>
        </div>``
      </div>
    </footer>
  </article>
</template>