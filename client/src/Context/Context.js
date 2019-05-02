import React from "react";

const Context = React.createContext({
  isAuth: false,
  token: null
});

export default Context;
