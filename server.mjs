import express from "express";
import cors from "cors";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// --- Armazenamento em memória (desenvolvimento) ---
/** @type {Map<string, any>} */
const reservations = new Map();
/** @type {Map<string, any>} */
const orders = new Map();

const ReservationCreateSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
  }),
  partySize: z.number().int().min(1).max(20),
  datetimeISO: z.string().datetime(),
  specialRequests: z.string().optional().default(""),
});

const OrderCreateSchema = z.object({
  tableNumber: z.string().min(1),
  customerName: z.string().min(1),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().nonnegative(),
      quantity: z.number().int().min(1),
      image: z.string(),
      category: z.string(),
      notes: z.string().optional(),
    }),
  ),
  totalPrice: z.number().nonnegative(),
});

function id(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "bella-cucina-api", time: new Date().toISOString() });
});

// --- Reservations ---
app.post("/api/reservations", (req, res) => {
  const parsed = ReservationCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
  }

  const reservationId = id("res");
  const now = new Date().toISOString();
  const reservation = {
    id: reservationId,
    status: "confirmed",
    createdAt: now,
    ...parsed.data,
  };
  reservations.set(reservationId, reservation);
  return res.status(201).json(reservation);
});

app.get("/api/reservations/:id", (req, res) => {
  const r = reservations.get(req.params.id);
  if (!r) return res.status(404).json({ error: "NOT_FOUND" });
  return res.json(r);
});

// --- Orders ---
app.post("/api/orders", (req, res) => {
  const parsed = OrderCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: parsed.error.flatten(),
    });
  }

  const orderId = id("ord");
  const now = new Date().toISOString();
  const order = {
    id: orderId,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    ...parsed.data,
  };
  orders.set(orderId, order);
  return res.status(201).json(order);
});

app.get("/api/orders/:id", (req, res) => {
  const o = orders.get(req.params.id);
  if (!o) return res.status(404).json({ error: "NOT_FOUND" });
  return res.json(o);
});

app.post("/api/orders/:id/approve", (req, res) => {
  const o = orders.get(req.params.id);
  if (!o) return res.status(404).json({ error: "NOT_FOUND" });
  const updated = { ...o, status: "preparing", updatedAt: new Date().toISOString() };
  orders.set(req.params.id, updated);
  return res.json(updated);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${PORT}`);
});

