# Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)

| Concern | CSR | SSR |
| --- | --- | --- |
| First paint | Requires JS bundle download, often slower without optimizations | Server returns ready HTML, faster FCP when cacheable |
| Interactivity | Hydrates in browser once bundle executes | Already interactive on arrival, but still hydrates for event handlers |
| SEO | Extra configuration (prerender, dynamic rendering) for bots | Bots receive content immediately |
| Caching | CDN caches static assets; data fetched at runtime | Edge caches HTML per route (consider user personalization) |
| Complexity | Simpler hosting, no server runtime | Requires Node/server infra, streaming/edge SSR adds complexity |

## Choosing a Strategy
- **Prefer SSR** for marketing, editorial, or geo-sensitive pages where first impression and SEO matter.
- **Prefer CSR** for dashboards, admin tools, or highly personalized apps where user-specific data dominates.
- **Hybrid** frameworks (Next.js, Remix, Nuxt) let you mix CSR, SSR, and SSG per route.

## Example Code
```jsx
// Next.js page using SSR
type Props = { posts: Post[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await fetchPosts();
  return { props: { posts } };
};

export default function Blog({ posts }: Props) {
  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </main>
  );
}
```
```jsx
// React CSR with Suspense + fetch
type Props = { userId: string };

export default function Dashboard({ userId }: Props) {
  const data = useDashboardData(userId); // fetches in useEffect or React Query
  return <WidgetGrid data={data} />;
}
```
