<script setup>
import AppHeader      from '@/components/AppHeader.vue'
import AppHero        from '@/components/AppHero.vue'
import AboutCompany   from '@/components/sections/AboutCompany.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhyUsSection   from '@/components/sections/WhyUsSection.vue'
import ProjectsPreview from '@/components/sections/ProjectsPreview.vue'
import CTABlock       from '@/components/sections/CTABlock.vue'
</script>

<template>
  <div>
    <AppHeader />
    <AppHero />
    <AboutCompany />
    <ServicesSection />
    <WhyUsSection />
    <ProjectsPreview />
    <CTABlock />
  </div>
</template>
