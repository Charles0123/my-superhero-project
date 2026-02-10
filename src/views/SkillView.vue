<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true }
})

const allHeroes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/heroes.json')
    allHeroes.value = await response.json()
  } catch (error) {
    console.error('資料載入失敗:', error)
  } finally {
    loading.value = false
  }
})

const hero = computed(() => {
  return allHeroes.value.find(h => h.id === props.id)
})
</script>

<template>
  <div v-if="loading" class="loading-screen">
    <div class="loader"></div>
    <p>正在同步英雄檔案...</p>
  </div>
  
  <main v-else-if="hero" class="skill-view-container">
    <div class="grid-overlay"></div>
    <div class="scanline"></div>

    <header class="hero-banner">
      <div class="header-left">
        <button @click="$router.push('/')" class="back-btn">
          <span class="arrow">«</span> SYSTEM_BACK
        </button>
        <div class="title-wrap">
          <h1>{{ hero.name }}</h1>
          <span class="id-badge">ID: {{ hero.id }}</span>
        </div>
        <p class="alias">{{ hero.alias }}</p>
      </div>
      <img :src="`/images/${hero.alias}.jpg`" class="hero-profile-img" :alt="hero.name">
    </header>

    <div class="content-grid">
      <section class="skills-list">
        <h2 class="section-title">特殊技能詳解 <span class="blink">_</span></h2>
        <div class="skills-wrapper">
          <article v-for="skill in hero.skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <h3>{{ skill.name }}</h3>
              <span class="cd-tag">CD: {{ skill.cd }}S</span>
            </div>
            <p class="effect-text">{{ skill.effect }}</p>
            <div class="status-bar">READY</div>
          </article>
        </div>
      </section>

      <aside class="hero-stats">
        <h3 class="section-title">屬性評級</h3>
        <div class="stat-group">
          <div v-for="(val, key) in hero.cards" :key="key" class="stat-row">
            <div class="stat-label">
              <span>{{ key.toUpperCase() }}</span>
              <span>{{ val }}%</span>
            </div>
            <div class="stat-progress-bg">
              <div class="stat-progress-fill" :class="key" :style="{ width: val + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="radar-deco">
          <div class="circle pulse"></div>
          <div class="crosshair"></div>
        </div>
      </aside>
    </div>
  </main>

  <div v-else class="error-screen">
    <h2>[ERROR] 找不到該英雄資料</h2>
    <button @click="$router.push('/')" class="back-btn">重試連接</button>
  </div>
</template>

<style lang="scss" scoped>
// 1. 基礎設定與字體 (建議在 index.html 引入 'Orbitron' 或 'Space Mono')
.skill-view-container {
.skill-view-container {
  // 多層背景：最底層徑向漸層 + 中層網格 + 頂層雜訊
  background: 
    radial-gradient(circle at 50% 40%, rgba(0, 100, 150, 0.15) 0%, #05080a 70%), // 核心光暈
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), // 模擬掃描線
    #05080a;
  background-size: 100% 100%, 100% 4px, 100% 100%;
}
}

// 2. 裝飾背景
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 242, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 242, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.scanline {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 10px;
  background: linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.1), transparent);
  animation: scan 8s linear infinite;
}

// 3. Banner 區域
.hero-banner {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #00f2ff;
  padding-bottom: 20px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;

  .title-wrap {
    display: flex;
    align-items: baseline;
    gap: 15px;
    h1 { font-size: 3.5rem; margin: 0; color: #00f2ff; text-shadow: 0 0 20px rgba(0, 242, 255, 0.5); }
    .id-badge { color: rgba(255,255,255,0.4); border: 1px solid; padding: 2px 8px; font-size: 0.8rem; }
  }
}

.hero-profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #00f2ff;
  clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%);
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
}

// 4. 內容佈局
.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  position: relative;
  z-index: 2;
}

h3, .section-title {
  color: #00f2ff;
  text-shadow: 
    0 0 5px rgba(0, 242, 255, 0.8),
    0 0 15px rgba(0, 242, 255, 0.3);
  text-transform: uppercase;
}

// 5. 技能卡片
.skill-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s;
  border-left: 4px solid #00f2ff;

  &:hover {
    background: rgba(0, 242, 255, 0.08);
    transform: translateX(10px);
    border-left-width: 10px;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    h3 { margin: 0; color: #fff; font-size: 1.4rem; }
    .cd-tag { color: #ff4444; font-weight: bold; }
  }
  .effect-text {
  color: rgba(200, 230, 255, 0.8); // 淺藍灰色字體比純白更有層次
}
}

// 6. 側邊屬性條
.stat-row {
  margin-bottom: 20px;
  .stat-label { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.8rem; }
}

.stat-progress-bg {
  height: 4px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}

.stat-progress-fill {
  height: 100%;
  transition: width 1s ease-out;
  &.strength { background: #ff4444; box-shadow: 0 0 10px #ff4444; }
  &.agility { background: #42b883; box-shadow: 0 0 10px #42b883; }
  &.intelligence { background: #00c6ff; box-shadow: 0 0 10px #00c6ff; }
}

// 7. 按鈕與動畫
.back-btn {
  background: transparent;
  border: none;
  color: #00f2ff;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
  &:hover { text-shadow: 0 0 10px #00f2ff; }
}

@keyframes scan {
  0% { top: -10%; }
  100% { top: 110%; }
}

.blink { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0; } }

// 8. 雷達裝飾
.radar-deco {
  margin-top: 50px;
  height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
  .circle { width: 100px; height: 100px; border: 1px solid #00f2ff; border-radius: 50%; }
  .pulse { animation: pulse 2s infinite; }
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}
// 針對 .skills-list 或內部的 white block 調整
.skills-list {
  background: transparent; // 移除純白背景
  
  .skills-wrapper {
    background: rgba(20, 25, 30, 0.6); // 改用深色半透明
    backdrop-filter: blur(15px); // 增加毛玻璃空間感
    border: 1px solid rgba(0, 242, 255, 0.1);
    border-radius: 12px;
    padding: 30px;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5); // 內凹陰影增加深度
  }
}

.skill-item {
  background: rgba(255, 255, 255, 0.03); // 讓技能項若隱若現
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: none; // 移除實體陰影
}
</style>