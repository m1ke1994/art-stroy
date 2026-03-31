<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { advantages } from '@/data/siteContent.js'

const sectionRef = ref(null)
const isVisible  = ref(false)
let   observer   = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { isVisible.value = true; observer?.disconnect() } },
    { threshold: 0.08 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="why">
    <div class="why__wrap">

      <div class="why__header" :class="{ 'is-visible': isVisible }">
        <SectionHeader
          title="Почему выбирают нас"
          subtitle="25 лет опыта, собственное производство и команда, которая берёт ответственность за каждый этап."
          align="center"
        />
      </div>

      <div class="why__grid">
        <div
          v-for="(item, i) in advantages"
          :key="item.label"
          class="why__card"
          :class="{ 'is-visible': isVisible }"
          :style="{ '--delay': `${0.05 + i * 0.1}s` }"
        >
          <div class="why__card-icon">{{ item.value }}</div>
          <h3 class="why__card-title">{{ item.label }}</h3>
          <p  class="why__card-text">{{ item.text }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.why {
  padding: 7rem 2rem;
  background: transparent;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.why__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.why__header {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  margin-bottom: 3.5rem;
}

.why__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Grid ─────────────────────────────── */
.why__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,0.07); /* gap color */
}

/* ── Card ─────────────────────────────── */
.why__card {
  background: rgba(255, 255, 255, 0.03);
  padding: 2.25rem 2rem;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0s, transform 0s;
}

.why__card.is-visible {
  animation: cardIn 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes cardIn {
  to { opacity: 1; transform: translateY(0); }
}

.why__card-icon {
  font-size: 1.8rem;
  font-weight: 300;
  color: rgba(255,255,255,0.18);
  margin-bottom: 1rem;
  letter-spacing: -0.04em;
  line-height: 1;
}

.why__card-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 0.65rem;
}

.why__card-text {
  color: rgba(255,255,255,0.48);
  font-size: 0.88rem;
  line-height: 1.7;
  margin: 0;
}

/* ── Responsive ───────────────────────── */
@media (max-width: 900px) {
  .why__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .why { padding: 5rem 1.25rem; }
  .why__grid { grid-template-columns: 1fr; }
  .why__card { padding: 1.75rem 1.5rem; }
}
</style>
