export type OrderQrPayloadV1 = {
  v: 1;
  type: "order-approval";
  orderId: string;
  createdAt: string;
};

export type OrderQrPayloadV2 = {
  v: 2;
  type: "order-approval";
  order: {
    id: string;
    tableNumber: string;
    customerName: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
      category: string;
      notes?: string;
    }>;
    totalPrice: number;
    createdAt: string;
  };
};

export type OrderQrPayload = OrderQrPayloadV1 | OrderQrPayloadV2;

const PREFIX = "bella-cucina:";

function base64UrlEncode(input: string) {
  // btoa expects latin1; payload is ASCII-safe JSON here.
  const b64 = btoa(input);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlDecode(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return atob(b64 + pad);
}

export function encodeOrderApprovalQr(payload: OrderQrPayload) {
  return `${PREFIX}${base64UrlEncode(JSON.stringify(payload))}`;
}

export function decodeOrderApprovalQr(raw: string): OrderQrPayload | null {
  if (!raw?.startsWith(PREFIX)) return null;
  try {
    const json = base64UrlDecode(raw.slice(PREFIX.length));
    const parsed = JSON.parse(json) as OrderQrPayload;
    if (!parsed || parsed.type !== "order-approval") return null;
    if (parsed.v === 1) {
      if (
        typeof parsed.orderId === "string" &&
        typeof parsed.createdAt === "string"
      ) {
        return parsed;
      }
      return null;
    }
    if (parsed.v === 2) {
      const o = parsed.order;
      if (
        o &&
        typeof o.id === "string" &&
        typeof o.tableNumber === "string" &&
        typeof o.customerName === "string" &&
        Array.isArray(o.items) &&
        typeof o.totalPrice === "number" &&
        typeof o.createdAt === "string"
      ) {
        return parsed;
      }
      return null;
    }
  } catch {
    // ignore
  }
  return null;
}

