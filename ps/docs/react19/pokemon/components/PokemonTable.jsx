import PropTypes from 'prop-types';
import './PokemonTable.css';

function PokemonRow({ pokemon }) {
  const typeNames = pokemon.types.map((entry) => entry.type.name).join(', ');
  return (
    <tr>
      <td>{pokemon.id}</td>
      <td>{pokemon.name}</td>
      <td>{pokemon.height}</td>
      <td>{typeNames}</td>
    </tr>
  );
}

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired
  }).isRequired
};

export default function PokemonTable({ pokemon }) {
  return (
    <div className="pokemon-table__wrapper" role="region" aria-live="polite">
      <table className="pokemon-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Height</th>
            <th scope="col">Types</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((entry) => (
            <PokemonRow key={entry.id} pokemon={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

PokemonTable.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ).isRequired
};
