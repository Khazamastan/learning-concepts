import { useMemo, useState } from 'react';
import './styles.css';

const NAVIGATION = [
  {
    id: 'overview',
    title: 'Space Overview',
    children: [
      { id: 'roadmap', title: 'Roadmap', children: [] },
      { id: 'updates', title: 'Changelog', children: [] }
    ]
  },
  {
    id: 'team',
    title: 'Team Handbook',
    children: [
      { id: 'values', title: 'Values', children: [] },
      {
        id: 'rituals',
        title: 'Team Rituals',
        children: [
          { id: 'standups', title: 'Daily Stand-up', children: [] },
          { id: 'retro', title: 'Sprint Retro', children: [] }
        ]
      },
      { id: 'contact', title: 'Contact List', children: [] }
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    children: [
      { id: 'aurora', title: 'Project Aurora', children: [] },
      { id: 'nova', title: 'Project Nova', children: [] }
    ]
  }
];

function flatten(nodes) {
  return nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
}

export default function App() {
  const allNodes = useMemo(() => flatten(NAVIGATION), []);
  const [activeId, setActiveId] = useState(allNodes[0].id);
  const [expanded, setExpanded] = useState(() => new Set(allNodes.map((node) => node.id)));

  const toggleNode = (id) => {
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.id);

    return (
      <div key={node.id} className="sidebar-node" style={{ marginLeft: depth * 14 }}>
        <button
          type="button"
          className={`sidebar-node__trigger ${activeId === node.id ? 'is-active' : ''}`}
          onClick={() => {
            setActiveId(node.id);
            if (hasChildren) {
              toggleNode(node.id);
            }
          }}
        >
          {hasChildren && (
            <span className={`sidebar-node__chevron ${isExpanded ? 'is-open' : ''}`}>▸</span>
          )}
          <span>{node.title}</span>
        </button>
        {hasChildren && isExpanded && (
          <div className="sidebar-node__children">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const activeNode = allNodes.find((node) => node.id === activeId);

  return (
    <main className="sidebar-layout">
      <nav className="sidebar">
        <div className="sidebar__header">
          <h1>Product Space</h1>
          <p>Browse documentation and team practices.</p>
        </div>
        <div className="sidebar__tree">
          {NAVIGATION.map((node) => renderNode(node))}
        </div>
      </nav>
      <section className="sidebar-content">
        <h2>{activeNode?.title}</h2>
        <p>
          This is a placeholder panel. Use the navigation tree to explore different
          documents in this simulated Confluence-style sidebar.
        </p>
      </section>
    </main>
  );
}
