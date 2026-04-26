# Bella Cucina

![Logo Bella Cucina](./public/logo.svg)

Site do restaurante Bella Cucina: cardápio digital, reservas, pedidos por QR e painel do garçom. Interface em português, inglês e italiano.

## Funcionalidades

- **Cardápio**: fotos, descrições e filtro por categoria
- **Pedidos**: fluxo com QR na mesa
- **Reservas**: calendário, horário e tamanho do grupo
- **Layout responsivo**: mobile, tablet e desktop
- **Tema**: cores e tipografia alinhadas à identidade do restaurante

## Tecnologias

- React, TypeScript, Vite
- Tailwind CSS, componentes Radix / padrão shadcn
- React Context, React Hook Form, Zod
- date-fns

## Estrutura do projeto

```
src/
├── components/
│   ├── cart/
│   ├── home/
│   ├── layout/
│   ├── menu/
│   ├── reservation/
│   ├── ui/
│   └── waiter/
├── lib/
└── types/
```

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/devthomaseduardo/BellaCucina.git
   cd BellaCucina
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o front:

   ```bash
   npm run dev
   ```

## API REST (reservas e pedidos)

Há uma API em Node (dados em memória) para **reservas**, **pedidos** e **aprovação de pedidos**.

- Documentação: `docs/api.md`
- Front + API:

```bash
npm run dev:all
```

Rotas base:

- `GET /api/health`
- `POST /api/reservations`
- `POST /api/orders`
- `POST /api/orders/:id/approve`

## Build de produção

```bash
npm run build
```

## Variáveis de ambiente

Crie um `.env` na raiz, por exemplo:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BASE_PATH=/
```

## Licença

MIT (veja `LICENSE` se existir no repositório).

---

**devthomaseduardo**
