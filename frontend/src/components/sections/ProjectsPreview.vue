<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink }  from 'vue-router'
import SectionHeader   from '@/components/ui/SectionHeader.vue'
import ProjectCard     from '@/components/ui/ProjectCard.vue'
import { projects }    from '@/data/siteContent.js'

const sectionRef = ref(null)
const isVisible  = ref(false)
let   observer   = null

const preview = projects.slice(0, 6)

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { isVisible.value = true; observer?.disconnect() } },
    { threshold: 0.06 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="pp">
    <div class="pp__wrap">

      <div class="pp__top" :class="{ 'is-visible': isVisible }">
        <SectionHeader
          title="Наши работы"
          subtitle="Реализованные объекты — душевые, зеркала, перегородки, ограждения и фасады."
        />
        <RouterLink to="/projects" class="pp__all-link">
          Смотреть все проекты
          <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>

      <div v-if="isVisible" class="pp__grid">
        <ProjectCard
          v-for="(project, i) in preview"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </div>

      <div class="pp__cta" :class="{ 'is-visible': isVisible }">
        <RouterLink to="/projects" class="pp__btn">
          Все проекты
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
.pp {
  padding: 7rem 2rem;
  background: transparent;
}

.pp__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

/* ── Top row ──────────────────────────── */
.pp__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.pp__top.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.pp__top :deep(.sh) {
  margin-bottom: 0;
}

.pp__all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
  margin-top: 0.75rem;
  flex-shrink: 0;
  transition: color 0.25s ease, gap 0.25s ease;
}

.pp__all-link:hover {
  color: #ffffff;
  gap: 0.75rem;
}

/* ── Grid ─────────────────────────────── */
.pp__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}

/* ── CTA ──────────────────────────────── */
.pp__cta {
  text-align: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease;
}

.pp__cta.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.pp__btn {
  display: inline-block;
  padding: 0.8rem 2.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  color: rgba(255,255,255,0.8);
  font-size: 0.88rem;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.pp__btn:hover {
  color: #ffffff;
  border-color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.04);
}

/* ── Responsive ───────────────────────── */
@media (max-width: 900px) {
  .pp__grid { grid-template-columns: repeat(2, 1fr); }
  .pp__top  { flex-direction: column; }
}

@media (max-width: 560px) {
  .pp { padding: 5rem 1.25rem; }
  .pp__grid { grid-template-columns: 1fr; }
}
</style>
