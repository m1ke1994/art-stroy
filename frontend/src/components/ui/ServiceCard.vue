<script setup>
import ImageLoader from './ImageLoader.vue'
import { RouterLink } from 'vue-router'

defineProps({
  service: { type: Object, required: true },
  index:   { type: Number, default: 0 },
})
</script>

<template>
  <article class="sc" :style="{ '--delay': `${index * 0.15}s` }">
    <div class="sc__image">
      <ImageLoader :src="service.image" :alt="service.title" aspect="16 / 10" />
    </div>

    <div class="sc__body">
      <p class="sc__tagline">{{ service.tagline }}</p>
      <h3 class="sc__title">{{ service.title }}</h3>
      <p class="sc__description">{{ service.description }}</p>

      <ul class="sc__works">
        <li v-for="work in service.works.slice(0, 4)" :key="work" class="sc__work-item">
          <span class="sc__work-dot" />
          {{ work }}
        </li>
      </ul>

      <RouterLink :to="`/services#${service.id}`" class="sc__btn">
        Подробнее
        <svg class="sc__btn-arrow" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.sc {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease;
  opacity: 0;
  transform: translateY(36px);
  animation: scReveal 0.8s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.sc:hover {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
}

@keyframes scReveal {
  to { opacity: 1; transform: translateY(0); }
}

/* ── Image ───────────────────────────────── */
.sc__image {
  width: 100%;
  overflow: hidden;
}

.sc__image :deep(.il__img) {
  transition: transform 0.6s ease, opacity 0.5s ease;
}

.sc:hover .sc__image :deep(.il__img) {
  transform: scale(1.04);
}

/* ── Body ────────────────────────────────── */
.sc__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.75rem 2rem 2rem;
}

.sc__tagline {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 0.55rem;
}

.sc__title {
  color: #ffffff;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 0.85rem;
  line-height: 1.2;
}

.sc__description {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0 0 1.4rem;
}

/* ── Works list ──────────────────────────── */
.sc__works {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.sc__work-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.85rem;
  line-height: 1.4;
}

.sc__work-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

/* ── Button ──────────────────────────────── */
.sc__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.25s ease, gap 0.25s ease;
  align-self: flex-start;
}

.sc__btn:hover {
  color: #ffffff;
  gap: 0.75rem;
}

.sc__btn-arrow {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
