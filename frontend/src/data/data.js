export const header = {
  logo: 'Название',
  phone: '+7 (000) XXX-XX-XX',
  menu: [
    { label: 'О компании', to: '/about' },
    { label: 'Услуги', to: '/services', hasDropdown: true },
    { label: 'Проекты', to: '/projects' },
    { label: 'Контакты', to: '/contacts' },
  ],
}

export const heroBlock = {
  videoSrc: '/videos/hero.mp4',

  slogans: [
    'ИНЖЕНЕРИЯ. ТОЧНОСТЬ. НАДЁЖНОСТЬ',
    'МЕТАЛЛОКОНСТРУКЦИИ ЛЮБОЙ СЛОЖНОСТИ',
    'СОВРЕМЕННЫЕ ФАСАДЫ',
    'ПАНОРАМНОЕ ОСТЕКЛЕНИЕ',
    'СТРОИМ ПРОСТРАНСТВО, В КОТОРОМ ХОЧЕТСЯ ЖИТЬ',
  ],

  title: 'Проектируем пространства, которые вдохновляют и служат долго',
  description:
    'Мы воплощаем в жизнь архитектурные, инженерные и строительные решения, объединяя металлоконструкции, современные фасады и панорамное остекление в единый премиальный результат.',

  stats: [
    { value: '25 лет', text: 'успешного опыта проектирования' },
    { value: '300+',   text: 'успешно реализованных проектов' },
    { value: '12',     text: 'направлений в строительстве и проектировании' },
  ],
}

// Заготовки для будущих секций
export const aboutBlock = {}

export const servicesBlock = {
  items: [],
}

export const projectsBlock = {
  items: [],
}

export const contactsBlock = {}
