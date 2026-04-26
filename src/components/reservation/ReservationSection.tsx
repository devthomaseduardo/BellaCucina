import React from "react";
import { Button } from "@/components/ui/button";
import DateTimePicker from "./DateTimePicker";
import ReservationForm from "./ReservationForm";

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

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Reservation submitted:", {
      ...values,
      date: selectedDate,
      time: selectedTimeSlot?.time,
    });
    setConfirmation({
      name: typeof values.name === "string" ? values.name : undefined,
      partySize:
        typeof values.partySize === "string" ? values.partySize : undefined,
    });
    setStep(3);
  };

  return (
    <section id="reservations" className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 font-display text-3xl font-semibold text-foreground">
              {title}
            </h2>
            <p className="mb-6 text-muted-foreground">{description}</p>
            <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
              <img
                src={restaurantImage}
                alt={restaurantName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold">{restaurantName}</h3>
                  <p className="text-sm opacity-90">
                    Experience authentic cuisine in an elegant setting
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-lg border border-border/60 bg-card p-6 text-card-foreground shadow-sm md:w-1/2">
            {/* Stepper */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-1 text-center text-[10px] leading-tight text-muted-foreground sm:text-xs">
                <span className={`min-w-0 px-0.5 ${step >= 1 ? "text-foreground" : ""}`}>
                  1. Data & horário
                </span>
                <span className={`min-w-0 px-0.5 ${step >= 2 ? "text-foreground" : ""}`}>
                  2. Seus dados
                </span>
                <span className={`min-w-0 px-0.5 ${step >= 3 ? "text-foreground" : ""}`}>
                  3. Confirmação
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
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
                <h3 className="text-xl font-semibold mb-6 text-center">
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
                    className="w-full md:w-auto"
                  >
                    Continuar
                  </Button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="mb-6 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <Button variant="ghost" onClick={handleBack} className="w-fit shrink-0">
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
                <h3 className="text-2xl font-semibold text-foreground">
                  Reserva confirmada
                </h3>
                <p className="text-muted-foreground mt-2">
                  {confirmation?.name ? `${confirmation.name}, ` : ""}
                  sua reserva foi registrada.
                </p>
                {selectedDate && selectedTimeSlot?.time && (
                  <div className="mt-5 rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
