<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ServiceCard   from '@/components/ui/ServiceCard.vue'
import { services }  from '@/data/siteContent.js'

const sectionRef = ref(null)
const isVisible  = ref(false)
let   observer   = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { isVisible.value = true; observer?.disconnect() } },
    { threshold: 0.08 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="svc">
    <div class="svc__wrap">

      <div class="svc__header" :class="{ 'is-visible': isVisible }">
        <SectionHeader
          title="Наши услуги"
          subtitle="Три ключевых направления — металлоконструкции, остекление и фасады — объединённые в единый производственный цикл."
          align="left"
        />
      </div>

      <div v-if="isVisible" class="svc__grid">
        <ServiceCard
          v-for="(service, i) in services"
          :key="service.id"
          :service="service"
          :index="i"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.svc {
  padding: 7rem 2rem;
  background: transparent;
}

.svc__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.svc__header {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.svc__header.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.svc__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .svc__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .svc {  padding: 5rem 1.25rem; }
  .svc__grid { grid-template-columns: 1fr; }
}
</style>
