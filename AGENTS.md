<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public parent routes with child pages must render an `<Outlet />` for child paths while showing their index content only on their exact path; TanStack nests the detail routes under those parents.
- Keep the narrow Vite client-RPC transform in place: the unoptimized TanStack helper otherwise reads `process.env.TSS_SERVER_FN_BASE` in the browser and breaks inquiry-page navigation.
- Translations: wrap public UI text in `useT()`/`t("exact English")` from src/lib/i18n.tsx with entries in src/lib/translations.ts (finishes/articles/meta by slug/path); English is the key so the source copy never drifts.
- Finish Advisor streams plain text from `/api/finish-advisor` (server route, not createServerFn) with an in-band error marker; why: image upload + progressive output need a raw Response stream.
- The home hero uses a text-free edit of the owner's selected Casa D'Arte cover photograph with semantic translated HTML controls; never substitute a material photo, baked-in text, or invisible image hotspots as navigation.
- Site images are real files committed in src/assets and imported directly (no .asset.json CDN pointers); why: the project is prepared for hosting outside Lovable.
