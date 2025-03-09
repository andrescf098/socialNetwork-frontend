import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import UserList from "./UserList";
import { Link, useParams } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import { statusCode } from "../../helpers/statusCode";
import PublicationList from "./PublicationList";

const ProfileUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [publications, setPublications] = useState([]);
  const [following, setFollowing] = useState([]);
  const [counters, setCounters] = useState({});
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showPublications, setShowPublications] = useState(false);

  const token = localStorage.getItem("token");
  const getUser = async () => {
    const request = await fetchHelper(
      `${Global.url}users/profile/${id}`,
      "GET",
      {},
      token
    );
    const data = await request.json();
    setUser(data.user);
  };
  const getFollowings = async (nextPage = 1) => {
    try {
      const request = await fetchHelper(
        `${Global.url}follow/following/${id}?page=${nextPage}&limit=5`,
        "GET",
        {},
        token
      );
      let response = await request.json();
      let cleanUser = [];
      response.following.forEach((follow) => {
        cleanUser = [...cleanUser, follow.followed];
      });
      setFollowing(response.user_following);
      if (cleanUser && !statusCode[request.status]) {
        let newUsers = cleanUser;
        if (response.length >= 1) {
          newUsers = [...response, ...cleanUser];
        }
        setData(newUsers);
      }
      if (data.length >= response.totalFollowing - cleanUser.length - 1) {
        setMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getFollowers = async (nextPage = 1) => {
    try {
      const request = await fetchHelper(
        `${Global.url}follow/followers/${id}?page=${nextPage}&limit=5`,
        "GET",
        {},
        token
      );
      let response = await request.json();
      let cleanUser = [];
      response.followers.forEach((follow) => {
        cleanUser = [...cleanUser, follow.user];
      });
      setFollowing(response.user_following);
      if (cleanUser && !statusCode[request.status]) {
        let newUsers = cleanUser;
        if (response.length >= 1) {
          newUsers = [...response, ...cleanUser];
        }
        setData(newUsers);
      }
      if (data.length >= response.totalFollowing - cleanUser.length - 1) {
        setMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getPublications = async (nextPage = 1) => {
    const request = await fetchHelper(
      `${Global.url}publication/${id}?page=${nextPage}&limit=10`,
      "GET",
      {},
      token
    );
    const data = await request.json();
    setPublications(data.publications);
  };

  const getCounters = async () => {
    const request = await fetchHelper(
      `${Global.url}users/count/${id}`,
      "GET",
      {},
      token
    );
    const data = await request.json();
    setCounters(data);
  };

  const profileFollowing = () => {
    getFollowings();
    setShowFollowing(true);
    setShowFollowers(false);
    setShowPublications(false);
    setPage(1);
  };
  const profileFollowers = () => {
    getFollowers();
    setShowFollowing(false);
    setShowFollowers(true);
    setShowPublications(false);
    setPage(1);
  };
  const profilePublication = () => {
    getPublications();
    setShowFollowing(false);
    setShowFollowers(false);
    setShowPublications(true);
    setPage(1);
  };
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
  };

  useEffect(() => {
    getUser();
    getCounters();
  }, []);

  return (
    <>
      <section className="layout__content--publication">
        <header className="content__header">
          <div className="post__container">
            <div className="post__image-user">
              <a className="post__image-link">
                <img
                  src={
                    user.image != "userImage.png"
                      ? `${Global.url}users/avatar/${user.image}`
                      : avatar
                  }
                  className="post__user-image"
                  alt="Foto de perfil"
                />
              </a>
            </div>
            <div className="post__body">
              <div className="post__user-info">
                <h3>
                  {user.name} {user.lastname}
                </h3>
              </div>
              <h4 className="post__content">{user?.biography}</h4>
            </div>
          </div>
        </header>
        <div className="posts__post">
          <div className="stats__profile">
            <div className="stats__following">
              <Link className="following__link" onClick={profileFollowing}>
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{counters.following}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link className="following__link" onClick={profileFollowers}>
                <span className="following__title">Seguidores</span>
                <span className="following__number">{counters.followed}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link className="following__link" onClick={profilePublication}>
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {counters.publications}
                </span>
              </Link>
            </div>
          </div>
        </div>
        {showFollowing ? (
          <UserList
            users={data}
            nextPage={nextPage}
            following={following}
            setFollowing={setFollowing}
            more={more}
            token={token}
          />
        ) : (
          ""
        )}
        {showFollowers ? (
          <UserList
            users={data}
            nextPage={nextPage}
            following={following}
            setFollowing={setFollowing}
            more={more}
            token={token}
          />
        ) : (
          ""
        )}
        {showPublications ? (
          <PublicationList
            publications={publications}
            more={false}
            nextPage={1}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default ProfileUser;
