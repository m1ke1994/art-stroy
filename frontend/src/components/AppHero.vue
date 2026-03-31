<script setup>
import { ref, onMounted } from 'vue'
import { heroBlock } from '@/data/data.js'

// Длительность одного слогана (мс) × кол-во слоганов + небольшой буфер
const SLOGAN_DURATION   = 2000
const SEQUENCE_DURATION = heroBlock.slogans.length * SLOGAN_DURATION + 600

const videoRef     = ref(null)
const contentReady = ref(false)

onMounted(() => {
  const reveal = () => { contentReady.value = true }

  const timer = setTimeout(reveal, SEQUENCE_DURATION)

  videoRef.value?.addEventListener('ended', () => {
    clearTimeout(timer)
    reveal()
  })
})
</script>

<template>
  <section class="hero">

    <!-- ─── Фоновое видео ───────────────────────────────── -->
    <video
      ref="videoRef"
      class="hero__video"
      :src="heroBlock.videoSrc"
      autoplay
      muted
      playsinline
      preload="auto"
    />

    <!-- ─── Overlay-затемнение ─────────────────────────── -->
    <div class="hero__overlay" />

    <!-- ─── Слоганы (CSS-таймлайн) ────────────────────── -->
    <div class="hero__slogans" :class="{ 'is-done': contentReady }">
      <p
        v-for="(slogan, i) in heroBlock.slogans"
        :key="i"
        class="hero__slogan"
        :style="{ animationDelay: `${i * SLOGAN_DURATION}ms` }"
      >
        {{ slogan }}
      </p>
    </div>

    <!-- ─── Основной контент (появляется после слоганов) ── -->
    <div class="hero__content" :class="{ 'is-visible': contentReady }">

      <div class="hero__text">
        <h1 class="hero__title">{{ heroBlock.title }}</h1>
        <p  class="hero__description">{{ heroBlock.description }}</p>
      </div>

      <div class="hero__stats">
        <div
          v-for="(stat, i) in heroBlock.stats"
          :key="i"
          class="hero__stat"
          :class="{ 'hero__stat--divided': i > 0 }"
        >
          <span class="hero__stat-value">{{ stat.value }}</span>
          <span class="hero__stat-text">{{ stat.text }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>

/* ═══════════════════════════════════════════════════════════
   HERO — обёртка
═══════════════════════════════════════════════════════════ */

.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #080808;
}

/* ═══════════════════════════════════════════════════════════
   ВИДЕО
═══════════════════════════════════════════════════════════ */

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* ═══════════════════════════════════════════════════════════
   OVERLAY
═══════════════════════════════════════════════════════════ */

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.55) 60%,
    rgba(0, 0, 0, 0.72) 100%
  );
  z-index: 1;
}

/* ═══════════════════════════════════════════════════════════
   СЛОГАНЫ
═══════════════════════════════════════════════════════════ */

.hero__slogans {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  pointer-events: none;
  transition: opacity 0.8s ease;
}

.hero__slogans.is-done {
  opacity: 0;
}

.hero__slogan {
  position: absolute;
  opacity: 0;
  color: #ffffff;
  font-size: clamp(1.1rem, 3.2vw, 2.4rem);
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  padding: 0 2rem;
  animation: sloganReveal 2s ease both;
}

@keyframes sloganReveal {
  0%   { opacity: 0; transform: translateY(18px) scale(0.97); filter: blur(8px);  }
  16%  { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);    }
  72%  { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);    }
  100% { opacity: 0; transform: translateY(-12px) scale(0.98); filter: blur(6px); }
}

/* ═══════════════════════════════════════════════════════════
   ОСНОВНОЙ КОНТЕНТ
═══════════════════════════════════════════════════════════ */

.hero__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 10;
  pointer-events: none;
}

/* ── Текстовый блок ──────────────────────────────── */

.hero__text {
  opacity: 0;
  transform: translateY(30px);
  padding: 0 3.5rem 2.5rem;
  max-width: 52rem;
}

.hero__content.is-visible {
  pointer-events: auto;
}

.hero__content.is-visible .hero__text {
  animation: slideUp 1.1s 0.1s ease forwards;
}

.hero__title {
  color: #ffffff;
  font-size: clamp(1.6rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.22;
  letter-spacing: -0.025em;
  margin: 0 0 0.9rem;
}

.hero__description {
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(0.85rem, 1.25vw, 1rem);
  line-height: 1.75;
  max-width: 36rem;
  margin: 0;
}

/* ── Статистика ──────────────────────────────────── */

.hero__stats {
  opacity: 0;
  transform: translateY(40px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: rgba(8, 8, 8, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.9rem 3.5rem;
}

.hero__content.is-visible .hero__stats {
  animation: slideUp 1.1s 0.3s ease forwards;
}

.hero__stat {
  text-align: center;
  padding: 0 1.5rem;
}

.hero__stat--divided {
  border-left: 1px solid rgba(255, 255, 255, 0.09);
}

.hero__stat-value {
  display: block;
  color: #ffffff;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.hero__stat-text {
  display: block;
  color: rgba(255, 255, 255, 0.48);
  font-size: clamp(0.68rem, 1vw, 0.78rem);
  line-height: 1.45;
  max-width: 130px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════ */

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
═══════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
  .hero__text {
    padding: 0 1.5rem 2rem;
  }

  .hero__stats {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 0;
  }

  .hero__stat {
    padding: 1rem 1rem;
    text-align: left;
  }

  .hero__stat--divided {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.09);
  }

  .hero__stat-text {
    max-width: none;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .hero__slogan {
    letter-spacing: 0.1em;
  }
}
</style>
