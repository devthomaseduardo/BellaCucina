import React from "react";
import { Button } from "@/components/ui/button";
import DateTimePicker from "./DateTimePicker";
import ReservationForm from "./ReservationForm";
import { supabase } from "@/lib/supabase";
import { motion, useReducedMotion } from "framer-motion";

interface ReservationSectionProps {
  restaurantName?: string;
  restaurantImage?: string;
  title?: string;
  description?: string;
}

const ReservationSection = ({
  restaurantName = "Bella Cucina",
  restaurantImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  title = "Reservas",
  description = "Escolha data e horário, preencha seus dados e confirme em poucos passos.",
}: ReservationSectionProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = React.useState(1);
  const [confirmation, setConfirmation] = React.useState<{
    name?: string;
    partySize?: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<{
    id: string;
    time: string;
    available: boolean;
  } | null>(null);

  const handleDateTimeSelect = (
    date: Date | undefined,
    timeSlot: { id: string; time: string; available: boolean } | null,
  ) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      // Create a valid ISO datetime from date + time
      let datetimeIso = new Date().toISOString();
      if (selectedDate && selectedTimeSlot?.time) {
        const dateStr = selectedDate.toISOString().split("T")[0];
        const timeParts = selectedTimeSlot.time.match(/(\d+):(\d+)\s+(AM|PM)/);
        if (timeParts) {
          let hours = parseInt(timeParts[1]);
          const minutes = timeParts[2];
          if (timeParts[3] === "PM" && hours < 12) hours += 12;
          if (timeParts[3] === "AM" && hours === 12) hours = 0;
          const timeStr = `${hours.toString().padStart(2, '0')}:${minutes}:00`;
          datetimeIso = new Date(`${dateStr}T${timeStr}`).toISOString();
        }
      }

      await supabase.from('reservations').insert({
        customer_name: String(values.name || ""),
        customer_email: String(values.email || ""),
        customer_phone: String(values.phone || ""),
        party_size: Number(values.partySize || 2),
        datetime_iso: datetimeIso,
        special_requests: String(values.specialRequests || ""),
        status: 'confirmed'
      });
      
      setConfirmation({
        name: typeof values.name === "string" ? values.name : undefined,
        partySize:
          typeof values.partySize === "string" ? values.partySize : undefined,
      });
      setStep(3);
    } catch (e) {
      console.error("Failed to create reservation", e);
      alert("Houve um erro ao criar a reserva. Tente novamente.");
    }
  };

  return (
    <section id="reservations" className="relative scroll-mt-24 overflow-hidden bg-muted/25 py-16 md:py-24">
      <div className="absolute inset-0 bella-grid-bg opacity-20" aria-hidden />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 1, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:col-span-5"
          >
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Reservas
            </p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
            <div className="relative mt-8 h-72 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_-56px_rgba(0,0,0,0.9)] md:h-[32rem]">
              <img
                src={restaurantImage}
                alt={restaurantName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/86 via-black/20 to-transparent p-6">
                <div className="text-white">
                  <h3 className="font-display text-3xl">{restaurantName}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/[0.78]">
                    Cozinha italiana, salão elegante e pedidos digitais sem fila.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/[0.78]">
                    <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 backdrop-blur">
                      Jantar
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 backdrop-blur">
                      Eventos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 1, scale: 0.98 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 text-card-foreground shadow-[0_24px_90px_-56px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6 lg:col-span-7"
          >
            {/* Stepper */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] leading-tight text-muted-foreground sm:text-xs">
                <span className={`min-w-0 rounded-full border px-2 py-2 ${step >= 1 ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.03]"}`}>
                  Data e horário
                </span>
                <span className={`min-w-0 rounded-full border px-2 py-2 ${step >= 2 ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.03]"}`}>
                  Seus dados
                </span>
                <span className={`min-w-0 rounded-full border px-2 py-2 ${step >= 3 ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.03]"}`}>
                  Confirmação
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all"
                  style={{
                    width:
                      step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                  }}
                />
              </div>
            </div>

            {step === 1 ? (
              <>
                <h3 className="mb-6 pr-12 text-center text-xl font-semibold sm:pr-0">
                  Selecione data e horário
                </h3>
                <DateTimePicker
                  onDateTimeSelect={handleDateTimeSelect}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                />
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleContinue}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className="w-full rounded-full md:w-auto"
                  >
                    Continuar
                  </Button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="mb-6 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <Button variant="ghost" onClick={handleBack} className="w-fit shrink-0 rounded-full">
                    Voltar
                  </Button>
                  <h3 className="min-w-0 text-lg font-semibold sm:text-xl">
                    Complete sua reserva
                  </h3>
                </div>
                <ReservationForm
                  onSubmit={handleSubmit}
                  selectedDate={selectedDate}
                  selectedTime={selectedTimeSlot?.time}
                />
              </>
            ) : (
              <div className="py-6 text-center">
                <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-primary/25 bg-primary/10 font-display text-xl text-primary">
                  OK
                </span>
                <h3 className="font-display text-3xl text-foreground">
                  Reserva confirmada
                </h3>
                <p className="text-muted-foreground mt-2">
                  {confirmation?.name ? `${confirmation.name}, ` : ""}
                  sua reserva foi registrada.
                </p>
                {selectedDate && selectedTimeSlot?.time && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm">
                    <p className="font-medium">Detalhes</p>
                    <p className="text-muted-foreground mt-1">
                      {selectedDate.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      às {selectedTimeSlot.time}
                    </p>
                    {confirmation?.partySize && (
                      <p className="text-muted-foreground">
                        Pessoas: {confirmation.partySize}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    className="rounded-full"
                    onClick={() => {
                      setStep(1);
                      setSelectedDate(undefined);
                      setSelectedTimeSlot(null);
                      setConfirmation(null);
                    }}
                  >
                    Fazer nova reserva
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    onClick={() => {
                      document
                        .getElementById("menu")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Ver cardápio
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
