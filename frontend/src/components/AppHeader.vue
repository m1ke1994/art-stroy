<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { header } from '@/data/data.js'

const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }

const rawPhone = header.phone.replace(/[\s()\-]/g, '')
</script>

<template>
  <header class="hdr">
    <div class="hdr__inner">

      <!-- ── Бренд-блок: только логотип ───────────── -->
      <RouterLink to="/" class="hdr__brand" @click="closeMobile">
        <img
          :src="header.logoSrc"
          :alt="header.logoAlt"
          class="hdr__logo"
        />
      </RouterLink>

      <!-- ── Правая часть: меню + телефон ─────────── -->
      <nav class="hdr__nav">
        <RouterLink
          v-for="item in header.menu"
          :key="item.to"
          :to="item.to"
          class="hdr__link"
          active-class="hdr__link--active"
        >
          {{ item.label }}
          <svg
            v-if="item.hasDropdown"
            class="hdr__chevron"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>

        <a :href="`tel:${rawPhone}`" class="hdr__phone">
          {{ header.phone }}
        </a>
      </nav>

      <!-- ── Бургер (мобильный) ─────────────────── -->
      <button
        class="hdr__burger"
        :class="{ 'is-open': mobileOpen }"
        :aria-expanded="mobileOpen"
        aria-label="Открыть меню"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="hdr__burger-line" />
        <span class="hdr__burger-line" />
        <span class="hdr__burger-line" />
      </button>

    </div>

    <!-- ── Мобильное меню ───────────────────────── -->
    <nav class="hdr__mobile" :class="{ 'is-open': mobileOpen }">
      <RouterLink
        v-for="item in header.menu"
        :key="item.to"
        :to="item.to"
        class="hdr__mobile-link"
        active-class="hdr__mobile-link--active"
        @click="closeMobile"
      >
        {{ item.label }}
        <svg
          v-if="item.hasDropdown"
          class="hdr__chevron"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </RouterLink>

      <a :href="`tel:${rawPhone}`" class="hdr__mobile-phone" @click="closeMobile">
        {{ header.phone }}
      </a>
    </nav>
  </header>
</template>

<style scoped>

/* ═══════════════════════════════════════════════════════
   ШАПКА — корень
═══════════════════════════════════════════════════════ */

.hdr {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(8, 8, 8, 0.75);
  backdrop-filter: blur(20px) saturate(1.0);
  -webkit-backdrop-filter: blur(20px) saturate(1.0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.hdr__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 68px;
}

/* ═══════════════════════════════════════════════════════
   БРЕНД-БЛОК (только логотип)
═══════════════════════════════════════════════════════ */

.hdr__brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.hdr__logo {
  height: 100px;
  width: auto;
  object-fit: contain;
  display: block;
}

/* ═══════════════════════════════════════════════════════
   ПРАВОЕ МЕНЮ + ТЕЛЕФОН
═══════════════════════════════════════════════════════ */

.hdr__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Пункт меню ──────────────────────────────────── */

.hdr__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-decoration: none;
  padding-bottom: 4px;
  transition: color 0.25s ease;
  white-space: nowrap;
}

.hdr__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.75);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.hdr__link:hover {
  color: rgba(255, 255, 255, 0.95);
}

.hdr__link:hover::after {
  transform: scaleX(1);
}

.hdr__link--active {
  color: #ffffff;
}

.hdr__link--active::after {
  transform: scaleX(1);
  background: rgba(255, 255, 255, 0.9);
}

/* ── Шеврон у «Услуги» ───────────────────────────── */

.hdr__chevron {
  width: 11px;
  height: 11px;
  opacity: 0.55;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.hdr__link:hover .hdr__chevron,
.hdr__link--active .hdr__chevron {
  opacity: 0.9;
}

/* ── Телефон ─────────────────────────────────────── */

.hdr__phone {
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  padding-left: 2rem;
  transition: color 0.25s ease;
}

.hdr__phone:hover {
  color: #ffffff;
}

/* ═══════════════════════════════════════════════════════
   БУРГЕР
═══════════════════════════════════════════════════════ */

.hdr__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.hdr__burger-line {
  display: block;
  width: 100%;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.hdr__burger.is-open .hdr__burger-line:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hdr__burger.is-open .hdr__burger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hdr__burger.is-open .hdr__burger-line:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ═══════════════════════════════════════════════════════
   МОБИЛЬНОЕ МЕНЮ
═══════════════════════════════════════════════════════ */

.hdr__mobile {
  display: none;
  flex-direction: column;
  background: rgba(8, 8, 8, 0.97);
  backdrop-filter: blur(20px) saturate(1.0);
  -webkit-backdrop-filter: blur(20px) saturate(1.0);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease;
}

.hdr__mobile.is-open {
  max-height: 420px;
}

.hdr__mobile-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 1rem 2rem;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.2s ease, background 0.2s ease;
}

.hdr__mobile-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.hdr__mobile-link--active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
}

.hdr__mobile-phone {
  display: block;
  padding: 1.1rem 2rem;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.hdr__mobile-phone:hover {
  color: #ffffff;
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */

@media (max-width: 900px) {
  .hdr__nav {
    gap: 1.4rem;
  }

  .hdr__phone {
    padding-left: 1.4rem;
  }
}

@media (max-width: 768px) {
  .hdr__inner {
    padding: 0 1.5rem;
  }

  .hdr__nav {
    display: none;
  }

  .hdr__burger {
    display: flex;
  }

  .hdr__mobile {
    display: flex;
  }
}

@media (max-width: 400px) {
  .hdr__logo {
    height: 38px;
  }
}
</style>
