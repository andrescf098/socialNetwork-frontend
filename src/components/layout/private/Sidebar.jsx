import { Link } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";
import { fetchHelper } from "../../../helpers/fetchHelper";
import { useState } from "react";

const Sidebar = () => {
  const { auth, counters } = useAuth();
  const { form, changed } = useForm();
  const [stored, setStored] = useState("");
  const token = localStorage.getItem("token");

  const savePublication = async (e) => {
    e.preventDefault();
    setStored("");
    try {
      const fileInput = document.querySelector("#file");
      let newPublication = form;
      const request = await fetchHelper(
        `${Global.url}publication`,
        "POST",
        JSON.stringify(newPublication),
        token
      );
      const data = await request.json();
      if (fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);
        try {
          await fetch(`${Global.url}publication/upload/${data._id}`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          setStored("error");
        }
      }
      setStored("success");
      document.getElementById("publication-form").reset();
    } catch {
      setStored("error");
    }
  };

  return (
    <div className="container__aside">
      <aside className="layout__aside">
        <header className="aside__header public">
          <h1 className="aside__title">Hola, {auth.name}</h1>
        </header>
        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
                <img
                  src={
                    auth.image != "userImage.png"
                      ? `${Global.url}users/avatar/${auth.image}`
                      : avatar
                  }
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              </div>
              <div className="general-info__container-names">
                <Link to="#" className="container-names__name">
                  {auth.name} {auth.lastname}
                </Link>
                <p className="container-names__nickname">{auth.nick}</p>
              </div>
            </div>
            <div className="profile-info__stats">
              <div className="stats__following">
                <Link to="/social/following" className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">
                    {counters.following}
                  </span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to="/social/followers" className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">{counters.followed}</span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to="/social/publications" className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">
                    {counters.publications}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="aside__container-form">
            {stored == "success" ? (
              <strong className="alert alert-success">
                Se ha publicado correctamente
              </strong>
            ) : (
              ""
            )}
            {stored == "error" ? (
              <strong className="alert alert-error">
                No se ha publicado correctamente
              </strong>
            ) : (
              ""
            )}
            <form
              id="publication-form"
              className="container-form__form-post"
              onSubmit={savePublication}
            >
              <div className="form-post__inputs">
                <label htmlFor="text" className="form-post__label">
                  ¿Que estas pesando hoy?
                </label>
                <textarea
                  name="text"
                  className="form-post__textarea"
                  defaultValue={""}
                  onChange={changed}
                />
              </div>
              <div className="form-post__inputs">
                <label htmlFor="file0" className="form-post__label">
                  Sube tu foto
                </label>
                <input
                  type="file"
                  name="file0"
                  id="file"
                  className="form-post__image"
                />
              </div>
              <div className="btn-submit--publication">
                <input
                  type="submit"
                  value="Publicar"
                  className="form-post__btn-submit"
                />
              </div>
            </form>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
