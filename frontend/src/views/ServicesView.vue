<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader     from '@/components/AppHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ImageLoader   from '@/components/ui/ImageLoader.vue'
import CTABlock      from '@/components/sections/CTABlock.vue'
import { services }  from '@/data/siteContent.js'

// Per-service section visibility
const sectionRefs = ref([])
const sectionVisible = ref(services.map(() => false))
let observers = []

onMounted(() => {
  sectionRefs.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sectionVisible.value[i] = true; obs.disconnect() } },
      { threshold: 0.06 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})
onBeforeUnmount(() => observers.forEach(o => o.disconnect()))
</script>

<template>
  <div class="services-page">
    <AppHeader />

    <!-- ═══ PAGE HERO ══════════════════════════════════════════ -->
    <section class="svph">
      <div class="svph__wrap">
        <p class="svph__eyebrow">Услуги</p>
        <h1 class="svph__title">Три направления —<br>один стандарт качества</h1>
        <p class="svph__subtitle">
          Металлоконструкции, остекление и фасады — полный производственный цикл
          под контролем одной команды от проекта до сдачи объекта.
        </p>
        <!-- Quick nav -->
        <nav class="svph__nav">
          <a
            v-for="service in services"
            :key="service.id"
            :href="`#${service.id}`"
            class="svph__nav-link"
          >
            {{ service.title }}
          </a>
        </nav>
      </div>
    </section>

    <!-- ═══ SERVICE SECTIONS ══════════════════════════════════ -->
    <section
      v-for="(service, si) in services"
      :key="service.id"
      :id="service.id"
      :ref="el => { if (el) sectionRefs.value[si] = el }"
      class="sv"
      :class="[si % 2 === 0 ? 'sv--dark' : 'sv--darker', { 'is-visible': sectionVisible[si] }]"
    >
      <div class="sv__wrap">

        <!-- ── Header row ──────────────────────────── -->
        <div class="sv__header">
          <div class="sv__header-text">
            <span class="sv__num">0{{ si + 1 }}</span>
            <p class="sv__tagline">{{ service.tagline }}</p>
            <h2 class="sv__title">{{ service.title }}</h2>
            <p class="sv__desc">{{ service.description }}</p>
          </div>
          <div class="sv__header-image">
            <ImageLoader :src="service.image" :alt="service.title" aspect="4 / 3" />
          </div>
        </div>

        <!-- ── Works ──────────────────────────────── -->
        <div class="sv__block">
          <h3 class="sv__block-title">Виды работ</h3>
          <ul class="sv__works">
            <li
              v-for="work in service.works"
              :key="work"
              class="sv__work-item"
            >
              <span class="sv__work-dot" />
              {{ work }}
            </li>
          </ul>
        </div>

        <!-- ── Stages ─────────────────────────────── -->
        <div class="sv__block">
          <h3 class="sv__block-title">Этапы работы</h3>
          <div class="sv__stages">
            <div
              v-for="stage in service.stages"
              :key="stage.num"
              class="sv__stage"
            >
              <span class="sv__stage-num">{{ stage.num }}</span>
              <div>
                <p class="sv__stage-title">{{ stage.title }}</p>
                <p class="sv__stage-text">{{ stage.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Advantages ─────────────────────────── -->
        <div class="sv__block">
          <h3 class="sv__block-title">Ключевые преимущества</h3>
          <div class="sv__advantages">
            <div
              v-for="adv in service.advantages"
              :key="adv.title"
              class="sv__adv"
            >
              <p class="sv__adv-title">{{ adv.title }}</p>
              <p class="sv__adv-text">{{ adv.text }}</p>
            </div>
          </div>
        </div>

        <!-- ── Gallery placeholder ────────────────── -->
        <div class="sv__block">
          <h3 class="sv__block-title">Примеры работ</h3>
          <div class="sv__gallery">
            <div
              v-for="n in 4"
              :key="n"
              class="sv__gallery-item"
            >
              <ImageLoader :src="service.image" :alt="`${service.title} — пример ${n}`" aspect="4 / 3" />
            </div>
          </div>
        </div>

        <!-- ── Section CTA ────────────────────────── -->
        <div class="sv__section-cta">
          <p class="sv__cta-text">
            Хотите обсудить {{ service.title.toLowerCase() }} на вашем объекте?
          </p>
          <RouterLink to="/contacts" class="sv__cta-btn">
            Оставить заявку
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>

      </div>
    </section>

    <!-- ═══ CTA ════════════════════════════════════════════════ -->
    <CTABlock />
  </div>
</template>

<style scoped>

/* ═══════════════════════════════════════════════════════════
   PAGE HERO
═══════════════════════════════════════════════════════════ */

.svph {
  padding: 10rem 2rem 5rem;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.svph::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 10%;
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(45, 45, 130, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.svph__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.svph__eyebrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
}

.svph__title {
  color: #ffffff;
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 1.5rem;
}

.svph__subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.75;
  max-width: 44rem;
  margin: 0 0 2.5rem;
}

/* ── Quick nav ───────────────────────────── */
.svph__nav {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.svph__nav-link {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.svph__nav-link:hover {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
}

/* ═══════════════════════════════════════════════════════════
   SERVICE SECTION
═══════════════════════════════════════════════════════════ */

.sv {
  padding: 7rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.sv--dark   { background: transparent; }
.sv--darker { background: transparent; }

.sv.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sv__wrap {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* ── Header row ──────────────────────────── */
.sv__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.sv__num {
  display: block;
  color: rgba(255, 255, 255, 0.1);
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 1;
  margin-bottom: 1rem;
}

.sv__tagline {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.sv__title {
  color: #ffffff;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}

.sv__desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.8;
  margin: 0;
  max-width: 38rem;
}

.sv__header-image {
  border-radius: 14px;
  overflow: hidden;
}

/* ── Block wrapper ───────────────────────── */
.sv__block {
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.sv__block-title {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 2rem;
}

/* ── Works list ──────────────────────────── */
.sv__works {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem 2rem;
}

.sv__work-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
  line-height: 1.5;
}

.sv__work-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
}

/* ── Stages ──────────────────────────────── */
.sv__stages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.sv__stage {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sv__stage-num {
  color: rgba(255, 255, 255, 0.15);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.sv__stage-title {
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 500;
  margin: 0 0 0.35rem;
  letter-spacing: 0.01em;
}

.sv__stage-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.82rem;
  line-height: 1.7;
  margin: 0;
}

/* ── Advantages ──────────────────────────── */
.sv__advantages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.07);
}

.sv__adv {
  background: transparent;
  padding: 2rem 1.75rem;
}

.sv--darker .sv__adv {
  background: rgba(0, 0, 0, 0.18);
}

.sv__adv-title {
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 0.6rem;
}

.sv__adv-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
  line-height: 1.7;
  margin: 0;
}

/* ── Gallery ─────────────────────────────── */
.sv__gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.sv__gallery-item {
  border-radius: 8px;
  overflow: hidden;
}

/* ── Section CTA ─────────────────────────── */
.sv__section-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}

.sv__cta-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  margin: 0;
}

.sv__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: rgba(255, 255, 255, 0.92);
  color: #080808;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: background 0.25s ease, transform 0.2s ease, gap 0.25s ease;
  flex-shrink: 0;
}

.sv__cta-btn:hover {
  background: #ffffff;
  transform: translateY(-1px);
  gap: 0.75rem;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */

@media (max-width: 1100px) {
  .sv__stages { grid-template-columns: repeat(2, 1fr); }
  .sv__gallery { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .sv__header { grid-template-columns: 1fr; gap: 2.5rem; }
  .sv__works { grid-template-columns: repeat(2, 1fr); }
  .sv__advantages { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .svph { padding: 8rem 1.25rem 4rem; }
  .sv { padding: 5rem 1.25rem; }
  .sv__stages { grid-template-columns: 1fr; }
  .sv__works { grid-template-columns: 1fr; }
  .sv__gallery { grid-template-columns: repeat(2, 1fr); }
  .sv__section-cta { flex-direction: column; align-items: flex-start; padding: 1.5rem; }
  .sv__cta-btn { width: 100%; justify-content: center; }
}
</style>
