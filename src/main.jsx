import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/normalize.css";
import "./styles/styles.css";
import "./styles/responsive.css";
import AppRoutes from "./routing/AppRoutes";
import { AuthProvider } from "./context/AuthProvider";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import co from "javascript-time-ago/locale/es-CO.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(co);

ReactDOM.createRoot(document.getElementById("root")).render(
  <section className="root">
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  </section>
);
