import { NavLink, createBrowserRouter } from "react-router-dom";
import PublicLayout from "../components/layout/public/PublicLayout";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import Feed from "../components/publication/Feed";
import People from "../components/user/People";
import Config from "../components/user/Config";
import Followers from "../components/follow/Followers";
import Following from "../components/follow/Following";
import ProfileUser from "../components/user/ProfileUser";
import Publications from "../components/user/Publications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "social",
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "people",
        element: <People />,
      },
      {
        path: "config",
        element: <Config />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
      {
        path: "publications",
        element: <Publications />,
      },
      {
        path: "profile/:id",
        element: <ProfileUser />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <p>
          <h1>Error 404</h1>
          <NavLink to="/">Volver al inicio</NavLink>
        </p>
      </>
    ),
  },
]);

export default router;
