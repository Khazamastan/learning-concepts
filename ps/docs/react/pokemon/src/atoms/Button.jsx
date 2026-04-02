import PropTypes from 'prop-types';
import './button.css';

export default function Button({ children, variant, ...props }) {
  const className = 'button button--' + variant;
  return (
    <button className={className} type="button" {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary'])
};

Button.defaultProps = {
  variant: 'primary'
};
