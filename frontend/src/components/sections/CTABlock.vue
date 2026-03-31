<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { cta }        from '@/data/siteContent.js'

const sectionRef = ref(null)
const isVisible  = ref(false)
let   observer   = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { isVisible.value = true; observer?.disconnect() } },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="cta">
    <div class="cta__wrap" :class="{ 'is-visible': isVisible }">
      <div class="cta__inner">
        <div class="cta__text">
          <h2 class="cta__title">{{ cta.heading }}</h2>
          <p  class="cta__subtitle">{{ cta.subheading }}</p>
        </div>

        <div class="cta__actions">
          <RouterLink :to="cta.primaryBtn.to" class="cta__btn cta__btn--primary">
            {{ cta.primaryBtn.label }}
          </RouterLink>
          <RouterLink :to="cta.secondaryBtn.to" class="cta__btn cta__btn--ghost">
            {{ cta.secondaryBtn.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding: 7rem 2rem;
  background: transparent;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.cta__wrap {
  max-width: 1240px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.cta__wrap.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 3.5rem 4rem;
  background: linear-gradient(135deg, rgba(14, 14, 40, 0.55) 0%, rgba(6, 6, 20, 0.35) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow:
    0 0 80px rgba(20, 20, 70, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  position: relative;
  overflow: hidden;
}

/* subtle glow spot at top-left */
.cta__inner::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -40px;
  width: 320px;
  height: 320px;
  background: radial-gradient(ellipse, rgba(60, 60, 160, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.cta__text {
  flex: 1;
  min-width: 0;
}

.cta__title {
  color: #ffffff;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 0.9rem;
}

.cta__subtitle {
  color: rgba(255,255,255,0.5);
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  line-height: 1.7;
  margin: 0;
  max-width: 42rem;
}

.cta__actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

/* ── Buttons ──────────────────────────── */
.cta__btn {
  display: inline-block;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
}

.cta__btn--primary {
  background: rgba(255,255,255,0.92);
  color: #080808;
  border: 1px solid transparent;
}

.cta__btn--primary:hover {
  background: #ffffff;
  transform: translateY(-1px);
}

.cta__btn--ghost {
  background: transparent;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.2);
}

.cta__btn--ghost:hover {
  color: #ffffff;
  border-color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.04);
}

/* ── Responsive ───────────────────────── */
@media (max-width: 900px) {
  .cta__inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 2rem;
  }
}

@media (max-width: 560px) {
  .cta { padding: 5rem 1.25rem; }
  .cta__inner { padding: 2rem 1.5rem; gap: 2rem; }
  .cta__actions { flex-direction: column; width: 100%; }
  .cta__btn { text-align: center; }
}
</style>
