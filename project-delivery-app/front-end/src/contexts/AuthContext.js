import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [auth, setAuth] = useState(user);
  const value = React.useMemo(() => ({
    auth, setAuth,
  }), [auth]);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
