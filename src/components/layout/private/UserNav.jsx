import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UserNav = () => {
  const { setAuth, setCounters } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
    setAuth({});
    setCounters({});
  };
  return (
    <div className="content__user-nav">
      <ul className="container__list--user-nav">
        <li className="list-end__item user-nav">
          <NavLink to="/social/config">
            <FontAwesomeIcon icon={faGear} id="user-nav-icon" />
            <span className="list-end__name">Ajustes</span>
          </NavLink>
        </li>
        <li className="list-end__item user-nav" id="user-nav-icon">
          <NavLink to="#">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span className="list-end__name" onClick={logout}>
              Cerrar sesión
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
