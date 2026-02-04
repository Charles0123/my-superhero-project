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
      description: '這位英雄的資料尚未提供。'
    })
  }
})

</script>

<template>
    <div class="post-card">
        <h2>{{ hero.name }}</h2>
        <p><strong>Alias:</strong> {{ hero.alias }}</p>
        <p><strong>Powers:</strong> {{ hero.powers.join(', ') }}</p>
        <p><strong>Description:</strong> {{ hero.description }}</p>
        <h3>英雄資料</h3>
        <p>英雄名稱: {{ hero.name }}</p>
        <p>別名: {{ hero.alias }}</p>
        <p>能力: {{ hero.powers.join(', ') }}</p>
    </div>
    
</template>