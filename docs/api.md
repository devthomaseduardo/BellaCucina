## API REST (Bella Cucina)

Esta API REST existe para **registrar reservas** e **registrar/aprovar pedidos**.

### Como rodar

- Em dois terminais:

```bash
npm run api
npm run dev
```

- Ou tudo junto:

```bash
npm run dev:all
```

Por padrão, a API sobe em `http://localhost:3001` e o front usa proxy via `/api`.

### Healthcheck

`GET /api/health`

Resposta: 

```json
{ "ok": true, "service": "bella-cucina-api", "time": "2026-04-25T00:00:00.000Z" }
```

---

## Reservas

### Criar reserva

`POST /api/reservations`

Body:

```json
{
  "customer": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999990000"
  },
  "partySize": 2,
  "datetimeISO": "2026-05-14T20:30:00.000Z",
  "specialRequests": "Mesa perto da janela"
}
```

Resposta `201`:

```json
{
  "id": "res_...",
  "status": "confirmed",
  "createdAt": "2026-04-25T00:00:00.000Z",
  "customer": { "name": "João Silva", "email": "joao@email.com", "phone": "11999990000" },
  "partySize": 2,
  "datetimeISO": "2026-05-14T20:30:00.000Z",
  "specialRequests": "Mesa perto da janela"
}
```

### Buscar reserva

`GET /api/reservations/:id`

---

## Pedidos

### Criar pedido

`POST /api/orders`

Body:

```json
{
  "tableNumber": "12",
  "customerName": "Ana",
  "items": [
    { "id": "1", "name": "Pizza Margherita", "price": 39.9, "quantity": 1, "image": "/banner.png", "category": "Pizza" }
  ],
  "totalPrice": 39.9
}
```

Resposta `201`:

```json
{
  "id": "ord_...",
  "status": "pending",
  "createdAt": "2026-04-25T00:00:00.000Z",
  "updatedAt": "2026-04-25T00:00:00.000Z",
  "tableNumber": "12",
  "customerName": "Ana",
  "items": [...],
  "totalPrice": 39.9
}
```

### Buscar pedido

`GET /api/orders/:id`

### Aprovar pedido (garçom)

`POST /api/orders/:id/approve`

Resposta:

```json
{
  "id": "ord_...",
  "status": "preparing",
  "updatedAt": "2026-04-25T00:00:00.000Z",
  "...": "..."
}
```

