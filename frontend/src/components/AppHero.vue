<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { heroBlock } from '@/data/data.js'

const SLOGAN_DURATION   = 2000
const SEQUENCE_DURATION = heroBlock.slogans.length * SLOGAN_DURATION + 600

const videoRef      = ref(null)
const contentReady  = ref(false)
const introFinished = ref(false)

let revealTimer = null

const reveal = () => {
  if (introFinished.value) return
  introFinished.value = true
  contentReady.value  = true
}

const skipIntro = () => {
  if (introFinished.value) return

  if (revealTimer) {
    clearTimeout(revealTimer)
    revealTimer = null
  }

  if (videoRef.value) {
    const vid = videoRef.value
    if (vid.duration && isFinite(vid.duration)) {
      vid.currentTime = Math.max(0, vid.duration - 0.15)
    }
  }

  reveal()
}

const handleKeyDown = (e) => {
  if (e.key === 'Enter') skipIntro()
}

onMounted(() => {
  revealTimer = setTimeout(reveal, SEQUENCE_DURATION)

  videoRef.value?.addEventListener('ended', () => {
    if (revealTimer) { clearTimeout(revealTimer); revealTimer = null }
    reveal()
  })

  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  if (revealTimer) { clearTimeout(revealTimer); revealTimer = null }
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <section class="hero" @click="skipIntro">

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

      <span class="hero__skip-hint">Нажмите для пропуска</span>
    </div>

    <!-- ─── Основной контент (появляется после слоганов) ── -->
    <div class="hero__content" :class="{ 'is-visible': contentReady }">

      <div class="hero__text">
        <h1 class="hero__title">{{ heroBlock.title }}</h1>
        <p  class="hero__description">{{ heroBlock.description }}</p>
      </div>

      <!-- ─── Блок статистики ───────────────────────────── -->
      <div class="hero__stats">
        <div
          v-for="(stat, i) in heroBlock.stats"
          :key="i"
          class="hero__stat"
          :class="{ 'hero__stat--divided': i > 0 }"
          :style="{ '--stat-delay': `${0.35 + i * 0.18}s` }"
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
  cursor: default;
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
  background:
    linear-gradient(
      110deg,
      rgba(0, 0, 0, 0.78) 0%,
      rgba(0, 0, 0, 0.50) 45%,
      rgba(0, 0, 0, 0.25) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.40) 55%,
      rgba(0, 0, 0, 0.82) 100%
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

.hero__skip-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  animation: hintFade 1.2s 1.5s ease forwards;
}

@keyframes hintFade {
  from { opacity: 0; }
  to   { opacity: 1; }
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

.hero__content.is-visible {
  pointer-events: auto;
}

/* ── Текстовый блок ──────────────────────────────── */

.hero__text {
  opacity: 0;
  transform: translateY(30px);
  padding: 0 3.5rem 2.8rem;
  max-width: 72rem;
}

.hero__content.is-visible .hero__text {
  animation: textSlideUp 1.1s 0.1s ease forwards;
}

.hero__title {
  color: #ffffff;
  font-size: clamp(2.4rem, 5.5vw, 5rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
  text-shadow: 0 2px 32px rgba(0, 0, 0, 0.6), 0 1px 8px rgba(0, 0, 0, 0.4);
}

.hero__description {
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(1.05rem, 1.9vw, 1.35rem);
  font-weight: 400;
  line-height: 1.72;
  max-width: 42rem;
  margin: 0;
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.45);
}

/* ═══════════════════════════════════════════════════════════
   СТАТИСТИКА — glassmorphism-контейнер
═══════════════════════════════════════════════════════════ */

.hero__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;

  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 -8px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);

  padding: 2rem 3.5rem;

  /* Скрыт до завершения вступления */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0s 0.5s;
}

.hero__content.is-visible .hero__stats {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease, visibility 0s 0s;
}

/* ── Элемент статистики — начальное скрытое состояние ── */

.hero__stat {
  opacity: 0;
  transform: translateY(80px);
  text-align: center;
  padding: 0 1.5rem;
}

/* ── Запуск stagger-анимации при появлении контента ── */

.hero__content.is-visible .hero__stat {
  animation: statSlideUp 0.9s var(--stat-delay, 0.35s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
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
  color: rgba(255, 255, 255, 0.52);
  font-size: clamp(0.68rem, 1vw, 0.78rem);
  line-height: 1.45;
  max-width: 130px;
  margin: 0 auto;
}

/* ═══════════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════════ */

@keyframes textSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
}

@keyframes statSlideUp {
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    overflow: hidden;
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

  .hero__skip-hint {
    display: none;
  }
}
</style>
