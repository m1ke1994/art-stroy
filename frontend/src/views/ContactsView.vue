<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { contacts } from '@/data/siteContent.js'

const formRef  = ref(null)
const isVisible = ref(false)
let observer   = null

const form = reactive({ name: '', phone: '', message: '' })
const sent = ref(false)
const sending = ref(false)

const handleSubmit = async () => {
  if (!form.name || !form.phone) return
  sending.value = true
  await new Promise(r => setTimeout(r, 900))
  sending.value = false
  sent.value    = true
}

onMounted(() => {
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { isVisible.value = true; observer?.disconnect() }
  }, { threshold: 0.06 })
  if (formRef.value) observer.observe(formRef.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="contacts-page">
    <AppHeader />

    <!-- ── Page hero ──────────────────────────────── -->
    <section class="cph">
      <div class="cph__wrap">
        <p class="cph__eyebrow">Контакты</p>
        <h1 class="cph__title">Обсудим ваш проект</h1>
        <p  class="cph__subtitle">Расскажите нам о задаче — мы ответим в течение одного рабочего дня с расчётом и предложением.</p>
      </div>
    </section>

    <!-- ── Main block ─────────────────────────────── -->
    <section class="cm" ref="formRef">
      <div class="cm__wrap" :class="{ 'is-visible': isVisible }">

        <!-- Form ─────────────────────────────────── -->
        <div class="cm__form-col">
          <h2 class="cm__form-heading">Оставить заявку</h2>

          <Transition name="fade" mode="out-in">
            <form v-if="!sent" class="cm__form" @submit.prevent="handleSubmit">
              <div class="cm__field">
                <label class="cm__label" for="name">Ваше имя</label>
                <input
                  id="name"
                  v-model="form.name"
                  class="cm__input"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                  autocomplete="name"
                />
              </div>

              <div class="cm__field">
                <label class="cm__label" for="phone">Телефон</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  class="cm__input"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                  autocomplete="tel"
                />
              </div>

              <div class="cm__field">
                <label class="cm__label" for="message">Описание задачи</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="cm__input cm__textarea"
                  placeholder="Расскажите о вашем проекте, объёме работ, пожеланиях…"
                  rows="5"
                />
              </div>

              <button class="cm__submit" type="submit" :disabled="sending">
                <span v-if="!sending">Отправить заявку</span>
                <span v-else class="cm__spinner" />
              </button>

              <p class="cm__note">Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.</p>
            </form>

            <div v-else class="cm__success">
              <div class="cm__success-icon">✓</div>
              <h3 class="cm__success-title">Заявка отправлена</h3>
              <p  class="cm__success-text">Мы свяжемся с вами в течение одного рабочего дня.</p>
            </div>
          </Transition>
        </div>

        <!-- Info ─────────────────────────────────── -->
        <div class="cm__info-col">
          <h2 class="cm__info-heading">Наши контакты</h2>

          <div class="cm__info-block">
            <div class="cm__info-row">
              <span class="cm__info-label">Телефон</span>
              <a :href="`tel:${contacts.phone.replace(/[\s()–-]/g,'')}`" class="cm__info-value cm__info-link">
                {{ contacts.phone }}
              </a>
            </div>
            <div class="cm__info-row">
              <span class="cm__info-label">Email</span>
              <a :href="`mailto:${contacts.email}`" class="cm__info-value cm__info-link">{{ contacts.email }}</a>
            </div>
            <div class="cm__info-row">
              <span class="cm__info-label">Telegram</span>
              <a :href="`https://t.me/${contacts.telegram.replace('@','')}`" target="_blank" rel="noopener" class="cm__info-value cm__info-link">
                {{ contacts.telegram }}
              </a>
            </div>
            <div class="cm__info-row">
              <span class="cm__info-label">Режим работы</span>
              <span class="cm__info-value">{{ contacts.workingHours }}</span>
            </div>
            <div class="cm__info-row">
              <span class="cm__info-label">Регион</span>
              <span class="cm__info-value">{{ contacts.address }}</span>
            </div>
          </div>

          <div class="cm__info-cta">
            <p class="cm__info-cta-text">Предпочитаете звонок?</p>
            <a :href="`tel:${contacts.phone.replace(/[\s()–-]/g,'')}`" class="cm__info-cta-btn">
              Позвонить сейчас
            </a>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>

/* ── Page hero ───────────────────────────────────── */
.cph {
  padding: 9rem 2rem 4rem;
  background: transparent;
  border-bottom: 1px solid rgba(255,255,255,.06);
  position: relative;
  overflow: hidden;
}

.cph::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 320px;
  background: radial-gradient(ellipse, rgba(45, 45, 120, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.cph__wrap {
  max-width: 1240px;
  margin: 0 auto;
}

.cph__eyebrow {
  color: rgba(255,255,255,.35);
  font-size: .75rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  margin: 0 0 1rem;
}

.cph__title {
  color: #fff;
  font-size: clamp(2.5rem,6vw,5rem);
  font-weight: 600;
  letter-spacing: -.04em;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}

.cph__subtitle {
  color: rgba(255,255,255,.5);
  font-size: clamp(1rem,1.5vw,1.15rem);
  line-height: 1.7;
  max-width: 44rem;
  margin: 0;
}

/* ── Main block ──────────────────────────────────── */
.cm { padding: 6rem 2rem 7rem; background: transparent; }

.cm__wrap {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 4rem;
  opacity: 0; transform: translateY(32px);
  transition: opacity .9s ease, transform .9s ease;
}
.cm__wrap.is-visible { opacity:1; transform:translateY(0); }

/* ── Form column ─────────────────────────────────── */
.cm__form-heading,
.cm__info-heading {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: -.02em;
  margin: 0 0 2rem;
}

.cm__form { display: flex; flex-direction: column; gap: 1.25rem; }

.cm__field { display: flex; flex-direction: column; gap: 0.5rem; }

.cm__label {
  color: rgba(255,255,255,.45);
  font-size: .8rem;
  letter-spacing: .04em;
}

.cm__input {
  width: 100%;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px;
  color: #fff;
  font-size: .95rem;
  padding: .85rem 1.1rem;
  outline: none;
  transition: border-color .25s ease, background .25s ease;
  font-family: inherit;
  box-sizing: border-box;
}

.cm__input::placeholder { color: rgba(255,255,255,.2); }

.cm__input:focus {
  border-color: rgba(255,255,255,.3);
  background: rgba(255,255,255,.06);
}

.cm__textarea { resize: vertical; min-height: 120px; }

.cm__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: rgba(255,255,255,.92);
  color: #080808;
  border: none;
  border-radius: 100px;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: .02em;
  transition: background .25s ease, transform .2s ease;
}
.cm__submit:hover:not(:disabled) { background: #fff; transform: translateY(-1px); }
.cm__submit:disabled { opacity: .6; cursor: not-allowed; }

.cm__spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(0,0,0,.2);
  border-top-color: #080808;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  display: block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.cm__note { color: rgba(255,255,255,.25); font-size: .75rem; margin: 0; line-height: 1.5; }

/* Success state */
.cm__success {
  display: flex; flex-direction: column; align-items: flex-start; gap: .75rem;
  padding: 2.5rem; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 14px;
}
.cm__success-icon { font-size: 2rem; color: rgba(255,255,255,.5); }
.cm__success-title { color: #fff; font-size: 1.2rem; font-weight: 500; margin: 0; }
.cm__success-text  { color: rgba(255,255,255,.5); font-size: .9rem; margin: 0; line-height: 1.6; }

/* ── Info column ─────────────────────────────────── */
.cm__info-block {
  display: flex; flex-direction: column; gap: 0;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.cm__info-row {
  display: flex; flex-direction: column; gap: .3rem;
  padding: 1.1rem 1.4rem;
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.cm__info-row:last-child { border-bottom: none; }

.cm__info-label { color: rgba(255,255,255,.32); font-size: .73rem; letter-spacing: .06em; text-transform: uppercase; }
.cm__info-value { color: rgba(255,255,255,.8); font-size: .95rem; }

.cm__info-link {
  color: rgba(255,255,255,.8);
  text-decoration: none;
  transition: color .2s ease;
}
.cm__info-link:hover { color: #fff; }

.cm__info-cta {
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 14px;
  padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 1rem;
}

.cm__info-cta-text { color: rgba(255,255,255,.5); font-size: .9rem; margin: 0; }

.cm__info-cta-btn {
  display: inline-block;
  padding: .7rem 1.75rem;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 100px;
  color: rgba(255,255,255,.8);
  font-size: .85rem;
  text-decoration: none;
  letter-spacing: .02em;
  align-self: flex-start;
  transition: color .25s ease, border-color .25s ease, background .25s ease;
}
.cm__info-cta-btn:hover { color:#fff; border-color:rgba(255,255,255,.45); background:rgba(255,255,255,.04); }

/* ── Transitions ─────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity .4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ──────────────────────────────────── */
@media (max-width: 900px) {
  .cm__wrap { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 600px) {
  .cph { padding: 7rem 1.25rem 3rem; }
  .cm  { padding: 4rem 1.25rem 5rem; }
}
</style>
