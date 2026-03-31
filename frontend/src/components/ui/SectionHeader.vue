<script setup>
defineProps({
  title:    { type: String, required: true },
  subtitle: { type: String,  default: '' },
  align:    { type: String,  default: 'left' }, // 'left' | 'center'
  tag:      { type: String,  default: 'h2' },
})
</script>

<template>
  <div class="sh" :class="`sh--${align}`">
    <component :is="tag" class="sh__title">{{ title }}</component>

    <div v-if="subtitle" class="sh__subtitle-row">
      <span v-if="align === 'center'" class="sh__line" />
      <p class="sh__subtitle">{{ subtitle }}</p>
      <span v-if="align === 'center'" class="sh__line" />
    </div>
  </div>
</template>

<style scoped>
.sh { margin-bottom: 3rem; }
.sh--center { text-align: center; }

.sh__title {
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 1.1rem;
}

.sh__subtitle-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.sh--center .sh__subtitle-row {
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
}

.sh__line {
  flex: 1;
  height: 1px;
  min-width: 32px;
  max-width: 160px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
  flex-shrink: 0;
}

.sh__subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(0.9rem, 1.4vw, 1rem);
  line-height: 1.65;
  margin: 0;
  flex-shrink: 1;
}

.sh--left .sh__subtitle {
  max-width: 52rem;
}
</style>
