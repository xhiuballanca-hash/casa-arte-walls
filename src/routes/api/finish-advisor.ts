import { createFileRoute } from "@tanstack/react-router";
import { handleFinishAdvisor } from "@/lib/finish-advisor.server";

export const Route = createFileRoute("/api/finish-advisor")({
  server: { handlers: { POST: ({ request }) => handleFinishAdvisor(request) } },
});
