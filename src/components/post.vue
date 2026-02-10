<script setup lang="js">
// 定義從父層傳進來的 hero 物件
const props = defineProps({
  hero: {
    type: Object,
    required: true,
    default: () => ({
      id: 'unknown', // 記得補上 id 預設值
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
  <article class="hero-card clickable" @click="$router.push(`/skills/${hero.id}`)">
    <header>
      <div class="header-main">
        <h2>{{ hero.name }}</h2>
        <p class="alias">{{ hero.alias }}</p>
         <small class="hint">點擊查看詳情</small>
      </div>
      <img  :src="`/images/${hero.alias}.jpg`" :alt="hero.name">
     
    </header>

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
        </div>
      </div>
    </footer>
  </article>
  
</template>

<style lang="scss" scoped>
.hero-card.clickable {
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  .hint {
    color: #42b883;
    font-size: 0.75rem;
  }
}

.hero-card {
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
}

.hero-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: #00f2ff;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
}

.hero-avatar {
  width: 100px;
  height: 100px;
  border: 2px solid #00f2ff;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); /* 切角造型 */
  object-fit: cover;
}

/* 戰鬥規格數據條特效 */
.stat-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px;
  border-left: 3px solid #ff4444; /* 力量用紅色 */
}
</style>