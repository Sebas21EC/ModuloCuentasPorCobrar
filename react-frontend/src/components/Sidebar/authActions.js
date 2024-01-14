// authActions.js
export const loginSuccess = (token, functions) => ({
    type: 'LOGIN_SUCCESS',
    payload: { token, functions },
  });
  
  export const logout = () => ({ type: 'LOGOUT' });
  