# Moviie Booker API

Une API REST pour la gestion des réservations de films, développée avec NestJS et déployée sur Render.

## Fonctionnalités

- Authentification des utilisateurs (JWT)
- Gestion des films via l'API TMDB
- Système de réservation avec contraintes temporelles
- Documentation Swagger


2. .env.exemple
```
DATABASE_URL=postgresql://moviiebooker_user1475_lz8j_user:MhicXPWbNvrryhhsszBtKXlkF2zVKzcV6U5Q6fMRA@dpg-cvrqd48gjchc73bg5ub0-a/moviiebooker_lz8j_user
JWT_SECRET="votre-secret-jwt"
TMDB_BASE_URL="https://api.themoviedb.org/3"
TMDB_READ_ACCESS_TOKEN="votre-token-tmdb"
```
## Structure du Projet

```
src/
├── movies/           # Module de gestion des films
├── user/            # Module d'authentification
├── reservation/     # Module de réservation
├── prisma/          # Configuration de la base de données
└── main.ts          # Point d'entrée de l'application
```

## API Endpoints

### Authentification
- POST `/user/register` - Inscription
- POST `/user/auth/login` - Connexion
- GET `/user/profile` - Profil utilisateur

### Films
- GET `/movies` - Liste des films avec possiblité de recherche
- GET `/movies/now_playing` - Films actuellement à l'affiche
- GET `/movies/:movieId` - Détails d'un film
- GET `/movies/genre/list` - Liste des genres de films

### Réservations
- POST `/reservations` - Créer une réservation
- GET `/reservations` - Liste des réservations
- DELETE `/reservations/:id` - Annuler une réservation

## Déploiement
Lien de l'API : https://moviiebooker-0omu.onrender.com/api#/
## Ressources d'apprentissage

### NestJS
- [Documentation officielle NestJS](https://docs.nestjs.com/)
- [Documentation NestJS passport](https://docs.nestjs.com/recipes/passport)

### Prisma
- [Documentation Prisma](https://www.prisma.io/docs/)
- [Getting Started with Prisma](https://www.prisma.io/docs/getting-started)

### Authentication
- [JWT Authentication with NestJS Tutorial] (https://www.prisma.io/blognestjs-prisma-authentication-7D056s1s0k3l#implement-authentication-in-your-rest-api)
- [Passport.js Tutorial](https://docs.starton.com/tutorials/jwt-authentication-nest#authguard)
- [REST API Tutorial] (https://www.prisma.io/blog/series/nestjs-prisma-kges29apbbik)

### TMDB API
- [TMDB API Documentation](https://developers.themoviedb.org/3/getting-started/introduction)


