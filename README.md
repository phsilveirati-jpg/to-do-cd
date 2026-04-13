# 🧪 Projeto To-Do com CI/CD

## 📌 Descrição

Este projeto consiste em uma aplicação web simples de lista de tarefas (To-Do List), desenvolvida com foco na aplicação de boas práticas de qualidade de software.

O objetivo principal é demonstrar o uso de:

* Testes automatizados
* Integração contínua (CI)
* Revisão de código via Pull Request
* Deploy automatizado

---

## 🚀 Tecnologias utilizadas

* JavaScript
* Node.js
* Jest (testes)
* GitHub Actions (CI/CD)
* GitHub Pages (deploy)

---

## 🎯 Justificativa do projeto

Optamos por desenvolver uma aplicação frontend simples para reduzir a complexidade e focar nos aspectos de qualidade de software, como testes automatizados, integração contínua e controle de versão com boas práticas.

---

## ⚙️ Como executar o projeto

1. Clonar o repositório:

```
git clone <url-do-repositorio>
```

2. Instalar dependências:

```
npm install
```

3. Executar os testes:

```
npm test
```

---

## 🔄 Pipeline de CI/CD

A pipeline foi configurada utilizando GitHub Actions e é executada automaticamente em:

* Push na branch `main`
* Abertura de Pull Requests

### O que a pipeline faz:

* Instala dependências
* Executa testes automatizados
* Retorna status (sucesso ou falha)
* Exibe logs da execução

---

## 🔒 Controle de qualidade (Pull Requests)

O repositório foi configurado para:

* Exigir Pull Request para merge na branch `main`
* Exigir aprovação de outro colaborador
* Impedir auto-aprovação
* Executar CI obrigatoriamente antes do merge

---

## 🤖 Revisão automatizada

Foi utilizada ferramenta de análise automatizada (GitHub CodeQL / Copilot), que realiza verificações e sugestões no código durante os Pull Requests.

---

## 🌍 Deploy

A aplicação será publicada utilizando **GitHub Pages**, permitindo acesso direto via navegador.

---

## 👥 Integrantes

* Pedro Ernesto
* Ricardo Belan

---

## 📅 Entrega

Atividade avaliativa de Qualidade de Software com foco em CI/CD.
