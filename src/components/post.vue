<script setup lang="js">
// 定義顏色對應表，讓不同屬性有不同發光色
const statStyles = {
  strength: { label: '力量', color: '#ff4444' },     // 紅色
  agility: { label: '敏捷', color: '#42b883' },      // 綠色
  intelligence: { label: '智力', color: '#00c6ff' }  // 藍色
}

const props = defineProps({
  hero: {
    type: Object,
    required: true,
    default: () => ({
      id: 'unknown',
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
    <div class="scanline"></div>

    <header>
      <div class="header-main">
        <div class="title-group">
          <h2>{{ hero.name }}</h2>
          <span class="id-tag">#{{ hero.id.toString().padStart(3, '0') }}</span>
        </div>
        <p class="alias">{{ hero.alias }}</p>
      </div>
      <img :src="`/images/${hero.alias}.jpg`" :alt="hero.name" class="hero-avatar">
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
      <div class="stats-header">
        <h3>戰鬥規格分析</h3>
        <small class="hint">STATUS: ACTIVE</small>
      </div>

      <div class="stats-grid">
        <div v-for="(config, key) in statStyles" :key="key" class="stat-item-container">
          <div class="stat-info">
            <span class="label">{{ config.label }}</span>
            <span class="value">{{ hero.cards[key] }}</span>
          </div>
          <div class="progress-bg">
            <div 
              class="progress-fill" 
              :style="{ 
                width: hero.cards[key] + '%', 
                backgroundColor: config.color,
                boxShadow: `0 0 10px ${config.color}`
              }"
            ></div>
          </div>
        </div>
      </div>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
// 1. 全域變數設定 (方便統一管理遊戲風格顏色)
$card-bg: rgba(15, 20, 25, 0.9); // 極深藍黑色
$border-cyan: rgba(0, 242, 255, 0.4);
$glow-cyan: rgba(0, 242, 255, 0.6);
$text-dim: rgba(255, 255, 255, 0.7);

.hero-card {
  position: relative;
  // 背景改為深色漸層，增加厚度感
  background: linear-gradient(145deg, #0f141a, #1a1f25);
  border: 1px solid $border-cyan;
  border-radius: 12px;
  padding: 24px;
  color: #ffffff; // 文字統一改為白色或亮青色
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);

  // 磨砂玻璃效果 (若背景有圖片會更明顯)
  backdrop-filter: blur(10px);

  &.clickable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-8px);
      border-color: #00f2ff;
      // Hover 時增加霓虹外發光
      box-shadow: 0 0 30px rgba(0, 242, 255, 0.25), 
                  inset 0 0 15px rgba(0, 242, 255, 0.1);
      
      .scanline { opacity: 0.3; }
    }
  }
}

header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); // 分隔線改為半透明白
  padding-bottom: 15px;
  margin-bottom: 20px;

  h2 {
    color: #00f2ff;
    text-shadow: 0 0 8px rgba(0, 242, 255, 0.4);
    font-size: 1.8rem;
    margin: 0;
  }

  .alias {
    color: $text-dim;
    font-size: 1rem;
    letter-spacing: 1px;
  }
}

.hero-avatar {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  border: 2px solid #00f2ff;
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
  background: #000;
  object-fit: cover;
}

.description {
  color: $text-dim; // 敘述文字改為淡灰色，避免刺眼
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 進度條區域美化 */
footer {
  margin-top: 25px;
  background: rgba(0, 0, 0, 0.3); // 給數據區一個更深的底色塊
  padding: 15px;
  border-radius: 8px;

  h3 {
    font-size: 1rem;
    color: #00f2ff;
    text-transform: uppercase;
    margin-bottom: 15px;
    letter-spacing: 2px;
  }
}

.progress-bg {
  background: rgba(255, 255, 255, 0.05); // 軌道改為極淡的半透明
  height: 6px;
  border-radius: 10px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5); // 內凹感
}

.tag {
  background: rgba(0, 242, 255, 0.1); // 標籤背景透明化
  border: 1px solid rgba(0, 242, 255, 0.3);
  color: #00f2ff;
  
  &-power { 
    background: rgba(255, 68, 68, 0.1);
    border-color: rgba(255, 68, 68, 0.4);
    color: #ff4444; 
  }
  
  &-intel { 
    background: rgba(0, 198, 255, 0.1);
    border-color: rgba(0, 198, 255, 0.4);
    color: #00c6ff; 
  }
}

// 裝飾性的掃描線動畫
.scanline {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 4px;
  background: linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.2), transparent);
  opacity: 0.1;
  pointer-events: none;
  animation: scan 6s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
}
</style>