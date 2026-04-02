# Banking Transaction Dispute UI

## Overview
Secure customer portal enabling users to dispute transactions, track resolution status, and communicate with support teams.

## General Requirements
- Meet FFIEC and PCI compliance with secure session handling, logging, and data masking.
- Provide guided dispute workflow that finishes within five steps for typical cases.
- Surface status updates in near real-time with integration to case management systems.
- Offer accessibility and multilingual support for diverse customer demographics.

## Functional Requirements
- Transaction list with filters, search, and dispute eligibility indicators.
- Dispute wizard collecting issue details, evidence uploads, and regulatory attestations.
- Timeline view showing case milestones, expected resolution date, and communications.
- Secure messaging between customer and dispute specialists with attachments.
- Notifications center summarizing updates, required actions, and decisions.

## Component Architecture
- `DisputeShell` coordinates transaction selection, wizard flow, and status panels.
- `TransactionTable` renders masked card numbers, virtualization, and eligibility flags.
- `DisputeWizard` guides users through reason selection, questionnaires, and evidence upload.
- `CaseTimeline` visualizes milestones, SLA checkpoints, and expected dates.
- `SecureMessages` handles encrypted threads with attachment previews.

## Data Entries
- Transaction: `id`, postedAt, amount, merchant, category, maskedCard, status.
- DisputeCase: `id`, transactionId, status, openedAt, reasonCode, slaDueAt.
- Evidence: `id`, caseId, fileName, storageUrl, checksum, uploadedAt.
- Message: `id`, caseId, senderRole, body, attachments[], sentAt, readAt.
- Notification: `id`, caseId, type, createdAt, readAt.

## API Design
- `GET /transactions?range&status` returns paginated transactions with dispute eligibility.
- `POST /transactions/{id}/disputes` initiates case with reason and initial evidence.
- `GET /disputes/{id}` returns case details, timeline entries, and outstanding tasks.
- `POST /disputes/{id}/messages` sends secure messages; `GET /disputes/{id}/messages` paginates history.
- `POST /disputes/{id}/evidence` uploads files via signed URLs.

## Store Design
- Redux Toolkit slices for transactions, disputes, messages, and notifications.
- React Query caches transaction lists with filters and background refresh for active cases.
- Memoized selectors provide summaries (e.g., disputes by status, upcoming deadlines).
- Persist wizard progress and draft responses in encrypted session storage.

## Optimisation
- Prefetch dispute eligibility data when user hovers transactions.
- Use chunked uploads for evidence files with retry and checksum validation.
- Lazy-load messaging history and evidence previews when case is opened.
- Defer analytics scripts until dispute submission to minimize initial load.

## Accessibility
- Provide clear focus states, keyboard navigation, and descriptive labels for forms.
- Offer text alternatives for masked card details and status icons.
- Support screen reader announcements for case status changes and deadlines.
- Ensure wizard steps expose progress indicators and allow easy review/edit.

## Frontend Folder Structure
```
src/
  app/
    routes/
      transactions/
      disputes/
      notifications/
    providers/
      auth-provider.tsx
      audit-provider.tsx
  components/
    transactions/
    disputes/
    messages/
    timeline/
    shared/
  hooks/
    use-dispute-wizard.ts
    use-notification-center.ts
  services/
    api/
    auth/
    storage/
  store/
    slices/
      transactions.ts
      disputes.ts
      messages.ts
      notifications.ts
    selectors/
  styles/
    theme.css
    forms.css
  utils/
    formatting.ts
    compliance.ts
  workers/
    evidence-upload-worker.ts
    timeline-worker.ts
```

## Pseudocode Flow
```pseudo
function loadTransactions(filters):
    response = fetch('/transactions', filters)
    dispatch(setTransactions(response.transactions))

function startDispute(transactionId, payload):
    response = post(`/transactions/${transactionId}/disputes`, payload)
    if response.ok:
        dispatch(addDispute(response.dispute))
        navigateToCase(response.dispute.id)

function uploadEvidence(caseId, file):
    signed = getSignedUploadUrl(file)
    uploadFile(signed.url, file)
    post(`/disputes/${caseId}/evidence`, { fileName: file.name, checksum: hash(file) })
```

## Component Interaction Diagram
```mermaid
graph TD
    Customer --> DisputeShell
    DisputeShell --> TransactionTable
    DisputeShell --> DisputeWizard
    DisputeShell --> CaseTimeline
    DisputeShell --> SecureMessages
    TransactionTable --> TransactionsAPI[(GET /transactions)]
    DisputeWizard --> DisputesAPI[(POST /transactions/{id}/disputes)]
    CaseTimeline --> DisputesAPI
    SecureMessages --> MessagesAPI[(POST/GET /disputes/{id}/messages)]
    DisputeShell --> NotificationsAPI[(Notifications API)]
```
