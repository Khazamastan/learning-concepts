import PropTypes from "prop-types";

const ITEMS = ["Asia Explorer", "Europe Express", "Americas Adventure"];

export default function CatalogRemote({ category }) {
  return (
    <section>
      <h4 style={{ marginBottom: 8 }}>{category}</h4>
      <ul>
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

CatalogRemote.propTypes = {
  category: PropTypes.string.isRequired,
};
