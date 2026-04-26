---
title: "Cardápio Digital Moderno"
subtitle: "Tecnologia sob medida para bares e restaurantes"
author: "devthomaseduardo"
date: "2026"
fontsize: 11pt
linestretch: 1.08
geometry:
  - margin=1.6cm
  - heightrounded
header-includes:
  - \usepackage{microtype}
  - \usepackage{titlesec}
  - \titlespacing*{\section}{0pt}{1.1em}{0.6em}
  - \titlespacing*{\subsection}{0pt}{0.9em}{0.4em}
  - \setlength{\parskip}{0.35em}
  - \setlength{\parindent}{0pt}
---

![](docs/hotmart/assets/capa.png)

\newpage

## Autoria

Este material (texto e estrutura do guia) e o projeto incluído (template) foram desenvolvidos por **devthomaseduardo**.

- GitHub: `https://github.com/devthomaseduardo`

### Créditos de imagens (exemplos)

As imagens usadas como exemplo no template pertencem aos seus respetivos autores e seguem as licenças indicadas nas fontes (ex.: Wikimedia Commons / Unsplash). Recomenda-se substituir pelas imagens do seu estabelecimento.

\newpage

## Sumário

1. Visão geral
2. O que vem no produto
3. Para quem é e o que resolve
4. Pré-requisitos e instalação
5. Primeira execução (front + API)
6. Estrutura do projeto (onde mexer)
7. Configurações essenciais (rotas, QR, env)
8. Cardápio: itens, categorias e preços
9. Imagens: como trocar (sem “imagens aleatórias”)
10. Idiomas: PT/EN/IT e textos
11. Reservas, pedidos e painel do garçom
12. Deploy e domínio (publicação)
13. Checklist final de entrega
14. Assistentes para acelerar ajustes (opcional)
15. Perguntas frequentes e solução de problemas

\newpage

## 1) Visão geral

O **Cardápio Digital Moderno** é um projeto pronto para você publicar um site profissional de bar/restaurante com:

- Cardápio com imagens (categorias, pesquisa, destaques)
- Pedido na mesa via QR (carrinho e fluxo de pedido)
- Reservas (data, hora e dados do cliente)
- Painel do garçom (acompanhamento de pedidos)
- API opcional em Node (modo desenvolvimento)
- Multilíngue (PT/EN/IT)

**Meta do guia**: você conseguir instalar, personalizar e publicar — sem depender de ninguém.

**Demo (visualização online)**: `https://bella-cucina-demo.vercel.app/`

\newpage

## 2) O que vem no produto

Você recebe:

- Este **PDF/guia**
- Um **ZIP com o código-fonte do template**

O ZIP contém:

- Front-end: React + TypeScript + Vite
- Estilo: Tailwind CSS
- Componentes: Radix (padrão shadcn)
- Menu de exemplo: `src/data/italian-menu.ts`
- API (opcional): `server.mjs`
- Documentação da API: `docs/api.md`

\newpage

## 3) Para quem é e o que resolve

Esse produto foi pensado para:

- Donos/gestores de bares e restaurantes que querem um **menu moderno com fotos**
- Quem quer ter **QR na mesa** com um fluxo simples de pedido
- Agências, freelancers e devs que precisam de uma base pronta e editável

Ele resolve:

- PDF travando no celular
- Falta de fotos e destaques (baixa conversão)
- Falta de reservas online
- Falta de uma base profissional para crescer depois

\newpage

## 4) Pré-requisitos e instalação

### 4.1 O que instalar

- Node.js LTS
- NPM (já vem com o Node)
- VS Code (ou outro editor)

### 4.2 Instalar dependências

Na pasta do projeto:

```bash
npm install
```

\newpage

## 5) Primeira execução (front + API)

### 5.1 Rodar o front

```bash
npm run dev
```

Abra a URL que aparecer (geralmente `http://localhost:5173`).

### 5.2 Rodar front + API (opcional)

```bash
npm run dev:all
```

Por padrão:

- API: `http://localhost:3001`
- Front: Vite (porta 5173) usando proxy `/api`

\newpage

## 6) Estrutura do projeto (onde mexer)

Você vai mexer principalmente em:

- Cardápio (itens, preços, imagens): `src/data/italian-menu.ts`
- Textos/idiomas: `src/i18n/translations.ts`
- Seções do site: `src/components/home/*`
- Menu (UI/itens): `src/components/menu/*`
- Reservas: `src/components/reservation/*`
- Garçom: `src/components/waiter/*`
- Navegação fixa: `src/components/layout/StickySiteNav.tsx`

\newpage

## 7) Configurações essenciais (rotas, QR, env)

### 7.1 Rotas principais

Em `src/App.tsx`:

- `/` seleção de idioma
- `/menu` site + cardápio
- `/garcom` painel do garçom

Se quiser que o menu seja a home, você pode trocar a rota `/` para apontar para o componente do menu.

### 7.2 Link do QR

O QR é gerado em `src/components/menu/MenuSection.tsx`.

Troque a URL para o domínio real do cliente:

```
https://seudominio.com/menu
```

### 7.3 Variáveis de ambiente

Crie `.env` na raiz (se precisar):

```
VITE_BASE_PATH=/
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use `VITE_BASE_PATH` quando publicar em subpasta (ex.: `/app/`).

\newpage

## 8) Cardápio: itens, categorias e preços

Arquivo: `src/data/italian-menu.ts`

Cada item tem:

- `id` (único)
- `name`, `description`
- `price` (número)
- `image` (URL ou caminho `/public`)
- `category`
- `featured` (entra nos destaques)

### 8.1 Como trocar itens rapidamente

1) Copie um item existente
2) Troque `name`, `description`, `price`, `image`
3) Confirme a `category` (e o rótulo no i18n)

### 8.2 Dicas de descrição (que vende)

- 1 linha com ingrediente/diferencial
- Evite texto longo: deixe para o modal

\newpage

## 9) Imagens: como trocar (sem “imagens aleatórias”)

### 9.1 Regra de ouro

Use **fotos reais** do restaurante sempre que possível.

### 9.2 Melhor forma (recomendada)

Coloque fotos no `public/`:

```
public/menu/pizza-margherita.jpg
```

E use assim no item:

```
/menu/pizza-margherita.jpg
```

### 9.3 Onde mais existem imagens

- Galeria: `src/components/home/GalleryStrip.tsx`
- Chef/cozinha: `src/components/home/ChefBrigadeSection.tsx`
- Fundos: `src/components/home/HeroSection.tsx`

\newpage

## 10) Idiomas: PT/EN/IT e textos

Arquivo: `src/i18n/translations.ts`

Você pode editar os textos em:

- Português (pt)
- Inglês (en)
- Italiano (it)

Checklist de personalização:

- Nome do restaurante e “frase de efeito”
- História (Sobre)
- Contato (WhatsApp, endereço, horário)
- Mensagens do carrinho/pedido

\newpage

## 11) Reservas, pedidos e painel do garçom

### 11.1 Reservas

Componentes em `src/components/reservation/`.

### 11.2 Pedidos (carrinho)

Estado do carrinho em `src/components/cart/`.

### 11.3 Painel do garçom

Componentes em `src/components/waiter/`.

### 11.4 API (opcional)

Arquivo: `server.mjs`  
Docs: `docs/api.md`

Rotas:

- `GET /api/health`
- `POST /api/reservations`
- `POST /api/orders`
- `POST /api/orders/:id/approve`

\newpage

## 12) Deploy e domínio (publicação)

### 12.1 Build

```bash
npm run build
```

Gera `dist/`.

### 12.2 Vercel (simples)

- Build: `npm run build`
- Output: `dist`

### 12.3 Netlify (simples)

- Build: `npm run build`
- Publish: `dist`

Depois conecte o domínio do cliente e atualize o link do QR para o endereço final.

\newpage

## 13) Checklist final de entrega

- [ ] Menu (itens, descrições, preços)
- [ ] Imagens reais/validadas
- [ ] Contato e endereço corretos
- [ ] QR aponta para o domínio online
- [ ] Teste no celular (Android/iPhone)
- [ ] Teste de reserva e pedido

\newpage

## 14) Assistentes para acelerar ajustes (opcional)

Esta seção é opcional. Se você quiser acelerar tarefas repetitivas (textos, categorias, SEO básico, variações de descrição), você pode usar assistentes de escrita e desenvolvimento como apoio.

### 14.1 Boas práticas (importante)

- **Nunca cole dados sensíveis**: chaves, senhas, `.env`, dados pessoais de clientes.
- **Não envie código inteiro**: envie só o trecho/arquivo necessário.
- **Peça respostas objetivas**: “gere 10 descrições curtas para X”, “crie 5 títulos”, “faça checklist”.

### 14.2 Prompts prontos (copiar/colar)

**A) Textos do hero (3 variações)**

“Crie 3 variações de headline e 3 variações de subtítulo para um restaurante italiano contemporâneo em São Paulo. Tom: premium, direto, sem exageros. Em PT-BR.”

**B) Descrições de pratos (curtas, vendáveis)**

“Escreva 12 descrições curtas (1–2 linhas) para: [cole lista de nomes dos pratos]. Tom: gastronômico, elegante, sem emojis. Evite promessas de saúde.”

**C) Categorias do cardápio**

“Sugira uma lista de categorias para o cardápio de um restaurante italiano (antipasti, primi, secondi, dolci, bebidas etc.) e traduza para EN e IT.”

**D) Checklist de fotos**

“Crie um checklist para fotografar pratos para um cardápio digital: iluminação, enquadramento, fundo, tamanho do arquivo e padronização.”

### 14.3 Ideias de evolução (quando você quiser)

- Trocar dados estáticos por banco de dados (ex.: Supabase)
- Criar painel admin para editar menu e preços
- Integrar pagamento (Pix/cartão) e status de pedido
- Criar “menu do dia” e horários por disponibilidade

\newpage

## 15) Perguntas frequentes e solução de problemas

**Tem painel administrativo completo?**  
Não. É uma base pronta para personalizar e evoluir.

**Inclui domínio e hospedagem?**  
Não. Domínio/hospedagem são à parte.

**Imagens não carregam**  
Prefira imagens locais em `public/` e confirme o caminho.

**Rotas quebram no deploy**  
Ajuste `VITE_BASE_PATH` se publicar em subpasta.
