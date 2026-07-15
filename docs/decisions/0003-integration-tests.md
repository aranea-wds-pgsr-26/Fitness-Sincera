# ADR-0003 - Estratégia de Testes de Integração

## Contexto

A API ainda não possui autenticação completa.

## Decisão

Criar testes de integração que executam diretamente as funções do store.ts utilizando o banco Supabase real.

## Motivos

- validar persistência
- validar SQL
- não depender do Express
- não depender do login

## Consequências

Quando a autenticação estiver pronta, os testes E2E via HTTP complementarão os testes de integração, sem substituí-los.