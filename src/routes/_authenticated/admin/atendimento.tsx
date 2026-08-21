import { createFileRoute } from "@tanstack/react-router";
import { AtendimentoPage } from "@/components/atendimento/AtendimentoPage";

export const Route = createFileRoute("/_authenticated/admin/atendimento")({
  component: AdminAtendimento,
  head: () => ({ meta: [{ title: "Atendimento — Tabgha Admin" }] }),
});

function AdminAtendimento() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-6">
      <div>
        <span className="eyebrow-pill">Operação</span>
        <h1 className="mt-2 text-xl font-bold tracking-tight">Atendimento WhatsApp</h1>
      </div>
      <AtendimentoPage isAdmin />
    </div>
  );
}
