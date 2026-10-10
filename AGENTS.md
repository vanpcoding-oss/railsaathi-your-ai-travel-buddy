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

## Application architecture
- Use distinct TanStack leaf routes for RailSaathi’s screens and a shared rail shell, so navigation and page metadata remain independently addressable.
- Keep in-progress journeys in shared session state and AI processing in server-only modules, so private credentials never reach the browser.
- Label supplied timetable and station map content as illustrative until a verified railway service is connected.
