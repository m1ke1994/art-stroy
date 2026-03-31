<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppHeader    from '@/components/AppHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import CTABlock     from '@/components/sections/CTABlock.vue'
import { companyStory, advantages } from '@/data/siteContent.js'

const statsRef   = ref(null)
const storyRef   = ref(null)
const approachRef = ref(null)

const statsVisible   = ref(false)
const storyVisible   = ref(false)
const approachVisible = ref(false)

const stats = [
  { value: '1997', label: 'год основания' },
  { value: '25+',  label: 'лет на рынке' },
  { value: '300+', label: 'объектов сдано' },
  { value: '3',    label: 'ключевых направления' },
]

const approach = [
  {
    num:   '01',
    title: 'Инженерная точность',
    text:  'Каждое решение проходит инженерный расчёт. Мы не допускаем приблизительности — от чертежа до монтажа.',
  },
  {
    num:   '02',
    title: 'Собственное производство',
    text:  'Металлоконструкции и изделия из стекла изготавливаются на нашем оборудовании — без посредников и потери контроля над качеством.',
  },
  {
    num:   '03',
    title: 'Комплексная реализация',
    text:  'Мы берём объект под ключ: от замера и проектирования до монтажа и финишной сдачи. Один подрядчик — полная ответственность.',
  },
]

let observers = []

const makeObserver = (refEl, visibleRef) => {
  const obs = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { visibleRef.value = true; obs.disconnect() } },
    { threshold: 0.08 }
  )
  if (refEl.value) obs.observe(refEl.value)
  observers.push(obs)
}

onMounted(() => {
  makeObserver(statsRef,    statsVisible)
  makeObserver(storyRef,    storyVisible)
  makeObserver(approachRef, approachVisible)
})

onBeforeUnmount(() => observers.forEach(o => o.disconnect()))
</script>

<template>
  <div class="about-page">
    <AppHeader />

    <!-- ═══ PAGE HERO ══════════════════════════════════════════ -->
    <section class="aph">
      <div class="aph__wrap">
        <p class="aph__eyebrow">О компании</p>
        <h1 class="aph__title">Инженерия<br>и эстетика<br>в одном решении</h1>
        <p class="aph__subtitle">
          Мы создаём металлоконструкции, системы остекления и фасадные решения —
          объединяя точность производства с архитектурным взглядом на каждый объект.
        </p>
      </div>
      <div class="aph__line" />
    </section>

    <!-- ═══ STATS ══════════════════════════════════════════════ -->
    <section ref="statsRef" class="ast">
      <div class="ast__wrap">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="ast__item"
          :class="{ 'is-visible': statsVisible }"
          :style="{ '--delay': `${i * 0.12}s` }"
        >
          <span class="ast__value">{{ s.value }}</span>
          <span class="ast__label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ═══ COMPANY STORY ══════════════════════════════════════ -->
    <section ref="storyRef" class="ast-story">
      <div class="ast-story__wrap">

        <div class="ast-story__header" :class="{ 'is-visible': storyVisible }">
          <SectionHeader
            title="История компании"
            subtitle="Путь от локального производителя металлоконструкций до компании с полным циклом архитектурных решений."
            align="left"
          />
        </div>

        <div class="ast-story__grid">
          <article
            v-for="(milestone, i) in companyStory"
            :key="milestone.year"
            class="ast-story__card"
            :class="{ 'is-visible': storyVisible }"
            :style="{ '--delay': `${0.1 + i * 0.18}s` }"
          >
            <div class="ast-story__card-image">
              <div class="ast-story__shimmer" />
              <img
                :src="milestone.image"
                :alt="milestone.title"
                class="ast-story__img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="ast-story__card-body">
              <span class="ast-story__year">{{ milestone.year }}</span>
              <h3 class="ast-story__card-title">{{ milestone.title }}</h3>
              <p  class="ast-story__card-text">{{ milestone.text }}</p>
            </div>
          </article>
        </div>

        <!-- Timeline track -->
        <div class="ast-story__timeline" :class="{ 'is-visible': storyVisible }">
          <div class="ast-story__track">
            <div
              v-for="milestone in companyStory"
              :key="milestone.year"
              class="ast-story__dot-wrap"
            >
              <span class="ast-story__dot" />
              <span class="ast-story__dot-year">{{ milestone.year }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ WHO WE ARE ════════════════════════════════════════ -->
    <section class="aww">
      <div class="aww__wrap">
        <div class="aww__col-text">
          <p class="aww__eyebrow">Кто мы</p>
          <h2 class="aww__title">Не просто подрядчик — архитектурный партнёр</h2>
          <p class="aww__text">
            За 25 лет мы прошли путь от производителя металлоконструкций до компании,
            которая реализует объекты комплексно: проектирование, металл, стекло, фасад.
          </p>
          <p class="aww__text">
            Наш подход — это сочетание инженерной строгости и архитектурного чутья.
            Мы не ищем компромисс между красотой и надёжностью: для нас это одно и то же.
          </p>
        </div>
        <div class="aww__col-list">
          <div
            v-for="(adv, i) in advantages.slice(0, 3)"
            :key="adv.label"
            class="aww__adv"
          >
            <span class="aww__adv-num">0{{ i + 1 }}</span>
            <div>
              <p class="aww__adv-title">{{ adv.label }}</p>
              <p class="aww__adv-text">{{ adv.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ OUR APPROACH ══════════════════════════════════════ -->
    <section ref="approachRef" class="aap">
      <div class="aap__wrap">

        <div class="aap__header" :class="{ 'is-visible': approachVisible }">
          <SectionHeader
            title="Наш подход"
            subtitle="Три принципа, которые определяют качество каждого нашего объекта."
            align="center"
          />
        </div>

        <div class="aap__grid">
          <div
            v-for="(item, i) in approach"
            :key="item.num"
            class="aap__card"
            :class="{ 'is-visible': approachVisible }"
            :style="{ '--delay': `${0.1 + i * 0.15}s` }"
          >
            <span class="aap__num">{{ item.num }}</span>
            <h3 class="aap__card-title">{{ item.title }}</h3>
            <p  class="aap__card-text">{{ item.text }}</p>
          </div>
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

.aph {
  padding: 10rem 2rem 5rem;
  background: transparent;
  position: relative;
  overflow: hidden;
}

/* subtle radial glow at top */
.aph::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(50, 50, 140, 0.22) 0%, transparent 70%);
  pointer-events: none;
}

.aph__wrap {
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.aph__eyebrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 1.5rem;
}

.aph__title {
  color: #ffffff;
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 2rem;
}

.aph__subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.75;
  max-width: 46rem;
  margin: 0;
}

.aph__line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

/* ═══════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════ */

.ast {
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ast__wrap {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
}

.ast__item {
  padding: 2.5rem 2.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0s, transform 0s;
}

.ast__item:last-child { border-right: none; }

.ast__item.is-visible {
  animation: fadeUp 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

.ast__value {
  display: block;
  color: #ffffff;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.ast__label {
  display: block;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ═══════════════════════════════════════════════════════════
   COMPANY STORY
═══════════════════════════════════════════════════════════ */

.ast-story {
  padding: 7rem 2rem;
  background: transparent;
}

.ast-story__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.ast-story__header {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.ast-story__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.ast-story__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

/* ── Story Card ──────────────────────────── */
.ast-story__card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0s, transform 0s;
}

.ast-story__card.is-visible {
  animation: fadeUp 0.8s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.ast-story__card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.ast-story__shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.03) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite ease-in-out;
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.ast-story__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.ast-story__card:hover .ast-story__img {
  transform: scale(1.04);
}

.ast-story__card-body {
  padding: 1.75rem 2rem 2rem;
}

.ast-story__year {
  display: block;
  color: rgba(255, 255, 255, 0.2);
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.ast-story__card-title {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0 0 0.75rem;
}

.ast-story__card-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  line-height: 1.75;
  margin: 0;
}

/* ── Timeline ────────────────────────────── */
.ast-story__timeline {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s 0.4s ease, transform 0.8s 0.4s ease;
}
.ast-story__timeline.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.ast-story__track {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding: 0 0 0;
}

.ast-story__track::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.ast-story__dot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.ast-story__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.ast-story__dot-year {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
}

/* ═══════════════════════════════════════════════════════════
   WHO WE ARE
═══════════════════════════════════════════════════════════ */

.aww {
  padding: 7rem 2rem;
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.aww__wrap {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.aww__eyebrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
}

.aww__title {
  color: #ffffff;
  font-size: clamp(1.6rem, 2.8vw, 2.4rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 1.5rem;
}

.aww__text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  line-height: 1.8;
  margin: 0 0 1rem;
}

.aww__col-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
}

.aww__adv {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.aww__adv:last-child { border-bottom: none; }

.aww__adv-num {
  color: rgba(255, 255, 255, 0.15);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  flex-shrink: 0;
  line-height: 1.4;
}

.aww__adv-title {
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 0.35rem;
}

.aww__adv-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.85rem;
  line-height: 1.65;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   OUR APPROACH
═══════════════════════════════════════════════════════════ */

.aap {
  padding: 7rem 2rem;
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.aap__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.aap__header {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.aap__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.aap__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.aap__card {
  padding: 2.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0s, transform 0s;
}

.aap__card.is-visible {
  animation: fadeUp 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.aap__num {
  display: block;
  color: rgba(255, 255, 255, 0.12);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  margin-bottom: 1.5rem;
}

.aap__card-title {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.aap__card-text {
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.875rem;
  line-height: 1.75;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */

@media (max-width: 1024px) {
  .ast__wrap { grid-template-columns: repeat(2, 1fr); }
  .ast-story__grid { grid-template-columns: repeat(2, 1fr); }
  .aap__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .aww__wrap { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 640px) {
  .aph { padding: 8rem 1.25rem 4rem; }
  .ast__wrap { grid-template-columns: repeat(2, 1fr); }
  .ast__item { padding: 1.75rem 1.5rem; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .ast__item:last-child { border-bottom: none; }
  .ast-story { padding: 5rem 1.25rem; }
  .ast-story__grid { grid-template-columns: 1fr; }
  .ast-story__timeline { display: none; }
  .aww { padding: 5rem 1.25rem; }
  .aap { padding: 5rem 1.25rem; }
  .aap__grid { grid-template-columns: 1fr; }
}
</style>
