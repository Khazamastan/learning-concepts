import * as React from "react";

const PRODUCTS = [
  {
    id: "p-1",
    name: "Lumen Hoodie",
    category: "Apparel",
    price: 68,
    rating: 4.6,
    tags: ["organic", "winter"],
    image: "https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p-2",
    name: "Trail Runner",
    category: "Footwear",
    price: 120,
    rating: 4.8,
    tags: ["new", "bestseller"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p-3",
    name: "Atlas Backpack",
    category: "Accessories",
    price: 98,
    rating: 4.2,
    tags: ["carry-on"],
    image: "https://images.unsplash.com/photo-1518544889280-340e9c05b19c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p-4",
    name: "Everyday Tee",
    category: "Apparel",
    price: 32,
    rating: 4.0,
    tags: ["cotton"],
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p-5",
    name: "Studio Bottle",
    category: "Accessories",
    price: 24,
    rating: 4.7,
    tags: ["hydration", "bestseller"],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p-6",
    name: "Velocity Sneaker",
    category: "Footwear",
    price: 150,
    rating: 4.9,
    tags: ["premium"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((item) => item.category)))];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating" },
];

function filterProducts({ search, category, tags }) {
  const normalized = search.trim().toLowerCase();
  return PRODUCTS.filter((product) => {
    const matchesSearch = normalized
      ? product.name.toLowerCase().includes(normalized) || product.tags.some((tag) => tag.includes(normalized))
      : true;
    const matchesCategory = category === "All" || product.category === category;
    const matchesTags = tags.length === 0 || tags.every((tag) => product.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });
}

function sortProducts(products, sortKey) {
  const sorted = [...products];
  switch (sortKey) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      sorted.sort((a, b) => a.id.localeCompare(b.id));
  }
  return sorted;
}

export function ProductPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [sort, setSort] = React.useState("featured");
  const [activeTags, setActiveTags] = React.useState([]);

  const base = React.useMemo(() => filterProducts({ search, category, tags: activeTags }), [search, category, activeTags]);
  const products = React.useMemo(() => sortProducts(base, sort), [base, sort]);

  const tags = React.useMemo(() => Array.from(new Set(PRODUCTS.flatMap((product) => product.tags))).sort(), []);

  const toggleTag = (tag) => {
    setActiveTags((state) => (state.includes(tag) ? state.filter((item) => item !== tag) : [...state, tag]));
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Spring Collection</p>
          <h1>Curated gear built for movement</h1>
          <p>Browse apparel, footwear, and accessories crafted to keep you comfortable from first light to deep night.</p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </header>
      <aside className="filters">
        <FilterGroup label="Category">
          <div className="pill-row">
            {CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                className={option === category ? "pill pill--active" : "pill"}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </FilterGroup>
        <FilterGroup label="Tags">
          <div className="pill-row">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={activeTags.includes(tag) ? "pill pill--active" : "pill"}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </FilterGroup>
        <FilterGroup label="Sort by">
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FilterGroup>
      </aside>
      <section className="grid" aria-live="polite">
        {products.length === 0 ? (
          <div className="empty">No products match your filters.</div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </section>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <span className="sr-only">Search products</span>
      <input
        type="search"
        placeholder="Search products, tags, collections..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function FilterGroup({ label, children }) {
  return (
    <fieldset className="filter-group">
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="card-category">{product.category}</span>
      </div>
      <div className="card-body">
        <h2>{product.name}</h2>
        <p className="card-tags">{product.tags.map((tag) => `#${tag}`).join("  ")}</p>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="rating" aria-label={`Rating ${product.rating} out of 5`}>
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
        <button type="button" className="add-button">
          Add to bag
        </button>
      </div>
    </article>
  );
}
