<script setup>
import ImageLoader from './ImageLoader.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index:   { type: Number, default: 0 },
})
defineEmits(['open'])
</script>

<template>
  <article
    class="pc"
    :style="{ '--delay': `${(props.index % 4) * 0.1}s` }"
    role="button"
    tabindex="0"
    :aria-label="`Открыть проект: ${project.title}`"
    @click="$emit('open', project)"
    @keyup.enter="$emit('open', project)"
  >
    <div class="pc__image">
      <ImageLoader :src="project.image" :alt="project.title" aspect="4 / 3" />

      <div class="pc__overlay">
        <span class="pc__category">{{ project.categoryLabel }}</span>
        <div class="pc__info">
          <h3 class="pc__title">{{ project.title }}</h3>
          <p class="pc__description">{{ project.description }}</p>
          <span class="pc__open">Открыть &rarr;</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pc {
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  animation: pcReveal 0.7s var(--delay, 0s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes pcReveal {
  to { opacity: 1; transform: translateY(0); }
}

/* ── Image wrapper ───────────────────── */
.pc__image {
  position: relative;
  width: 100%;
}

.pc__image :deep(.il) {
  border-radius: 10px;
}

/* ── Hover overlay ───────────────────── */
.pc__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.85) 0%,
    rgba(0,0,0,0.4)  50%,
    rgba(0,0,0,0.1)  100%
  );
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.pc:hover .pc__overlay,
.pc:focus-visible .pc__overlay {
  opacity: 1;
}

.pc__category {
  align-self: flex-start;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 100px;
  color: rgba(255,255,255,0.85);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
}

.pc__info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.pc__title {
  color: #ffffff;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.01em;
}

.pc__description {
  color: rgba(255,255,255,0.65);
  font-size: 0.78rem;
  margin: 0;
  line-height: 1.4;
}

.pc__open {
  color: rgba(255,255,255,0.5);
  font-size: 0.75rem;
  margin-top: 0.35rem;
  letter-spacing: 0.04em;
}
</style>
