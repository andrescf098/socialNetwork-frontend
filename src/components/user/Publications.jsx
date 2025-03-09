import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../assets/img/user.png";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { fetchHelper } from "../../helpers/fetchHelper";
import { Global } from "../../helpers/Global";
import * as jose from "jose";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { statusCode } from "../../helpers/statusCode";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const token = localStorage.getItem("token");
  const user = jose.decodeJwt(token);

  const getPublications = async (nextPage = 1) => {
    const request = await fetchHelper(
      `${Global.url}publication/${user.sub}?page=${nextPage}&limit=1`,
      "GET",
      {},
      token
    );
    const data = await request.json();
    setPublications(data.publications);
    if (data.publications && !statusCode[request.status]) {
      let newPublication = data.publications;
      if (publications.length >= 1) {
        newPublication = [...publications, ...data.publications];
      }
      setPublications(newPublication);
    }
    if (publications.length >= data.totalPublications - publications.length) {
      setMore(false);
    }
  };
  const deletePublication = async (id) => {
    const request = await fetchHelper(
      `${Global.url}publication/${id}`,
      "DELETE",
      {},
      token
    );
    if (request.status == 200) {
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
        getPublications();
      }, 3000);
    }
  };
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };
  useEffect(() => {
    getPublications();
  }, []);
  return (
    <section className="layout__content--publication">
      <header className="content__header">
        <h1 className="content__title">Mis publicaciones</h1>
      </header>
      {deleted ? <div className="posts__post message">Borrado</div> : ""}
      {publications ? (
        <>
          {publications?.map((publication) => (
            <div key={publication._id} className="posts__post">
              <div className="post__container">
                <div className="post__image-user">
                  <Link className="post__image-link">
                    <img
                      src={
                        publication.user.image != "userImage.png"
                          ? `${Global.url}users/avatar/${publication.user.image}`
                          : avatar
                      }
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  </Link>
                </div>
                <div className="post__body">
                  <div className="post__user-info">
                    <Link className="user-info__name">
                      {publication.user.name} {publication.user.lastname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link className="user-info__create-date">
                      {publication.createAt}
                    </Link>
                  </div>
                  <h4 className="post__content">{publication.text}</h4>
                  {publication?.file ? (
                    <img
                      src={`${Global.url}publication/image/${publication.file}`}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="post__buttons">
                <Link
                  className="post__button"
                  onClick={() => deletePublication(publication._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
      {more ? (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Publications;
