import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../../assets/img/user.png";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import UserNav from "./UserNav";

const Navbar = () => {
  const { auth, showUserNav, setShowUserNav } = useAuth();

  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social" className="menu-list__link">
            <FontAwesomeIcon icon={faHouse} />
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink to="/social/people" className="menu-list__link">
            <FontAwesomeIcon icon={faUser} />
            <span className="menu-list__title">Gente</span>
          </NavLink>
        </li>
      </ul>

      <ul
        className="container-lists__list-end"
        onClick={() => setShowUserNav((current) => !current)}
      >
        <li className="list-end__item">
          <div to="#" className="list-end__link-image">
            <img
              src={
                auth.image != "userImage.png"
                  ? `${Global.url}users/avatar/${auth.image}`
                  : avatar
              }
              className="list-end__img"
              alt="Imagen de perfil"
            />
          </div>
          <span className="list-end__name">{auth.nick}</span>
        </li>
      </ul>
      {showUserNav ? <UserNav /> : ""}
    </nav>
  );
};

export default Navbar;
