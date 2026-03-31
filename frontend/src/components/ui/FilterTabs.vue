<script setup>
defineProps({
  categories: { type: Array,  required: true },
  modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="ft" role="tablist">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="ft__tab"
      :class="{ 'is-active': modelValue === cat.id }"
      role="tab"
      :aria-selected="modelValue === cat.id"
      @click="$emit('update:modelValue', cat.id)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<style scoped>
.ft {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ft__tab {
  padding: 0.55rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  white-space: nowrap;
}

.ft__tab:hover {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.25);
}

.ft__tab.is-active {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.06);
}
</style>
