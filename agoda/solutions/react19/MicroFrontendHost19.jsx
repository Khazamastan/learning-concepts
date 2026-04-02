import { Suspense, use } from "react";

const DEFAULT_MANIFEST = Promise.resolve({
  header: async () => {
    const { default: Header } = await import("./fixtures/HeaderRemote.jsx");
    return Header;
  },
  catalog: async () => {
    const { default: Catalog } = await import("./fixtures/CatalogRemote.jsx");
    return Catalog;
  },
});

function RemoteSlot({ loaderPromise, fallback = null, props }) {
  const Component = use(loaderPromise);
  return <Component {...props} />;
}

export default function MicroFrontendHost19({ manifestPromise = DEFAULT_MANIFEST }) {
  const manifest = use(manifestPromise);

  return (
    <section>
      <h2>Micro-Frontend Host (React 19)</h2>
      <Suspense fallback={<p>Loading header…</p>}>
        <RemoteSlot loaderPromise={manifest.header()} props={{ team: "Flight Ops" }} />
      </Suspense>
      <Suspense fallback={<p>Loading catalog…</p>}>
        <RemoteSlot loaderPromise={manifest.catalog()} props={{ category: "Destinations" }} />
      </Suspense>
    </section>
  );
}
