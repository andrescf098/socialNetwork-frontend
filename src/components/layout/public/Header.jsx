import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <Link className="navbar__title" href="">
          SocialReact
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
