import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import Context from "../Context";

const Splash = () => {
  const { state } = useContext(Context);
  return state.isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;
