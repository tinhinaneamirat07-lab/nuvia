# Nuvia

Assistant de cuisine personnel : il planifie les repas de la semaine, prépare la liste de courses et guide pendant la cuisine, à la voix, en français, anglais et arabe.

## Structure

```
nuvia/
├── frontend/   React 19, Vite, TypeScript, Tailwind CSS v4, Motion, i18next (FR / EN / AR + RTL)
└── backend/    FastAPI, SQLAlchemy, Alembic (voir backend/README.md)
```

## Lancer le front-end

```bash
cd frontend
npm install
npm run dev
```

## Design system « Forest »

- Couleur de marque : vert forêt `#1f4d3a`, accent safran `#f5b83d`
- Polices : Geist (latin), IBM Plex Sans Arabic (arabe)
- Mode clair et sombre, interface complète de droite à gauche en arabe

## Feuille de route

- [x] Landing page
- [x] Explorer, détail recette, connexion / inscription, favoris (branchés sur l’API)
- [x] API FastAPI : auth sécurisée, recettes, favoris, admin (SQLite en dev, prêt pour PostgreSQL)
- [x] Import de ~300 vraies recettes avec photos (TheMealDB)
- [ ] Agent IA (RAG + outils) côté serveur : voir [docs/AGENT_PLAN.md](docs/AGENT_PLAN.md)
- [x] Planner de la semaine et liste de courses par rayon
- [x] Tests front (Vitest) et back (pytest), CI GitHub Actions
- [ ] Déploiement, PWA
