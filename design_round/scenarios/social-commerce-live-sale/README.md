# Social Commerce Live Sale

## Overview
Live shopping experience combining streaming video, real-time chat, and shoppable product pins optimized for viral traffic spikes.

## General Requirements
- Handle sudden traffic spikes (>200k concurrent viewers) with sub-second latency for video and chat.
- Support dynamic product inventory updates with synchronized pricing and availability.
- Provide secure checkout handoff to payment gateway with minimal context switching.
- Instrument analytics for conversion funnel, engagement, and influencer attribution.

## Functional Requirements
- Live video player with low-latency streaming and adaptive bitrate.
- Chat sidebar with moderation tools, emoji reactions, and pinned announcements.
- Product carousel with real-time inventory badges, variants, and add-to-cart actions.
- Flash deal timers, giveaways, and poll widgets integrated into stream overlay.
- Post-show recap page summarizing sold-out items, highlights, and follow-up CTAs.

## Component Architecture
- `LiveSaleShell` coordinates stream layout, chat, product rail, and overlays.
- `VideoPlayer` integrates HLS/LL-DASH playback with ad insertion hooks.
- `ChatPanel` virtualizes messages, supports moderation commands, and emoji reactions.
- `ProductRail` displays shoppable cards, variant selectors, and inventory status.
- `OverlayManager` handles polls, timers, giveaways, and dynamic callouts.

## Data Entries
- Product: `id`, name, price, currency, inventory, variants[], mediaUrls.
- LiveEvent: `id`, hostId, startTime, streamingUrl, agenda, sponsor.
- ChatMessage: `id`, userId, body, type, createdAt, moderationStatus.
- Giveaway: `id`, eligibilityRules, reward, entriesCount, winnerId.
- AnalyticsEvent: `id`, type, payload, timestamp.

## API Design
- `GET /live-events/{id}` returns event metadata, host info, and product lineup.
- `WS /live-events/{id}/stream` distributes chat, overlay signals, and product updates.
- `POST /cart/add` adds product variants with inventory verification.
- `POST /giveaways/{id}/enter` registers participant entries with validation.
- `POST /analytics/event` records engagement and conversion events.

## Store Design
- Use Zustand or Jotai for lightweight state (chat, overlays) with React Query for server cache.
- Normalized product state enabling quick inventory updates and price adjustments.
- Derived selectors compute cart totals, limited-time offers, and featured pins.
- Persist cart and watchlist to session storage for continuity after stream.

## Optimisation
- Employ CDN edge caching and LL-HLS for low-latency video; preconnect to streaming origin.
- Batch chat updates and apply diffing before rendering to avoid flood rerenders.
- Prefetch product images and variants during idle time; lazy-load heavy components (polls, AR viewer).
- Use Web Workers for stream overlay scheduling and giveaway eligibility checks.

## Accessibility
- Provide captions/subtitles for live video and transcripts for recorded segments.
- Ensure chat component supports keyboard navigation, skip-to-latest, and screen reader cues.
- Offer alt text for product images and announce flash deals via polite live regions.
- Maintain color contrast for overlays and support reduced motion for animated callouts.

## Frontend Folder Structure
```
src/
  app/
    routes/
      live/
      recap/
    providers/
      stream-provider.tsx
      cart-provider.tsx
  components/
    video/
    chat/
    products/
    overlays/
    shared/
  hooks/
    use-chat-channel.ts
    use-overlay-events.ts
  services/
    api/
    websocket/
    analytics/
  store/
    zustand/
      live-store.ts
      cart-store.ts
    query/
  styles/
    video.css
    chat.css
    overlays.css
  utils/
    formatting.ts
    accessibility.ts
  workers/
    overlay-worker.ts
    giveaway-worker.ts
```

## Pseudocode Flow
```pseudo
function startLiveEvent(eventId):
    event = fetch(`/live-events/${eventId}`)
    dispatch(setEvent(event))
    openStreamChannels(eventId)

function openStreamChannels(eventId):
    socket = openWebSocket(`/live-events/${eventId}/stream`)
    socket.onmessage = event => handleStreamEvent(event)

function handleStreamEvent(event):
    switch event.type:
        case 'chat.message':
            chatStore.append(event.payload)
        case 'product.update':
            productStore.updateInventory(event.payload)
        case 'overlay.show':
            overlayStore.show(event.payload)

function addToCart(productId, variantId):
    response = post('/cart/add', { productId, variantId })
    if response.ok:
        cartStore.add(response.item)
    else:
        showInventoryError(response.error)
```

## Component Interaction Diagram
```mermaid
graph TD
    Viewer --> LiveSaleShell
    LiveSaleShell --> VideoPlayer
    LiveSaleShell --> ChatPanel
    LiveSaleShell --> ProductRail
    LiveSaleShell --> OverlayManager
    ChatPanel --> StreamWS[(WS /live-events/{id}/stream)]
    ProductRail --> ProductsStore[(Product State)]
    OverlayManager --> OverlayStore[(Overlay State)]
    ProductRail --> CartAPI[(POST /cart/add)]
    LiveSaleShell --> AnalyticsAPI[(POST /analytics/event)]
```
