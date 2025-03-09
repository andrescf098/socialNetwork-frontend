import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="login" className="menu-list__link">
            <FontAwesomeIcon icon={faUser} />
            <span className="menu-list__title">Login</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="register" className="menu-list__link">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className="menu-list__title">Registro</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
