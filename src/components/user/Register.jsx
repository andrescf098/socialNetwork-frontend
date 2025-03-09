import { useState } from "react";
import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { useForm } from "../../hooks/useForm";
import { statusCode } from "../../helpers/statusCode";

const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("");
  const saveUser = async (e) => {
    e.preventDefault();
    setSaved("");
    let newUser = form;
    try {
      const request = await fetchHelper(
        `${Global.url}users`,
        "POST",
        JSON.stringify(newUser)
      );
      if (!statusCode[request.status]) {
        setSaved("success");
        const myForm = document.getElementById("register-form");
        myForm;
      } else {
        setSaved("error");
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="content__login">
      <header className="content__header content__header--public public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts public">
        {saved == "success" ? (
          <strong className="alert alert-success">
            Usuario registrado correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-error">
            No se ha podido registrar el usuario
          </strong>
        ) : (
          ""
        )}
        <form id="register-form" className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Apellido</label>
            <input type="text" name="lastname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input
            type="submit"
            value="Registrarse"
            className="btn btn-successs"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
