import { useState } from "react";
import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { useForm } from "../../hooks/useForm";
import { statusCode } from "../../helpers/statusCode";

const Login = () => {
  const { form, changed } = useForm({});
  const [error, setError] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    const userToLogin = form;
    try {
      setError(false);
      const request = await fetchHelper(
        `${Global.url}auth/login`,
        "POST",
        JSON.stringify(userToLogin)
      );
      if (statusCode[request.status]) {
        setError(true);
      } else {
        const data = await request.json();
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className="content__login">
      <header className="content__header content__header--public public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts public">
        {error ? (
          <strong className="alert alert-error">
            El correo o la contraseña son incorrectos
          </strong>
        ) : (
          ""
        )}
        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="btn btn-successs"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
