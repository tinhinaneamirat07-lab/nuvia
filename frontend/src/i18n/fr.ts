const fr = {
  nav: {
    explore: 'Explorer',
    planner: 'Planner',
    assistant: 'Assistant',
    login: 'Se connecter',
    start: 'Commencer',
    menu: 'Menu',
    theme: 'Changer le thème',
    language: 'Langue',
  },
  hero: {
    title: 'Tes repas de la semaine, planifiés en deux minutes.',
    highlight: 'deux minutes',
    subtitle:
      'Donne à Nuvia le contenu de ton frigo : il prépare ton menu, tes courses et te guide à la voix.',
    secondary: 'Voir les recettes',
    imageAlt: 'Un bol de chorba frik servi avec des bourek',
    card: {
      day: 'Mardi, dîner',
      recipe: 'Chorba frik',
      meta: '35 min, 4 personnes',
      status: 'Ajouté au planner',
    },
  },
  features: {
    title: 'Du frigo à l’assiette, sans prise de tête.',
    planner: {
      title: 'Une semaine planifiée',
      body: 'Place tes recettes dans la semaine ou laisse Nuvia composer un menu équilibré selon ton budget.',
      imageAlt: 'Ratatouille en spirale dans une cocotte',
    },
    pantry: {
      title: 'Cuisine avec ce que tu as',
      body: 'Les recettes sont classées selon ce qu’il te manque. Moins de gaspillage, moins de courses.',
      imageAlt: 'Salade de crudités fraîches',
    },
    shopping: {
      title: 'Liste de courses automatique',
      body: 'Les quantités de la semaine, réunies et triées par rayon.',
      items: ['Frik, 250 g', 'Tomates, 6', 'Coriandre, 1 botte', 'Poulet, 1 kg'],
    },
    voice: {
      title: 'Les mains dans la farine ? Parle.',
      body: 'Demande l’étape suivante, un minuteur ou une substitution sans toucher l’écran.',
    },
    languages: {
      title: 'Pensé en trois langues',
      body: 'Toute l’interface passe en arabe, de droite à gauche.',
    },
  },
  assistant: {
    title: 'Un assistant qui connaît vraiment la cuisine.',
    body: 'Avant de répondre, il cherche dans la base de recettes de Nuvia. Tu parles, il répond dans ta langue.',
    listening: 'Nuvia écoute',
    name: 'Nuvia',
    chat: [
      { from: 'user', text: 'J’ai du frik et du poulet, je fais quoi ce soir ?' },
      {
        from: 'bot',
        text: 'Une chorba frik : 35 minutes pour 4 personnes. Tu as de la coriandre et du concentré de tomate ?',
      },
      { from: 'user', text: 'Oui, on commence.' },
      {
        from: 'bot',
        text: 'Coupe le poulet en petits morceaux et fais-le revenir 5 minutes avec l’oignon. Je lance un minuteur ?',
      },
    ],
    imageAlt: 'Pièce de bœuf grillée au feu de bois',
  },
  recipes: {
    title: 'Recettes du moment',
    all: 'Tout voir',
    minutes: '{{count}} min',
    difficulty: { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' },
    previous: 'Recettes précédentes',
    next: 'Recettes suivantes',
  },
  maghreb: {
    title: 'La cuisine d’ici, à l’honneur.',
    body: 'Chorba, rechta, mhadjeb, couscous : des recettes maghrébines écrites avec soin, en arabe et en français.',
    imageAlt: 'Pains et viennoiseries sortis du four',
  },
  cta: {
    title: 'Ta première semaine de repas t’attend.',
    body: 'Gratuit, sans carte bancaire.',
  },
  footer: {
    tagline: 'L’assistant cuisine qui planifie, fait les courses et te guide.',
    product: 'Produit',
    company: 'Nuvia',
    about: 'À propos',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    rights: '© 2026 Nuvia. Projet open source.',
  },
  notFound: {
    title: 'Cette page n’est pas encore cuisinée.',
    body: 'Elle arrive dans une prochaine étape du projet.',
    back: 'Retour à l’accueil',
  },
}

export default fr
export type Messages = typeof fr
