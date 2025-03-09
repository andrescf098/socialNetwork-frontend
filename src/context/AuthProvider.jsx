import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import * as jose from "jose";
import { fetchHelper } from "../helpers/fetchHelper";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUserNav, setShowUserNav] = useState(false);

  useEffect(() => {
    authUser();
  }, []);
  const authUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    let user = jose.decodeJwt(token);
    const request = await fetchHelper(
      `${Global.url}users/profile/${user.sub}`,
      "GET",
      {},
      token
    );
    refreshCounters(user, token);
    const data = await request.json();
    setAuth(data.user);
    setLoading(false);
  };

  const refreshCounters = async (user, token) => {
    const requestCounters = await fetchHelper(
      `${Global.url}users/count/${user.sub}`,
      "GET",
      {},
      token
    );
    const dataCount = await requestCounters.json();
    setCounters(dataCount);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        counters,
        setCounters,
        loading,
        showUserNav,
        setShowUserNav,
        refreshCounters,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
