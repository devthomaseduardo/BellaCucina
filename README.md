# Bella Cucina

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Cardápio digital, pedidos por QR na mesa, reservas online e painel do garçom para restaurante italiano (demo full stack). Interface em **PT · EN · IT**.

Autor: [Thomas Eduardo](https://thomaseduardo.com.br) · [GitHub](https://github.com/devthomaseduardo/BellaCucina)

## Propósito

- **Experiência do cliente:** cardápio com fotos e filtros, pedido na mesa via QR, reserva online sem telefone.
- **Operação:** painel `/garcom` para ver, aprovar e acompanhar pedidos.
- **Demonstração de portfólio:** fluxo completo front + API Express em memória, pronto para clone e demo.

## Funcionalidades

| Área | Descrição |
|------|-----------|
| **Seleção de idioma** | PT / EN / IT na entrada |
| **Cardápio** | Categorias, fotos, descrições |
| **Carrinho / pedido** | Checkout e envio para a API |
| **QR na mesa** | Identificação de mesa e fluxo de pedido |
| **Reservas** | Data, horário, grupo, observações |
| **Painel do garçom** | Listagem e aprovação de pedidos (`/garcom`) |
| **Scanner** | Leitura de QR (ZXing) no fluxo operacional |

## Rotas

| Rota | Função |
|------|--------|
| `/` | Idioma |
| `/menu` | Home, cardápio, reservas, contato |
| `/garcom` | Operação do garçom |

## Stack

| Camada | Tecnologia |
|--------|------------|
| Linguagem | **TypeScript** |
| UI | **React 18**, **React Router 6** |
| Build | **Vite 5** (`@vitejs/plugin-react-swc`) |
| Estilo | **Tailwind CSS**, **tailwindcss-animate** |
| Componentes | **shadcn/ui** (Radix, CVA, tailwind-merge) |
| Formulários | **react-hook-form**, **Zod** |
| Motion | **Framer Motion** |
| API demo | **Express** (`server.mjs`, dados em memória) |
| Extras | **qrcode.react**, **@zxing/browser**, i18n próprio |
| Qualidade | **ESLint** + **typescript-eslint** |

## Requisitos

- **Node.js** 18 ou superior

## Instalação

```bash
git clone https://github.com/devthomaseduardo/BellaCucina.git
cd BellaCucina
npm install
cp .env.example .env   # opcional
```

## Scripts

| Comando | Efeito |
|---------|--------|
| `npm run dev` | Front (Vite) |
| `npm run api` | API Express na porta **3001** |
| `npm run dev:all` | Front + API juntos |
| `npm run build` | Typecheck + build em `dist/` |
| `npm run preview` | Preview do build |
| `npm run lint` | ESLint |

## API (desenvolvimento)

| Método | Rota | Uso |
|--------|------|-----|
| `GET` | `/api/health` | Healthcheck |
| `POST` | `/api/reservations` | Nova reserva |
| `POST` | `/api/orders` | Novo pedido |
| `POST` | `/api/orders/:id/approve` | Aprovar pedido |

Detalhes em [`docs/api.md`](docs/api.md). Dados em memória: reiniciar a API zera o estado.

Supabase no código é **opcional**; o fluxo principal usa a API Express.

## Deploy

Build estático em `dist/` (Vercel, Netlify, etc.). `vercel.json` faz rewrite SPA.

A API em memória **não** sobe no host estático — use só o front na Vercel ou hospede `server.mjs` à parte.

## Licença

MIT © Thomas Eduardo
