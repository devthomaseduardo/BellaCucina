import { supabase } from "@/lib/supabase";

export type CustomerTableSession = {
  sessionId: string;
  guestId: string;
  tableNumber: string;
  guestName: string;
};

const STORAGE_KEY = "bella:table-session";

export const hasSupabaseConfig = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export function readCustomerTableSession(): CustomerTableSession | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as CustomerTableSession;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearCustomerTableSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

async function ensureAnonymousSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;

  const { data: anonymousData, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  if (!anonymousData.session) throw new Error("Não foi possível iniciar a sessão da mesa.");

  return anonymousData.session;
}

export async function ensureCustomerTableSession(
  tableNumber: string,
  guestName: string,
): Promise<CustomerTableSession | null> {
  if (!hasSupabaseConfig) return null;

  await ensureAnonymousSession();

  const stored = readCustomerTableSession();
  if (
    stored &&
    stored.tableNumber === tableNumber.trim() &&
    stored.guestName.toLocaleLowerCase("pt-BR") === guestName.trim().toLocaleLowerCase("pt-BR")
  ) {
    const { data: activeSession } = await supabase
      .from("table_sessions")
      .select("id,status")
      .eq("id", stored.sessionId)
      .maybeSingle();

    if (activeSession?.status !== "closed") {
      return stored;
    }

    clearCustomerTableSession();
  }

  const { data, error } = await supabase.rpc("join_table_session", {
    p_table_number: tableNumber.trim(),
    p_guest_name: guestName.trim(),
  });

  if (error) throw error;

  const joined = Array.isArray(data) ? data[0] : data;
  if (!joined?.session_id || !joined?.guest_id) {
    throw new Error("Não foi possível identificar a sessão atual da mesa.");
  }

  const session: CustomerTableSession = {
    sessionId: joined.session_id,
    guestId: joined.guest_id,
    tableNumber: joined.table_number ?? tableNumber.trim(),
    guestName: guestName.trim(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}
