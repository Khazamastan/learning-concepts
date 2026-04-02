# Knowledge Base Authoring Tool

## Overview
Collaborative documentation platform enabling teams to draft, review, and publish knowledge base content with structured workflows.

## General Requirements
- Support concurrent editing with version history, conflict resolution, and inline suggestions.
- Provide extensible schema for structured metadata, taxonomy, and localization variants.
- Offer review workflows with approval gates, quality checks, and scheduled publish windows.
- Integrate analytics for content performance, broken link detection, and search insights.

## Functional Requirements
- WYSIWYG/Markdown hybrid editor with component insertions (alerts, code blocks, callouts).
- Sidebar for metadata (tags, audience, product version) and reusable article templates.
- Commenting and review threads with assignment, mentions, and resolution state.
- Preview mode with multiple devices/locales and accessibility checks.
- Publishing dashboard for scheduling, rollback, and change-log generation.

## Component Architecture
- `AuthoringShell` coordinates editor, sidebar, comments panel, and preview pane.
- `DocumentEditor` supports collaborative editing backed by CRDT/OT layer.
- `MetadataPanel` manages taxonomy selections, validation, and template application.
- `ReviewSidebar` lists comments, tasks, and status with filters.
- `PublishingConsole` surfaces scheduling, diff review, and rollout controls.

## Data Entries
- Article: `id`, slug, title, body, locale, status, version, metadata.
- Revision: `id`, articleId, authorId, diff, createdAt, changeSummary.
- Comment: `id`, articleId, selectionRange, authorId, body, resolved, createdAt.
- Template: `id`, name, structure, defaultMetadata, requiredSections.
- Checklist: `id`, articleId, item, status, reviewerId.

## API Design
- `GET /articles/{id}` returns article content, metadata, and latest revision refs.
- `WS /articles/{id}/collab` syncs CRDT operations, cursors, and presence updates.
- `POST /articles/{id}/revisions` commits draft revision with validation checks.
- `POST /articles/{id}/comments` creates comments; `PATCH /comments/{id}` updates resolution.
- `POST /articles/{id}/publish` schedules or executes publication with approvals.

## Store Design
- Recoil atoms/selectors manage editor state, selection, and comment filters.
- React Query caches article metadata, templates, and analytics reports.
- Derived selectors compute completion progress, outstanding checklist items, and review state.
- Persist editor preferences (theme, key bindings) locally per user.

## Optimisation
- Offload heavy diff generation, link checking, and linter rules to Web Workers.
- Lazy-load preview frame assets and localization bundles as needed.
- Batch CRDT operations before applying to editor to minimize rerenders.
- Prefetch related articles for link recommendations while authoring.

## Accessibility
- Provide semantic toolbar controls with ARIA attributes and keyboard shortcuts.
- Expose accessible preview with violations report and fix suggestions.
- Ensure comments panel is navigable via keyboard and screen readers.
- Support high-contrast editor theme and adjustable font sizes.

## Frontend Folder Structure
```
src/
  app/
    routes/
      editor/
      review/
      publish/
    providers/
      collab-provider.tsx
      analytics-provider.tsx
  components/
    editor/
    metadata/
    comments/
    preview/
    publishing/
    shared/
  hooks/
    use-collab-document.ts
    use-checklist-progress.ts
  services/
    api/
    collab/
    analytics/
  store/
    recoil/
    query/
  styles/
    editor.css
    layout.css
  utils/
    markdown.ts
    accessibility.ts
  workers/
    diff-worker.ts
    link-checker-worker.ts
```

## Pseudocode Flow
```pseudo
function loadArticle(articleId):
    article = fetch(`/articles/${articleId}`)
    initCollabSession(articleId)
    setEditorState(article.body)
    setMetadata(article.metadata)

function saveRevision(articleId, draft):
    payload = validateDraft(draft)
    response = post(`/articles/${articleId}/revisions`, payload)
    if response.ok:
        notifySuccess('Draft saved')
        updateRevisionList(response.revision)

function publishArticle(articleId, options):
    checklist = getChecklistStatus(articleId)
    if not checklist.isComplete:
        return showChecklistBlocker(checklist)
    response = post(`/articles/${articleId}/publish`, options)
    if response.ok:
        notifySuccess('Article scheduled')
```

## Component Interaction Diagram
```mermaid
graph TD
    Author --> AuthoringShell
    AuthoringShell --> DocumentEditor
    AuthoringShell --> MetadataPanel
    AuthoringShell --> ReviewSidebar
    AuthoringShell --> PublishingConsole
    DocumentEditor --> CollabWS[(WS /articles/{id}/collab)]
    MetadataPanel --> TemplatesAPI[(Templates API)]
    ReviewSidebar --> CommentsAPI[(Comments API)]
    PublishingConsole --> PublishAPI[(Publish API)]
    AuthoringShell --> AnalyticsService[(Analytics)]
```
