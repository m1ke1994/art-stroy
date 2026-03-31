<script setup>
import { RouterLink } from 'vue-router'
import { header } from '@/data/data.js'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm">
    <div class="flex items-center justify-between px-8 py-4">
      <RouterLink to="/" class="text-white text-lg font-semibold tracking-wide">
        {{ header.logo }}
      </RouterLink>

      <nav class="flex items-center gap-8">
        <RouterLink
          v-for="item in header.menu"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-1 text-sm text-white/90 hover:text-white transition-colors duration-200"
        >
          {{ item.label }}
          <svg
            v-if="item.hasDropdown"
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5 opacity-70"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </RouterLink>
      </nav>

      <a
        :href="`tel:${header.phone.replace(/\s|\(|\)|-/g, '')}`"
        class="text-sm text-white/90 hover:text-white transition-colors duration-200 tracking-wide"
      >
        {{ header.phone }}
      </a>
    </div>
  </header>
</template>
