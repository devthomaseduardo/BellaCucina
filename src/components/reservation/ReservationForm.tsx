import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Informe um nome com pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Informe um e-mail válido.",
  }),
  phone: z.string().min(10, {
    message: "Informe um telefone válido.",
  }),
  partySize: z.string().min(1, {
    message: "Informe o número de pessoas.",
  }),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof formSchema>;

interface ReservationFormProps {
  onSubmit?: (values: ReservationFormValues) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

const ReservationForm = ({
  onSubmit,
  selectedDate = new Date(),
  selectedTime = "7:00 PM",
}: ReservationFormProps) => {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      partySize: "2",
      specialRequests: "",
    },
  });

  const handleSubmit = (values: ReservationFormValues) => {
    onSubmit?.(values);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
      <h3 className="mb-4 text-center text-xl font-semibold">
        Complete sua reserva
      </h3>

      {selectedDate && selectedTime && (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/10 p-3 text-center">
          <p className="text-sm font-medium text-primary">Data e horário escolhidos:</p>
          <p className="text-base">
            {selectedDate.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            , {selectedTime}
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="partySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de pessoas</FormLabel>
                <FormControl>
                    <Input
                      placeholder="2"
                      {...field}
                      type="number"
                      min="1"
                      className="rounded-full border-white/10 bg-white/[0.04]"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    {...field}
                    className="rounded-full border-white/10 bg-white/[0.04]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                    <Input
                      placeholder="(11) 99999-9999"
                      {...field}
                      className="rounded-full border-white/10 bg-white/[0.04]"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      {...field}
                      type="email"
                      className="rounded-full border-white/10 bg-white/[0.04]"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                    <Textarea
                      placeholder="Restrições alimentares, ocasião especial ou preferência de mesa."
                      className="min-h-[96px] resize-none rounded-2xl border-white/10 bg-white/[0.04]"
                      {...field}
                    />
                </FormControl>
                <FormDescription>
                  A equipe confirma os detalhes no atendimento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6 w-full rounded-full">
            Confirmar reserva
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReservationForm;
