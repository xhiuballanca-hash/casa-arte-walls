import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AdminPage } from "@/lib/admin-ui";
import { leadQuery } from "@/lib/admin-queries";
import { QuotationEditor, emptyDraft } from "@/lib/quotation-editor";

type Search = { lead?: string };

export const Route = createFileRoute("/_authenticated/admin/quotations/new")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    lead: typeof raw.lead === "string" && raw.lead ? raw.lead : undefined,
  }),
  component: NewQuotationPage,
});

function NewQuotationPage() {
  const { lead: leadId } = Route.useSearch();
  const lead = useQuery({ ...leadQuery(leadId ?? ""), enabled: !!leadId });
  const initial = useMemo(() => emptyDraft(lead.data ?? null), [lead.data]);

  if (leadId && lead.isLoading) {
    return (
      <AdminPage title={<span className="text-forest/30">Preparing quotation…</span>}>
        <div className="h-40 bg-forest/5 animate-pulse" />
      </AdminPage>
    );
  }

  return <QuotationEditor key={lead.data?.id ?? "blank"} mode="new" initial={initial} lead={lead.data ?? null} />;
}
