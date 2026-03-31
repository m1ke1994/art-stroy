<script setup>
import { ref } from 'vue'

defineProps({
  src:    { type: String, required: true },
  alt:    { type: String, default: '' },
  aspect: { type: String, default: '4 / 3' },
})

const loaded = ref(false)
const onLoad  = () => { loaded.value = true }
const onError = () => { loaded.value = true } // hide shimmer even on error
</script>

<template>
  <div class="il" :style="{ aspectRatio: aspect }">
    <div class="il__shimmer" :class="{ 'is-hidden': loaded }" />
    <img
      :src="src"
      :alt="alt"
      class="il__img"
      :class="{ 'is-visible': loaded }"
      loading="lazy"
      decoding="async"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.il {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

/* ── Shimmer ──────────────────────────── */
.il__shimmer {
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
  transition: opacity 0.4s ease;
}

.il__shimmer.is-hidden {
  opacity: 0;
  pointer-events: none;
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── Image ────────────────────────────── */
.il__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.il__img.is-visible {
  opacity: 1;
}
</style>
