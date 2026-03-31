<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AppHeader     from '@/components/AppHeader.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FilterTabs    from '@/components/ui/FilterTabs.vue'
import ImageLoader   from '@/components/ui/ImageLoader.vue'
import { projects, projectCategories } from '@/data/siteContent.js'

// ── Filter ───────────────────────────────────────────────
const activeCategory = ref('all')

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory.value)
)

// ── Grid animation ───────────────────────────────────────
const gridRef  = ref(null)
const gridVisible = ref(false)
let gridObserver = null

// ── Lightbox ─────────────────────────────────────────────
const lightbox      = ref(null)   // current project
const lightboxIdx   = ref(0)

const openLightbox = (project) => {
  lightbox.value  = project
  lightboxIdx.value = filtered.value.findIndex(p => p.id === project.id)
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightbox.value = null
  document.body.style.overflow = ''
}

const prevProject = () => {
  if (lightboxIdx.value > 0) {
    lightboxIdx.value--
    lightbox.value = filtered.value[lightboxIdx.value]
  }
}

const nextProject = () => {
  if (lightboxIdx.value < filtered.value.length - 1) {
    lightboxIdx.value++
    lightbox.value = filtered.value[lightboxIdx.value]
  }
}

const handleKeydown = (e) => {
  if (!lightbox.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowLeft')  prevProject()
  if (e.key === 'ArrowRight') nextProject()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  gridObserver = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { gridVisible.value = true; gridObserver?.disconnect() } },
    { threshold: 0.04 }
  )
  if (gridRef.value) gridObserver.observe(gridRef.value)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  gridObserver?.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="projects-page">
    <AppHeader />

    <!-- ═══ PAGE HERO ══════════════════════════════════════════ -->
    <section class="pph">
      <div class="pph__wrap">
        <p class="pph__eyebrow">Проекты</p>
        <h1 class="pph__title">Наши работы</h1>
        <p class="pph__subtitle">
          Реализованные объекты — душевые кабины, зеркала, стеклянные перегородки,
          ограждения и фасадные решения. Каждая работа — отдельная история.
        </p>
      </div>
    </section>

    <!-- ═══ PROJECTS ══════════════════════════════════════════ -->
    <section class="pg">
      <div class="pg__wrap">

        <!-- Filter tabs -->
        <div class="pg__filters">
          <FilterTabs
            :categories="projectCategories"
            v-model="activeCategory"
          />
        </div>

        <!-- Grid -->
        <div ref="gridRef" class="pg__grid">
          <article
            v-for="(project, i) in filtered"
            :key="project.id"
            class="pg__card"
            :class="{ 'is-visible': gridVisible }"
            :style="{ '--delay': `${(i % 6) * 0.07}s` }"
            role="button"
            tabindex="0"
            :aria-label="`Открыть: ${project.title}`"
            @click="openLightbox(project)"
            @keyup.enter="openLightbox(project)"
          >
            <div class="pg__card-image">
              <ImageLoader :src="project.image" :alt="project.title" aspect="4 / 3" />

              <div class="pg__card-overlay">
                <span class="pg__card-cat">{{ project.categoryLabel }}</span>
                <div class="pg__card-info">
                  <h3 class="pg__card-title">{{ project.title }}</h3>
                  <p  class="pg__card-desc">{{ project.description }}</p>
                  <span class="pg__card-open">Открыть &rarr;</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="pg__empty">
          <p>Нет проектов в этой категории.</p>
        </div>

      </div>
    </section>

    <!-- ═══ LIGHTBOX ══════════════════════════════════════════ -->
    <Transition name="lb">
      <div
        v-if="lightbox"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="lightbox.title"
        @click.self="closeLightbox"
      >
        <div class="lb__panel">

          <!-- Image -->
          <div class="lb__image-wrap">
            <div class="lb__shimmer" />
            <img
              :src="lightbox.image"
              :alt="lightbox.title"
              class="lb__img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <!-- Info -->
          <div class="lb__info">
            <span class="lb__category">{{ lightbox.categoryLabel }}</span>
            <h2 class="lb__title">{{ lightbox.title }}</h2>
            <p  class="lb__desc">{{ lightbox.description }}</p>

            <div class="lb__counter">
              {{ lightboxIdx + 1 }} / {{ filtered.length }}
            </div>
          </div>

          <!-- Navigation -->
          <button
            class="lb__nav lb__nav--prev"
            :disabled="lightboxIdx === 0"
            aria-label="Предыдущий проект"
            @click.stop="prevProject"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button
            class="lb__nav lb__nav--next"
            :disabled="lightboxIdx === filtered.length - 1"
            aria-label="Следующий проект"
            @click.stop="nextProject"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Close -->
          <button class="lb__close" aria-label="Закрыть" @click.stop="closeLightbox">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>

/* ═══════════════════════════════════════════════════════════
   PAGE HERO
═══════════════════════════════════════════════════════════ */

.pph {
  padding: 10rem 2rem 5rem;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.pph::before {
  content: '';
  position: absolute;
  top: -60px;
  right: 5%;
  width: 500px;
  height: 350px;
  background: radial-gradient(ellipse, rgba(40, 40, 120, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.pph__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.pph__eyebrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
}

.pph__title {
  color: #ffffff;
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 1.5rem;
}

.pph__subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.75;
  max-width: 44rem;
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════ */

.pg {
  padding: 5rem 2rem 7rem;
  background: transparent;
}

.pg__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

/* ── Filters ──────────────────────────────── */
.pg__filters {
  margin-bottom: 2.5rem;
}

/* ── Grid ─────────────────────────────────── */
.pg__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

/* ── Card ─────────────────────────────────── */
.pg__card {
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0s, transform 0s;
}

.pg__card.is-visible {
  animation: cardReveal 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes cardReveal {
  to { opacity: 1; transform: translateY(0); }
}

.pg__card-image {
  position: relative;
  width: 100%;
}

.pg__card-image :deep(.il) {
  border-radius: 10px;
}

/* ── Card Overlay ─────────────────────────── */
.pg__card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.42) 50%,
    rgba(0, 0, 0, 0.08) 100%
  );
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.pg__card:hover .pg__card-overlay,
.pg__card:focus-visible .pg__card-overlay {
  opacity: 1;
}

.pg__card-cat {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.67rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
}

.pg__card-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.pg__card-title {
  color: #ffffff;
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.01em;
}

.pg__card-desc {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.78rem;
  margin: 0;
  line-height: 1.4;
}

.pg__card-open {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.74rem;
  margin-top: 0.3rem;
  letter-spacing: 0.04em;
}

/* ── Empty ────────────────────────────────── */
.pg__empty {
  text-align: center;
  padding: 5rem 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.95rem;
}

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════ */

.lb {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lb__panel {
  position: relative;
  width: 100%;
  max-width: 900px;
  background: #0a0a18;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Lightbox Image ───────────────────────── */
.lb__image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.lb__shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.03) 100%
  );
  background-size: 200% 100%;
  animation: lbShimmer 1.6s infinite ease-in-out;
}

@keyframes lbShimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.lb__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Lightbox Info ────────────────────────── */
.lb__info {
  padding: 1.75rem 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.lb__category {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 0.2rem;
}

.lb__title {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
  flex: 1;
  min-width: 0;
}

.lb__desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0;
  width: 100%;
}

.lb__counter {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  align-self: flex-start;
  margin-top: 0.25rem;
  white-space: nowrap;
}

/* ── Nav buttons ──────────────────────────── */
.lb__nav {
  position: absolute;
  top: calc(50% - 3rem);
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

.lb__nav:hover { background: rgba(255,255,255,0.15); color: #fff; }
.lb__nav:disabled { opacity: 0.25; pointer-events: none; }

.lb__nav--prev { left: 1rem; }
.lb__nav--next { right: 1rem; }

/* ── Close button ─────────────────────────── */
.lb__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
}

.lb__close:hover { background: rgba(255,255,255,0.14); color: #fff; }

/* ── Lightbox Transition ──────────────────── */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s ease;
}
.lb-enter-active .lb__panel,
.lb-leave-active .lb__panel {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
.lb-enter-from .lb__panel,
.lb-leave-to .lb__panel {
  transform: scale(0.96);
  opacity: 0;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */

@media (max-width: 900px) {
  .pg__grid { grid-template-columns: repeat(2, 1fr); }
  .lb__panel { max-width: 640px; }
}

@media (max-width: 640px) {
  .pph { padding: 8rem 1.25rem 4rem; }
  .pg  { padding: 4rem 1.25rem 5rem; }
  .pg__grid { grid-template-columns: 1fr; }
  .lb { padding: 1rem; }
  .lb__panel { border-radius: 12px; }
  .lb__nav { display: none; }
  .lb__info { padding: 1.25rem 1.25rem; gap: 1rem; }
}
</style>
