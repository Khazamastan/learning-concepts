import { useMemo, useState } from 'react';

const restRequest = ['GET /products/1', 'Accept: application/json'].join('\n');
const restResponse = JSON.stringify({ id: 'p1', name: 'Mechanical Keyboard', price: 129.99 }, null, 2);

const graphqlRequest = [
  'query ProductCard {',
  '  product(id: "p1") {',
  '    id',
  '    name',
  '    price',
  '  }',
  '}'
].join('\n');

const graphqlResponse = JSON.stringify(
  { data: { product: { id: 'p1', name: 'Mechanical Keyboard', price: 129.99 } } },
  null,
  2
);

const grpcRequest = ['message ProductRequest {', '  string id = 1;', '}'].join('\n');
const grpcResponse = ['ProductResponse {', '  id: "p1"', '  name: "Mechanical Keyboard"', '  price: 129.99', '}'].join('\n');

const samples = {
  rest: {
    label: 'REST',
    description: 'Resource endpoints with HTTP verbs. Cacheable GET, human-readable JSON.',
    request: restRequest,
    response: restResponse
  },
  graphql: {
    label: 'GraphQL',
    description: 'Single endpoint, typed schema. Clients declaratively request fields they need.',
    request: graphqlRequest,
    response: graphqlResponse
  },
  grpc: {
    label: 'gRPC',
    description: 'Binary Protobuf messages over HTTP/2 streams. Strongly-typed contracts.',
    request: grpcRequest,
    response: grpcResponse
  }
};

export default function ApiArchitectures() {
  const [active, setActive] = useState('rest');
  const sample = samples[active];
  const note = useMemo(() => {
    switch (active) {
      case 'graphql':
        return 'Try the GraphQL Yoga server at http://localhost:4000/graphql and open the explorer to run this query.';
      case 'grpc':
        return 'Run the gRPC demo (server/client pair) to see streaming responses in the console. Use BloomRPC or grpcurl as GUI tools.';
      default:
        return 'Use curl or your browser against http://localhost:4001/products to see REST responses.';
    }
  }, [active]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">API Styles</h2>
      <div className="flex gap-2">
        {Object.entries(samples).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              key === active ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100' : 'border-white/10 text-slate-300 hover:border-emerald-400/50'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-300">{sample.description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Example Request</h3>
          <pre className="rounded-lg border border-white/10 bg-slate-950/70 p-4 text-xs text-slate-200">
            <code>{sample.request}</code>
          </pre>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Example Response</h3>
          <pre className="rounded-lg border border-white/10 bg-slate-950/70 p-4 text-xs text-slate-200 whitespace-pre-wrap">
            <code>{sample.response}</code>
          </pre>
        </div>
      </div>
      <p className="text-xs text-slate-500">{note}</p>
    </div>
  );
}
