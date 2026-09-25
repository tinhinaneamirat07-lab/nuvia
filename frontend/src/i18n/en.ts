import type { Messages } from './fr'

const en: Messages = {
  nav: {
    explore: 'Explore',
    planner: 'Planner',
    shopping: 'Shopping',
    assistant: 'Assistant',
    login: 'Log in',
    start: 'Get started',
    menu: 'Menu',
    theme: 'Toggle theme',
    language: 'Language',
  },
  hero: {
    title: 'Your week of meals, planned in two minutes.',
    highlight: 'two minutes',
    subtitle:
      'Tell Nuvia what’s in your fridge. It builds your menu and shopping list, then guides you by voice.',
    secondary: 'Browse recipes',
    imageAlt: 'A bowl of chorba frik served with bourek',
    card: {
      day: 'Tuesday, dinner',
      recipe: 'Chorba frik',
      meta: '35 min, serves 4',
      status: 'Added to planner',
    },
  },
  features: {
    title: 'From fridge to plate, without the stress.',
    planner: {
      title: 'A planned week',
      body: 'Drop recipes into your week, or let Nuvia build a balanced menu that fits your budget.',
      imageAlt: 'Spiral ratatouille in a casserole dish',
    },
    pantry: {
      title: 'Cook with what you have',
      body: 'Recipes are ranked by what you’re missing. Less waste, fewer trips to the store.',
      imageAlt: 'Fresh garden salad',
    },
    shopping: {
      title: 'Automatic shopping list',
      body: 'The whole week’s quantities, combined and sorted by aisle.',
      items: ['Freekeh, 250 g', 'Tomatoes, 6', 'Coriander, 1 bunch', 'Chicken, 1 kg'],
    },
    voice: {
      title: 'Hands covered in flour? Just talk.',
      body: 'Ask for the next step, a timer or a substitute without touching the screen.',
    },
    languages: {
      title: 'Built in three languages',
      body: 'The whole interface switches to Arabic, right to left.',
    },
  },
  assistant: {
    title: 'An assistant that actually knows cooking.',
    body: 'Before answering, it searches Nuvia’s recipe library. You speak, it replies in your language.',
    listening: 'Nuvia is listening',
    name: 'Nuvia',
    chat: [
      { from: 'user', text: 'I have freekeh and chicken. What should I cook tonight?' },
      {
        from: 'bot',
        text: 'A chorba frik: 35 minutes for 4 people. Do you have coriander and tomato paste?',
      },
      { from: 'user', text: 'Yes, let’s start.' },
      {
        from: 'bot',
        text: 'Cut the chicken into small pieces and brown it with the onion for 5 minutes. Want me to start a timer?',
      },
    ],
    imageAlt: 'Steak grilling over an open fire',
  },
  recipes: {
    title: 'Trending recipes',
    all: 'See all',
    minutes: '{{count}} min',
    difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    previous: 'Previous recipes',
    next: 'Next recipes',
  },
  maghreb: {
    title: 'Home cooking, front and center.',
    body: 'Chorba, rechta, mhadjeb, couscous: carefully written Maghrebi recipes, in Arabic and French.',
    imageAlt: 'Fresh bread and pastries out of the oven',
  },
  cta: {
    title: 'Your first week of meals is waiting.',
    body: 'Free, no credit card needed.',
  },
  footer: {
    tagline: 'The cooking assistant that plans, shops and guides you.',
    product: 'Product',
    company: 'Nuvia',
    about: 'About',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: '© 2026 Nuvia. Open source project.',
  },
  notFound: {
    title: 'This page isn’t cooked yet.',
    body: 'It’s coming in a later step of the project.',
    back: 'Back to home',
  },
}

export default en
