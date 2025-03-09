import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { statusCode } from "../../helpers/statusCode";
import UserList from "../user/UserList";
import * as jose from "jose";

const Followers = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  const token = localStorage.getItem("token");
  const getUsers = async (nextPage = 1) => {
    try {
      setLoading(true);
      let userId = jose.decodeJwt(token).sub;
      const request = await fetchHelper(
        `${Global.url}follow/followers/${userId}?page=${nextPage}&limit=5`,
        "GET",
        {},
        token
      );
      let data = await request.json();
      let cleanUser = [];
      data.followers.forEach((follow) => {
        cleanUser = [...cleanUser, follow.user];
      });
      setFollowing(data.user_following);
      if (cleanUser && !statusCode[request.status]) {
        let newUsers = cleanUser;
        if (users.length >= 1) {
          newUsers = [...users, ...cleanUser];
        }
        setUsers(newUsers);
        setLoading(false);
      }
      if (users.length >= data.totalFollowers - cleanUser.length - 1) {
        setMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <section className="layout__content--publication">
        <header className="content__header">
          <h1 className="content__title">Siguendome</h1>
        </header>
        <UserList
          users={users}
          nextPage={nextPage}
          following={following}
          setFollowing={setFollowing}
          getUsers={getUsers}
          more={more}
          page={page}
          token={token}
        />
      </section>
      {loading ? <div className="public">Cargando...</div> : ""}
    </>
  );
};

export default Followers;
