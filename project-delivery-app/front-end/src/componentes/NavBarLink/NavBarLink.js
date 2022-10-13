import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarLink({ name, path, dataTestId }) {
  return (
    <div className="FlexContainerNav">
      <Link to={ path }>
        <button
          className="botaoNav"
          type="button"
          data-testid={ dataTestId }
        >
          {name}
        </button>
      </Link>
    </div>
  );
}

NavBarLink.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
