import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { statusCode } from "../../helpers/statusCode";
import UserList from "./UserList";

const People = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  const token = localStorage.getItem("token");
  const getUsers = async (nextPage = 1) => {
    try {
      setLoading(true);
      const request = await fetchHelper(
        `${Global.url}users?page=${nextPage}&limit=5`,
        "GET",
        {},
        token
      );
      const data = await request.json();
      setFollowing(data.user_following);
      if (data.users && !statusCode[request.status]) {
        let newUsers = data.users;
        if (users.length >= 1) {
          newUsers = [...users, ...data.users];
        }
        setUsers(newUsers);
        setLoading(false);
      }
      if (users.length >= data.totalUsers - data.users.length - 1) {
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
          <h1 className="content__title">Gente</h1>
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

export default People;
