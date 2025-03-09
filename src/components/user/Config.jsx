import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";
import { fetchHelper } from "../../helpers/fetchHelper";
import { statusCode } from "../../helpers/statusCode";

const Config = () => {
  const { auth, setAuth } = useAuth();
  const { changed } = useForm();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const editUser = async (e) => {
    e.preventDefault();
    const newDataUser = SerializeForm(e.target);
    delete newDataUser.file0;
    try {
      const token = localStorage.getItem("token");
      const fileInput = document.querySelector("#file");
      const request = await fetchHelper(
        `${Global.url}users/${auth._id}`,
        "PATCH",
        JSON.stringify(newDataUser),
        token
      );
      const data = await request.json();
      if (!statusCode[request.status]) {
        setEdit("success");
        setAuth(data);
        if (fileInput.files[0]) {
          const formData = new FormData();
          formData.append("file0", fileInput.files[0]);
          try {
            await fetch(`${Global.url}users/upload`, {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            setError(true);
          }
        }
      } else {
        setEdit("error");
      }
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <header className="content__header content_header--public public">
        <h1 className="content__title">Ajustes</h1>
      </header>
      <div className="content__posts public">
        {edit == "success" ? (
          <strong className="alert alert-success">
            Usuario editado correctamente
          </strong>
        ) : (
          ""
        )}
        {edit == "error" ? (
          <strong className="alert alert-error">
            No se ha podido editar el usuario
          </strong>
        ) : (
          ""
        )}
        <form className="config-form" onSubmit={editUser}>
          <div className="config-user-information">
            <div className="form-user-information">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={auth.name}
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  defaultValue={auth.lastname}
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nick">Nickname</label>
                <input
                  type="text"
                  name="nick"
                  defaultValue={auth.nick}
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="biography">Biografía</label>
                <textarea
                  type="text"
                  name="biography"
                  defaultValue={auth.biography}
                  onChange={changed}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" onChange={changed} />
              </div>
            </div>
            <div className="form-avatar">
              <div className="form-group">
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
                <input type="file" name="file0" id="file" />
              </div>
            </div>
          </div>
          <input type="submit" value="Guardar" className="btn btn-successs" />
        </form>
      </div>
    </>
  );
};

export default Config;
