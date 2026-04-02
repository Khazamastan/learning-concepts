# REST, GraphQL, gRPC

## Overview
Modern APIs expose services over different paradigms, each optimised for specific client needs.
- **REST** leverages HTTP semantics (verbs, status codes, resources) with representations typically in JSON. It is stateless, cache-friendly, and easy to access from browsers and mobile clients.
- **GraphQL** uses a strongly typed schema and a declarative query language so clients can fetch exactly the shape of data they need in a single round-trip. It supports real-time subscriptions and enforces schema evolution through type safety.
- **gRPC** builds on HTTP/2 and Protocol Buffers to deliver compact, binary-encoded messages. It supports bidirectional streaming and contract-first development, making it ideal for low-latency service-to-service communication.

## Design Trade-offs
- **Coupling**: REST encourages resource-oriented design with multiple endpoints; GraphQL centralises access through a single endpoint; gRPC exposes explicit RPC methods derived from `.proto` definitions.
- **Performance**: REST can over/under-fetch; GraphQL eliminates over-fetching but requires server computation to resolve nested fields; gRPC's binary format and HTTP/2 streams minimise payload size and latency.
- **Tooling**: REST benefits from HTTP ubiquity and caching layers; GraphQL needs schema tooling (Apollo Studio, GraphiQL); gRPC requires code generation but produces strongly typed clients in many languages.

## Real-World Example
A retail platform might expose public product data via REST for compatibility, use GraphQL for the webshop to compose personalised pages in a single request, and rely on gRPC between microservices (e.g., inventory, recommendation engine) for efficient, strongly typed communication.

## Working Example (This Repository)
This folder contains three implementations of the same product catalogue domain:
1. `rest-server.mjs` exposes `/products` and `/products/:id` via Express.
2. `graphql-server.mjs` serves a GraphQL schema with queries `products` and `product(id)` using GraphQL Yoga; open `http://localhost:4000/graphql` for the IDE.
3. `grpc-server.mjs` and `grpc-client.mjs` implement a gRPC service defined in `catalog.proto`. Run the client to make unary and server-streaming calls.

### Run the demos
1. Install dependencies: `npm install`.
2. For REST: `npm run start:api-architectures:rest` (listens on `http://localhost:4001`).
3. For GraphQL: `npm run start:api-architectures:graphql` (listens on `http://localhost:4000/graphql`).
4. For gRPC: in one terminal run `npm run start:api-architectures:grpc-server`, then in another run `npm run start:api-architectures:grpc-client`.

## References
- Fielding, Roy T. — [Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- GraphQL Foundation — [GraphQL Specification](https://spec.graphql.org/October2021/)
- gRPC — [gRPC Concepts](https://grpc.io/docs/what-is-grpc/core-concepts/)
- Netflix Tech Blog — [Optimizing the Netflix API](https://netflixtechblog.com/optimizing-the-netflix-api-5c9ac715cf19)
