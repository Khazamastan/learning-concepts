import PropTypes from 'prop-types';

export default function PokemonRow({ pokemon }) {
  const types = pokemon.types.map((entry) => entry.type.name).join(', ');
  return (
    <tr>
      <td>{pokemon.id}</td>
      <td>{pokemon.name}</td>
      <td>{pokemon.height}</td>
      <td>{types}</td>
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
