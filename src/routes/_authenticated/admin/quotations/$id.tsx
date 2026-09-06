import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { AdminPage, EmptyState, adminBtn } from "@/lib/admin-ui";
import { leadQuery, quotationQuery } from "@/lib/admin-queries";
import { QuotationEditor, draftFromQuotation } from "@/lib/quotation-editor";

export const Route = createFileRoute("/_authenticated/admin/quotations/$id")({
  component: EditQuotationPage,
});

function EditQuotationPage() {
  const { id } = Route.useParams();
  const quotation = useQuery(quotationQuery(id));
  const leadId = quotation.data?.inquiry_id ?? null;
  const lead = useQuery({ ...leadQuery(leadId ?? ""), enabled: !!leadId });
  const initial = useMemo(() => (quotation.data ? draftFromQuotation(quotation.data) : null), [quotation.data]);

  if (quotation.isLoading || (leadId && lead.isLoading)) {
    return (
      <AdminPage title={<span className="text-forest/30">Loading…</span>}>
        <div className="h-40 bg-forest/5 animate-pulse" />
      </AdminPage>
    );
  }

  if (!quotation.data || !initial) {
    return (
      <AdminPage title="Quotation not found">
        <EmptyState
          title="This quotation no longer exists."
          action={
            <Link to="/admin/quotations" search={{}} className={adminBtn.outline}>
              Back to quotations
            </Link>
          }
        />
      </AdminPage>
    );
  }

  return (
    <QuotationEditor
      key={quotation.data.updated_at}
      mode="edit"
      quotation={quotation.data}
      initial={initial}
      lead={lead.data ?? null}
    />
  );
}
