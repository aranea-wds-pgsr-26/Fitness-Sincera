# Story: Backend Endpoints & Database Schema for Professional Dashboards

**Story ID:** PROF-DASH-001-003
**Epic ID:** PROF-DASH-001
**Status:** Draft
**Created:** 2026-02-21
**Complexity:** 8 pts
**Priority:** Critical (Dependency for UI Stories)

---

## 📋 Description

Implementar endpoints backend e schema de database para suportar os dashboards de especialistas (Nutricionista e Personal Trainer). Esta é a story de dependência que habilita as UI stories (PROF-DASH-001-001 e PROF-DASH-001-002).

**Business Value:** Fornece infraestrutura backend necessária para que profissionais gerenciem múltiplos clientes com dados estruturados e endpoints otimizados.

---

## ✅ Acceptance Criteria

### Scenario 1: Database Schema Criado
```gherkin
Given desenvolvedora executando migration do banco
When executar migration para tabelas profissionais
Then deve criar com sucesso:
  ✓ ALTER users ADD COLUMN role VARCHAR(20) DEFAULT 'client'
  ✓ ALTER users ADD COLUMN is_specialist BOOLEAN DEFAULT false
  ✓ CREATE TABLE clients_nutritionist (com FKs corretas)
  ✓ CREATE TABLE clients_trainer (com FKs corretas)
  ✓ Índices criados para performance
```

### Scenario 2: Endpoints de Nutricionista Implementados
```gherkin
Given aplicação backend rodando
When fazer GET /api/nutritionist/dashboard
Then response HTTP 200 com:
  ✓ { total_clients: number, at_risk_count: number, avg_adherence: number }

When fazer GET /api/nutritionist/clients (com ?status=active)
Then response HTTP 200 com array:
  ✓ [{ id, name, status, last_checkin, meal_plan_id }]

When fazer GET /api/nutritionist/clients/:id
Then response HTTP 200 com:
  ✓ { id, name, email, nutrition_metrics: [...] }

When fazer PUT /api/nutritionist/clients/:id/plan (com meal_plan_id)
Then response HTTP 200 com success message
```

### Scenario 3: Endpoints de Trainer Implementados
```gherkin
Given aplicação backend rodando
When fazer GET /api/trainer/dashboard
Then response HTTP 200 com:
  ✓ { total_clients: number, low_adherence_count: number, avg_performance: number }

When fazer GET /api/trainer/clients (com ?performance=low)
Then response HTTP 200 com array:
  ✓ [{ id, name, last_workout, performance_score }]

When fazer GET /api/trainer/clients/:id
Then response HTTP 200 com:
  ✓ { id, name, email, workout_sessions: [...] }

When fazer PUT /api/trainer/clients/:id/program (com program_id)
Then response HTTP 200 com success message
```

### Scenario 4: Autenticação & Autorização
```gherkin
Given usuário sem token JWT
When fazer request para /api/nutritionist/* ou /api/trainer/*
Then deve retornar HTTP 401 Unauthorized

Given usuário com role='client'
When tentar acessar /api/nutritionist/dashboard
Then deve retornar HTTP 403 Forbidden

Given nutricionista autenticado com token
When acessar /api/nutritionist/clients
Then deve ver apenas seus próprios clientes
```

### Scenario 5: Testes de API Passando
```gherkin
Given suite de testes com Supertest
When executar npm test
Then todos 24+ testes devem passar:
  ✓ GET endpoints retornam dados corretos
  ✓ PUT endpoints atualizam dados
  ✓ Auth tests passam
  ✓ Integration tests com DB passam
```

### Scenario 6: Error Handling Padrão
```gherkin
Given request inválida (missing fields)
When fazer POST/PUT sem dados obrigatórios
Then deve retornar HTTP 400 com mensagem de erro clara

Given operação que falha no banco
When executar query com DB error
Then deve retornar HTTP 500 com mensagem genérica
  AND logar erro detalhado no servidor
```

---

## 📦 In Scope

- [x] Criar migration do Drizzle para tabelas profissionais
- [x] Implementar schema com relações corretas (many-to-many)
- [x] Criar 4 endpoints GET de dashboard e listagem
- [x] Criar 2 endpoints PUT para atualizar planos/programas
- [x] Implementar autenticação JWT em todas as rotas
- [x] Implementar autorização baseada em role
- [x] Adicionar testes de API com Supertest (mínimo 80% coverage)
- [x] Implementar error handling padrão
- [x] Documentar endpoints com JSDoc/OpenAPI
- [x] Adicionar rate limiting básico

---

## 🚫 Out of Scope

- UI/Frontend (responsabilidade de Stories 1 e 2)
- Integração com APIs externas
- Análise IA de dados
- Exportação de relatórios
- Websockets para real-time (será future enhancement)
- Webhooks para eventos
- Auditoria completa (logging será básico)

---

## 🔗 Dependencies

**Nenhuma story prévia é obrigatória.**

**Pré-requisitos técnicos:**
- PostgreSQL rodando
- Drizzle ORM configurado
- Express 5.0+ com TypeScript
- JWT library (jsonwebtoken)
- bcrypt para password hashing (já deve estar)

**Repositórios/Conhecimento necessário:**
- Schema do `users` table (para FKs)
- Padrão de autenticação existente no projeto
- Configuração de environment variables

---

## 📊 Acceptance Criteria Checklist

- [ ] Migrations executadas sem erros
- [ ] 8/8 endpoints implementados e testados
- [ ] 80%+ code coverage em testes
- [ ] Todas as rotas exigem autenticação
- [ ] Autorização por role funcionando
- [ ] Error handling padrão implementado
- [ ] Rate limiting aplicado
- [ ] JSDoc em todas as funções
- [ ] npm run lint passa sem warnings
- [ ] npm run typecheck passa
- [ ] Nenhuma issue CRITICAL/HIGH no CodeRabbit
- [ ] Testes de integração com DB passam

---

## 🎯 Criteria of Done

- [x] Código passa `npm run lint` sem warnings
- [x] Código passa `npm run typecheck` sem errors
- [x] 80%+ cobertura de testes (unit + integration)
- [x] Todos acceptance criteria atendidos (100%)
- [x] CodeRabbit scan resultado: PASS (0 CRITICAL/HIGH)
- [x] PR revisado por @qa (verdict: PASS)
- [x] Merged para main por @devops
- [x] Feature branch deletada após merge

---

## 📁 File List

**Novos arquivos a criar:**

```
server/
├── migrations/
│   └── 001_professional_dashboards.ts      (migration do Drizzle)
├── routes/
│   ├── nutritionist.ts                     (endpoints nutritionista)
│   └── trainer.ts                          (endpoints trainer)
├── controllers/
│   ├── nutritionist.controller.ts          (lógica)
│   └── trainer.controller.ts               (lógica)
├── middleware/
│   ├── auth.middleware.ts                  (JWT validation)
│   └── roleCheck.middleware.ts             (role-based access)
└── tests/
    ├── nutritionist.api.test.ts            (Supertest)
    └── trainer.api.test.ts                 (Supertest)

shared/
└── types/
    ├── nutritionist.types.ts               (TypeScript types)
    └── trainer.types.ts                    (TypeScript types)
```

**Arquivos a modificar:**

```
server/
├── index.ts                                (registrar novas rotas)
└── schema.ts                               (Drizzle schema)
```

---

## 🛠️ Implementation Notes

### Database Structure

```sql
-- Adicionar colunas na tabela users
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'client';
ALTER TABLE users ADD COLUMN is_specialist BOOLEAN DEFAULT false;

-- Relação many-to-many: Nutricionista <-> Clients
CREATE TABLE clients_nutritionist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nutritionist_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'paused'
  meal_plan_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (nutritionist_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(nutritionist_id, client_id)
);

-- Relação many-to-many: Trainer <-> Clients
CREATE TABLE clients_trainer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL,
  client_id UUID NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'paused'
  current_program_id UUID,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (trainer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(trainer_id, client_id)
);

-- Índices para performance
CREATE INDEX idx_clients_nutritionist_nutri_id ON clients_nutritionist(nutritionist_id);
CREATE INDEX idx_clients_nutritionist_client_id ON clients_nutritionist(client_id);
CREATE INDEX idx_clients_nutritionist_status ON clients_nutritionist(status);
CREATE INDEX idx_clients_trainer_trainer_id ON clients_trainer(trainer_id);
CREATE INDEX idx_clients_trainer_client_id ON clients_trainer(client_id);
CREATE INDEX idx_clients_trainer_status ON clients_trainer(status);
```

### API Response Format

```typescript
// Dashboard Stats
interface DashboardStats {
  total_clients: number;
  at_risk_count?: number;      // Nutritionist
  low_adherence_count?: number; // Trainer
  avg_adherence?: number;       // Nutritionist
  avg_performance?: number;     // Trainer
  last_updated: ISO8601;
}

// Client List Item
interface ClientListItem {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'paused';
  last_checkin?: ISO8601;       // Nutritionist
  last_workout?: ISO8601;       // Trainer
  performance_score?: number;   // Trainer
  meal_plan_id?: string;        // Nutritionist
  current_program_id?: string;  // Trainer
}

// Error Response
interface ErrorResponse {
  error: string;
  message: string;
  timestamp: ISO8601;
}
```

---

## 🧪 Testing Strategy

**Unit Tests (Controllers):**
- Testar business logic sem BD
- Mock de database queries
- Validação de inputs

**Integration Tests (API):**
- Usar Supertest para fazer requests HTTP
- Test com banco de dados real (ou fixtures)
- Validar status codes e response bodies
- Testar auth/authorization

**Coverage Target:** 80%+ (linhas de código)

**Test Files Location:** `server/tests/`

---

## 📖 Dev Notes

- Usar Drizzle migrations com padrão `XXX_name_of_migration.ts`
- Manter autenticação consistente com o resto da app
- Usar middleware chain pattern para auth + roleCheck
- Rate limiting: máximo 60 requests/minuto por IP
- Logar todas as operações PUT/DELETE para auditoria básica
- Retornar 404 se cliente não pertence ao profissional
- Retornar 400 se dados inválidos antes de fazer query

---

## 🔄 Related Stories

**Bloqueiam:** PROF-DASH-001-001, PROF-DASH-001-002
**Bloqueado por:** Nenhuma
**Referências:** Epic PROF-DASH-001

---

## 📝 Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-02-21 | @sm | Story criada baseada no epic |

---

