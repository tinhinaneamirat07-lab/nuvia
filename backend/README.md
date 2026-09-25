# Nuvia API

FastAPI + SQLAlchemy 2 + Alembic. SQLite en développement, PostgreSQL en production.

## Démarrer (Windows, PowerShell)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt

copy .env.example .env
# Ouvre .env et remplace JWT_SECRET par le résultat de :
python -c "import secrets; print(secrets.token_urlsafe(64))"

alembic upgrade head        # crée la base de données
python -m app.seed          # ajoute les 12 recettes de démo
uvicorn app.main:app --reload --port 8000
```

Documentation interactive : http://localhost:8000/docs

Sur macOS / Linux, remplace `.venv\Scripts\Activate.ps1` par `source .venv/bin/activate` et `copy` par `cp`.

## Commandes utiles

| Commande | Rôle |
| --- | --- |
| `python -m pytest` | Lance les tests |
| `ruff check app tests` | Vérifie le code |
| `python -m app.create_admin email@exemple.com "Nom"` | Crée un compte admin |
| `alembic revision --autogenerate -m "message"` | Crée une migration après une modification des modèles |

## Endpoints (`/api/v1`)

| Méthode | Route | Accès |
| --- | --- | --- |
| POST | `/auth/register`, `/auth/login` | Public (limité en fréquence) |
| POST | `/auth/refresh`, `/auth/logout`, `/auth/logout-all` | Session |
| GET | `/auth/me` | Connecté |
| PATCH, DELETE | `/users/me` | Connecté |
| GET | `/recipes?q=&cuisine=&category=&difficulty=&diet=&max_minutes=&page=` | Public |
| GET | `/recipes/{slug}` | Public |
| PUT, DELETE | `/recipes/{slug}/favorite` | Connecté |
| GET | `/me/favorites` | Connecté |
| GET, PATCH, DELETE | `/admin/users` | Admin |

## Sécurité

- Mots de passe hachés avec Argon2id, jamais stockés en clair.
- Session en cookies `httpOnly` + `SameSite=Lax` (et `Secure` en production) : un jeton d'accès de 15 min et un jeton de rafraîchissement de 7 jours.
- Les jetons de rafraîchissement sont enregistrés (hachés) en base : déconnexion réelle, rotation à chaque usage, et toutes les sessions coupées si un ancien jeton est réutilisé.
- Limitation de fréquence sur l'inscription et la connexion, messages d'erreur identiques pour « email inconnu » et « mauvais mot de passe ».
- Routes admin vérifiées côté serveur, CORS limité aux origines de `CORS_ORIGINS`, en-têtes de sécurité HTTP.
- Tous les secrets viennent de `.env`, qui n'est jamais commité. En production, l'API refuse de démarrer avec le `JWT_SECRET` par défaut.
