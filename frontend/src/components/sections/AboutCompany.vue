<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { aboutBlock } from '@/data/data.js'

const sectionRef = ref(null)
const isVisible  = ref(false)
let   observer   = null

const tStart = parseInt(aboutBlock.timeline.start)
const tEnd   = parseInt(aboutBlock.timeline.end)

const timelinePos = (year) =>
  ((parseInt(year) - tStart) / (tEnd - tStart)) * 100

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.08 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    :id="aboutBlock.sectionId"
    ref="sectionRef"
    class="about"
  >

    <div class="about__wrap">

      <!-- ── Заголовок секции ──────────────────────── -->
      <div class="about__header" :class="{ 'is-visible': isVisible }">
        <h2 class="about__title">{{ aboutBlock.heading }}</h2>

        <div class="about__subtitle-row">
          <span class="about__subtitle-line" />
          <p class="about__subtitle">{{ aboutBlock.subheading }}</p>
          <span class="about__subtitle-line" />
        </div>
      </div>

      <!-- ── Основной стеклянный контейнер ────────── -->
      <div class="about__glass" :class="{ 'is-visible': isVisible }">

        <!-- Сетка карточек -->
        <div class="about__grid">
          <div
            v-for="(item, i) in aboutBlock.milestones"
            :key="item.year"
            class="about__card"
            :style="{ '--card-delay': `${0.1 + i * 0.18}s` }"
          >
            <div class="about__card-year">{{ item.year }}</div>
            <h3 class="about__card-title">{{ item.title }}</h3>
            <p  class="about__card-text">{{ item.text }}</p>
            <div class="about__card-image">
              <img :src="item.image" :alt="item.title" />
            </div>
          </div>
        </div>

        <!-- Таймлайн ─────────────────────────────── -->
        <div class="about__timeline">
          <span class="about__tl-label">{{ aboutBlock.timeline.start }}</span>

          <div class="about__tl-track">
            <div class="about__tl-line" />
            <div
              v-for="item in aboutBlock.milestones"
              :key="item.year"
              class="about__tl-dot"
              :style="{ left: `${timelinePos(item.year)}%` }"
            >
              <div class="about__tl-dot-inner" />
              <span class="about__tl-dot-year">{{ item.year }}</span>
            </div>
          </div>

          <span class="about__tl-label">{{ aboutBlock.timeline.end }}</span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>

/* ═══════════════════════════════════════════════════════════
   СЕКЦИЯ
═══════════════════════════════════════════════════════════ */

.about {
  padding: 7rem 2rem 6rem;
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.about__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════════════════════════
   ЗАГОЛОВОК
═══════════════════════════════════════════════════════════ */

.about__header {
  text-align: center;
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.about__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.about__title {
  color: #ffffff;
  font-size: clamp(2rem, 4.5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);
}

.about__subtitle-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  max-width: 780px;
  margin: 0 auto;
}

.about__subtitle-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.22),
    transparent
  );
  min-width: 40px;
  max-width: 180px;
}

.about__subtitle {
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
  margin: 0;
  flex-shrink: 1;
}

/* ═══════════════════════════════════════════════════════════
   СТЕКЛЯННЫЙ КОНТЕЙНЕР
═══════════════════════════════════════════════════════════ */

.about__glass {
  background: rgba(12, 12, 12, 0.52);
  backdrop-filter: blur(18px) saturate(1.3);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  box-shadow:
    0 12px 64px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  padding: 3rem 3rem 2.5rem;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s 0.15s ease, transform 0.9s 0.15s ease;
}

.about__glass.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════════════════════
   СЕТКА КАРТОЧЕК
═══════════════════════════════════════════════════════════ */

.about__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 2.5rem;
}

/* ── Карточка ──────────────────────────────────────── */

.about__card {
  padding: 0 2.5rem 0 0;
  opacity: 0;
  transform: translateY(50px);
}

.about__card:not(:first-child) {
  padding-left: 2.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.about__card:last-child {
  padding-right: 0;
}

.about__glass.is-visible .about__card {
  animation: cardReveal 0.9s var(--card-delay, 0.1s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.about__card-year {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.12);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.6rem;
  /* Тонкий accent-цвет для цифры */
  background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.20) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about__card-title {
  color: #ffffff;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin: 0 0 0.9rem;
}

.about__card-text {
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(0.82rem, 1.1vw, 0.9rem);
  line-height: 1.72;
  margin: 0 0 1.5rem;
}

.about__card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.about__card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.85) saturate(0.9);
  transition: filter 0.4s ease, transform 0.6s ease;
}

.about__card-image:hover img {
  filter: brightness(0.95) saturate(1);
  transform: scale(1.03);
}

/* ═══════════════════════════════════════════════════════════
   ТАЙМЛАЙН
═══════════════════════════════════════════════════════════ */

.about__timeline {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.about__tl-label {
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  white-space: nowrap;
  flex-shrink: 0;
}

.about__tl-track {
  position: relative;
  flex: 1;
  height: 20px;
  display: flex;
  align-items: center;
}

.about__tl-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.22) 50%,
    rgba(255, 255, 255, 0.08)
  );
}

.about__tl-dot {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.about__tl-dot-inner {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
}

.about__tl-dot-year {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */

@media (max-width: 1024px) {
  .about__glass {
    padding: 2.5rem 2rem 2rem;
  }

  .about__card {
    padding-right: 2rem;
  }

  .about__card:not(:first-child) {
    padding-left: 2rem;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 5rem 1.25rem 4rem;
  }

  .about__glass {
    padding: 2rem 1.5rem 1.75rem;
    border-radius: 14px;
  }

  .about__grid {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .about__card {
    padding: 1.75rem 0;
    border-left: none !important;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .about__card:first-child {
    padding-top: 0;
    border-top: none;
  }

  .about__card:last-child {
    padding-right: 0;
  }

  .about__subtitle-row {
    gap: 1rem;
  }

  .about__subtitle-line {
    max-width: 60px;
  }

  .about__tl-dot-year {
    display: none;
  }
}

@media (max-width: 480px) {
  .about__title {
    letter-spacing: -0.02em;
  }

  .about__glass {
    padding: 1.5rem 1.25rem;
  }
}
</style>
