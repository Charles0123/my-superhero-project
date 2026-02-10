<template>
    <main class="skill-detail">
        <header>
            <h1>{{ hero,name }} - 技能詳解</h1>
        </header>

        <section class="skill-grid">
            <article v-for="skill in hero.skills" :key="skill.name" class="skill-item">
                <div class="skill-icon">⚡</div>
                <div class="skill-info">
                    <h3>{{ skill.name }}</h3>
                    <p>{{ skill.effect }}</p>
                    <span class="cooldown">冷卻時間:{{skill.cd}}s</span>
                </div>
            </article>
        </section>
        <footer>
            <router-link to="/">返回列表</router-link>
        </footer>
    </main>
</template>