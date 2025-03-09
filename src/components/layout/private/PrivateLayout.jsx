import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useAuth from "../../../hooks/useAuth";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  return (
    <div className="layout">
      {auth._id ? (
        <>
          <Header />
          {loading ? (
            <h1>Cargando...</h1>
          ) : (
            <>
              <section className="layout__content">
                <Outlet />
              </section>
              <Sidebar />
            </>
          )}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default PrivateLayout;
