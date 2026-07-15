# Backend foundation API

## Base URL local

```text
http://localhost:4001/api
```

Para subir apenas o backend novo:

```powershell
npm.cmd run dev:back
```

Se `DATABASE_URL` nao estiver configurada, os endpoints de banco ficarao indisponiveis, mas os endpoints de fundacao continuarao respondendo.

## Endpoints publicos

### GET /health

Verifica se o backend novo responde.

Resposta:

```json
{
  "status": "ok",
  "service": "fitness-sincera-backend",
  "requestId": "..."
}
```

### GET /readiness

Verifica se a aplicacao esta pronta para receber trafego basico e se existe configuracao de banco.

Resposta:

```json
{
  "status": "ok",
  "service": "fitness-sincera-backend",
  "database": {
    "configured": true
  },
  "requestId": "..."
}
```

### GET /v1/system/meta

Retorna metadados da API versionada.

Resposta:

```json
{
  "service": "fitness-sincera-backend",
  "apiVersion": "v1",
  "environment": "development",
  "requestId": "..."
}
```

## Request ID

Toda requisicao recebe um `x-request-id`.

Se o cliente enviar esse header, o backend preserva o valor.
Se nao enviar, o backend gera um UUID.

O mesmo ID aparece no header de resposta e no corpo dos endpoints de fundacao/erro.

## Auth atual

Os endpoints atuais de auth ficam em:

```text
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

Na Sprint 3, usuarios e sessoes passaram a usar Drizzle.

Para validar sem Postman:

```powershell
npm.cmd run manual:backend:auth
```
