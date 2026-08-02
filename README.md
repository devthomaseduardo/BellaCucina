# Bella Cucina

**Cardápio digital moderno** para restaurante italiano — pedidos na mesa por QR, reservas online, painel do garçom e i18n (PT · EN · IT).

> Case de portfólio · Full stack · React + Vite + TypeScript  
> Autor: [Thomas Eduardo](https://thomaseduardo.com.br) · [GitHub](https://github.com/devthomaseduardo)

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=devthomaseduardo&repo=BellaCucina&color=orange" alt="Repository Views" />
</p>

---

## O problema

Bares e restaurantes ainda dependem de cardápio impresso, pedidos no caderno e reservas por telefone. Isso gera fila, erro de pedido e zero rastreio.

## A solução

Um **site + fluxo operacional** em um só produto:

| Área | O que faz |
|------|-----------|
| **Cardápio** | Fotos, descrições, filtro por categoria |
| **Pedidos** | Carrinho + QR na mesa → pedido na cozinha |
| **Reservas** | Data, horário, tamanho do grupo, observações |
| **Garçom** | Painel `/garcom` para aprovar e acompanhar pedidos |
| **Idiomas** | Português, inglês e italiano |

## Stack

- **Front:** React 18, TypeScript, Vite, Tailwind, Radix/shadcn, Framer Motion  
- **Estado:** Context API (carrinho)  
- **Forms:** React Hook Form + Zod  
- **API demo:** Express em memória (`server.mjs`) — reservas e pedidos  
- **Extras:** QR Code, scanner ZXing, i18n próprio

## Rotas

| Path | Descrição |
|------|-----------|
| `/` | Seleção de idioma |
| `/menu` | Home + cardápio + reservas + contato |
| `/garcom` | Painel operacional do garçom |

## Começar em 2 minutos

```bash
git clone https://github.com/devthomaseduardo/BellaCucina.git
cd BellaCucina
npm install
cp .env.example .env   # opcional
npm run dev:all        # front (Vite) + API (:3001)
```

Só o front: `npm run dev`  
Build: `npm run build` → `npm run preview`

## API (dev)

Documentação: [`docs/api.md`](docs/api.md)

| Método | Rota | Uso |
|--------|------|-----|
| `GET` | `/api/health` | Healthcheck |
| `POST` | `/api/reservations` | Nova reserva |
| `POST` | `/api/orders` | Novo pedido |
| `POST` | `/api/orders/:id/approve` | Aprovar pedido |

> Dados em memória — reiniciar a API zera reservas e pedidos. Ideal para demo e portfólio.

## Estrutura

```
src/
├── components/
│   ├── cart/          # Carrinho + modal de checkout
│   ├── home/          # Hero, galeria, destaques
│   ├── menu/          # Cardápio e filtros
│   ├── reservation/   # Formulário de reserva
│   ├── waiter/        # Painel do garçom + QR scanner
│   ├── layout/        # Nav, footer, floating actions
│   └── ui/            # Design system (shadcn)
├── data/              # Cardápio italiano (mock)
├── i18n/              # Traduções PT / EN / IT
├── lib/               # Utils, QR, Supabase (opcional)
└── types/
```

## Deploy (Vercel)

1. Importar o repositório na Vercel  
2. Build: `npm run build` · Output: `dist`  
3. `vercel.json` já reescreve rotas SPA  
4. A API em memória **não** sobe na Vercel estática — use só o front, ou hospede `server.mjs` à parte

## Variáveis

Ver [`.env.example`](.env.example).

Supabase é **opcional**. O fluxo principal usa a API Express local.

## Licença

MIT — uso livre para estudo e demonstração.

---

**Thomas Eduardo** · [thomaseduardo.com.br](https://thomaseduardo.com.br) · [portfolio / cases](https://thomaseduardo.com.br/#projetos)
