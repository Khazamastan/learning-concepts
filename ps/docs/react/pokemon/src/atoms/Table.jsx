import PropTypes from 'prop-types';
import './table.css';

export default function Table({ headers, children }) {
  return (
    <div className="table-wrapper" role="region" aria-live="polite">
      <table className="pokemon-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

Table.defaultProps = {
  children: null
};
