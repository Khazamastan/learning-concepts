import PropTypes from 'prop-types';
import Table from '../atoms/Table.jsx';
import PokemonRow from '../molecules/PokemonRow.jsx';

export default function PokemonTable({ pokemon }) {
  const headers = ['ID', 'Name', 'Height', 'Types'];
  return (
    <Table headers={headers}>
      {pokemon.map((entry) => (
        <PokemonRow key={entry.id} pokemon={entry} />
      ))}
    </Table>
  );
}

PokemonTable.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};
