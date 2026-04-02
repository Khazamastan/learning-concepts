export default function CdnEdge() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">CDNs & Edge Delivery</h2>
      <p className="text-sm text-slate-300">
        Understand how edge networks cache content close to users, handle TLS termination, and provide programmable compute at the
        edge. Pair this overview with the Node demo under <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">cdn-edge-delivery/</code>
        to experiment with surrogate keys, cache-control headers, and latency measurement.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
        <li>Run `npm run start:cdn` to spin up the illustrative CDN simulator.</li>
        <li>Inspect the response headers (`cache-control`, `surrogate-control`, `cf-cache-status`) with your browser devtools.</li>
        <li>Modify the example to add a geo-specific edge function or try prefetching assets from the CDN.</li>
      </ol>
      <p className="text-xs text-slate-500">
        Recommended reading: Fastly&apos;s Edge Dictionary, Cloudflare Workers docs, Akamai Ion architecture whitepaper.
      </p>
    </div>
  );
}
