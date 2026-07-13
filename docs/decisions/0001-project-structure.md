# ADR-0001 — Estrutura do Projeto

**Status:** Aceito

## Contexto

O projeto Fitness Sincera iniciou como uma aplicação única (monolítica), sem uma separação clara entre frontend e backend. Durante as primeiras sprints foi decidido reorganizar a estrutura para facilitar manutenção, escalabilidade e futuras integrações.

## Decisão

Adotar uma estrutura modular no backend, separando responsabilidades por domínio de negócio.

Estrutura principal:

```text
back-end/
└── src/
    ├── lib/
    ├── middleware/
    ├── modules/
    ├── shared/
    ├── tests/
    ├── app.ts
    └── server.ts
```

Cada módulo concentra suas rotas, validações e futuras evoluções relacionadas ao domínio correspondente.

## Justificativa

Essa organização oferece:

* Separação clara de responsabilidades.
* Facilidade para adicionar novos módulos.
* Maior reutilização de código.
* Melhor organização para testes.
* Menor acoplamento entre funcionalidades.

## Consequências

Novas funcionalidades deverão ser adicionadas dentro de `modules/`, respeitando a separação por domínio.

Os componentes compartilhados deverão permanecer em `shared/`.

A camada de acesso ao banco permanecerá centralizada em `lib/`.

## Alternativas consideradas

* Estrutura totalmente baseada em controllers/services/repositories.
* Estrutura por camadas tradicionais.

Essas alternativas foram descartadas neste momento para manter a curva de aprendizado menor e permitir evolução incremental durante as próximas sprints.

## Data

Sprint 0.2.4
