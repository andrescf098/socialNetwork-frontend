import { useEffect, useState } from "react";
import PublicationList from "../user/PublicationList";
import { fetchHelper } from "../../helpers/fetchHelper";
import { Global } from "../../helpers/Global";
import { statusCode } from "../../helpers/statusCode";

const Feed = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const token = localStorage.getItem("token");

  const getFeed = async (nextPage = 1) => {
    const request = await fetchHelper(
      `${Global.url}publication/feed/${nextPage}?limit=4`,
      "GET",
      {},
      token
    );
    const data = await request.json();
    setPublications(data.Publication);
    if (data.Publication && !statusCode[request.status]) {
      let newPublications = data.Publication;
      if (publications.length >= 1) {
        newPublications = [...publications, ...data.Publication];
      }
      setPublications(newPublications);
    }
    if (publications.length >= data.totalPublications - publications.length) {
      setMore(false);
    }
  };

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getFeed(next);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <section className="layout__content--publication">
        <header className="content__header">
          <h1 className="content__title">Timeline</h1>
        </header>
        <PublicationList
          publications={publications}
          more={more}
          nextPage={nextPage}
        />
      </section>
    </>
  );
};

export default Feed;
