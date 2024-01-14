// authReducer.js
const initialState = {
  isAuthenticated: false,
  token: null,
  userFunctions: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userFunctions: action.payload.functions,
      };
    case "LOGOUT":
      // Limpia los datos de autenticación al cerrar sesión
      return {
        ...state,
        token: null,
        functions: [],
      };
    default:
      return state;
  }
};

export default authReducer;
