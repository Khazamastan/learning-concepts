import PropTypes from "prop-types";

export default function HeaderRemote({ team }) {
  return (
    <header style={{ padding: "12px 0" }}>
      <h3 style={{ margin: 0 }}>Micro-Frontend Header</h3>
      <p style={{ margin: 0, color: "#555" }}>Team: {team}</p>
    </header>
  );
}

HeaderRemote.propTypes = {
  team: PropTypes.string.isRequired,
};
