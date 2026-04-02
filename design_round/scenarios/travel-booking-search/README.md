# Travel Booking Search

## Overview
End-to-end travel search interface for flights and hotels featuring rich filtering, collaborative itineraries, and geospatial exploration.

## General Requirements
- Return initial top-flight and hotel results within 3 seconds using staged loading.
- Support collaborative sessions allowing multiple users to refine the same itinerary in real time.
- Provide high availability with retries, circuit breakers, and caching for supplier API calls.
- Comply with regional pricing, disclosure, and accessibility regulations.

## Functional Requirements
- Multi-city and flexible-date search form with auto-complete suggestions and validation.
- Results pane with sorting, filtering chips, and pinned selections for comparison.
- Map view overlay showing geolocated hotels and airfare routes with clustering.
- Saved itineraries offering shareable links, change tracking, and commenting.
- Price alert subscriptions with configurable thresholds and delivery channels.

## Component Architecture
- `SearchShell` manages query parameters, synchronization context, and layout chrome.
- `SearchForm` handles multi-leg inputs, passenger counts, and fare class selections.
- `ResultsPane` hosts `FlightResults` and `HotelResults` components with virtualization.
- `MapPanel` isolates WebGL map rendering and syncs selection state via event bridge.
- `ItineraryDrawer` surfaces saved trips, collaborator presence, and activity feed.

## Data Entries
- FlightOption: `id`, segments[], fareClass, baggageAllowance, priceBreakdown, score.
- HotelOption: `id`, location, rating, amenities[], cancellationPolicy, priceSummary.
- SearchQuery: origin, destination, dates[], travelers, cabin, filters.
- Itinerary: `id`, ownerId, participants[], selectedFlightId, selectedHotelId, notes.
- Alert: `id`, searchSignature, threshold, frequency, deliveryChannel.

## API Design
- `POST /search` accepts normalized query payload and returns `searchId` for progressive retrieval.
- `GET /search/{id}/results?type=flight|hotel&cursor` streams paginated result sets.
- `POST /itineraries` creates collaborative session; `PATCH /itineraries/{id}` updates selections.
- `WS /itineraries/{id}` broadcasts presence, edits, and chat messages in real time.
- `POST /price-alerts` registers notifications with validation for frequency and threshold.

## Store Design
- Use Redux Toolkit for shared state with slices for search params, results, and itinerary context.
- RTK Query fetches staged results and caches data keyed by `searchId` and filter signatures.
- Map data stored normalized with computed distance metrics for overlays and clustering.
- IndexedDB persistence allows offline draft support and resume of abandoned searches.

## Optimisation
- Virtualize result lists with `react-window` and render skeleton placeholders while fetching.
- Prefetch adjacent date results in the background to power flexible date recommendations.
- Debounce filter updates and batch API requests using scheduler queue to avoid thrash.
- Offload scoring heuristics and geo computations to Web Workers.

## Accessibility
- Ensure form inputs have explicit labels, helper text, and aria-live validation feedback.
- Provide keyboard navigation for map markers, result cards, and drawers with visible focus states.
- Offer textual summaries for map-only information such as distance and neighborhood descriptions.
- Announce collaborator presence and comments politely without interrupting screen readers.

## Frontend Folder Structure
```
src/
  app/
    routes/
      search/
      itinerary/
    providers/
      collaboration-provider.tsx
      search-context.tsx
    loaders/
      search-loader.ts
  components/
    search/
    results/
    map/
    itinerary/
    shared/
  hooks/
    use-search-sync.ts
    use-map-selection.ts
  services/
    api/
    collaboration/
    pricing/
  store/
    slices/
      search-params.ts
      results.ts
      itinerary.ts
    selectors/
  styles/
    layout.css
    forms.css
  utils/
    formatting.ts
    validation.ts
  workers/
    scoring-worker.ts
    map-clustering-worker.ts
```

## Pseudocode Flow
```pseudo
function executeSearch(query):
    normalized = normalizeQuery(query)
    searchId = post('/search', normalized).id
    dispatch(setActiveSearch(searchId))
    streamResults(searchId, 'flight')
    streamResults(searchId, 'hotel')

function streamResults(searchId, type):
    cursor = null
    do:
        response = get(`/search/${searchId}/results`, { type, cursor })
        dispatch(appendResults({ type, items: response.items }))
        cursor = response.nextCursor
    while cursor

function handleCollaborativeEvent(event):
    switch event.type:
        case 'selection.updated':
            dispatch(updateItinerary(event.payload))
        case 'presence.joined':
            showPresenceToast(event.user)
        case 'chat.message':
            dispatch(addChatMessage(event.payload))
```

## Component Interaction Diagram
```mermaid
graph TD
    User --> SearchShell
    SearchShell --> SearchForm
    SearchShell --> ResultsPane
    SearchShell --> MapPanel
    SearchShell --> ItineraryDrawer
    ResultsPane --> ReduxStore[Redux Store]
    MapPanel --> ReduxStore
    ItineraryDrawer --> CollaborationWS[(WS /itineraries/{id})]
    ReduxStore --> SearchAPI[(Search APIs)]
    ReduxStore --> ItineraryAPI[(Itinerary REST APIs)]
    MapPanel --> MapSDK[(Map SDK)]
```
