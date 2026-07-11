# Backend scaffold

This folder contains a modular Express API scaffold for the Fitness Sincera platform.

## Included modules
- Auth: registration, login and user profile
- Meals: CRUD for meals
- Diets: CRUD for diet plans
- Workouts: CRUD for workout plans
- Chatbot: message handling and history
- Wearables: structure for future provider integrations

## Run locally
```powershell
npm run dev:back
```

## Main routes
- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/meals
- GET /api/diets
- GET /api/workouts
- POST /api/chatbot/message
- POST /api/wearables/sync
