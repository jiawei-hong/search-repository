import React, { useEffect, useState } from "react";
import { getReposWithUsernameAndPage, getMostStarsWithRepository } from "../../api";
import Repository from "../Repository";
import Loader from '../Loader';

function RepositoryList({ username, maxRepositoryCount, inTrendPage = false }) {
  const [repository, setRepository] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true);

  async function getRepository(page = 1) {
    let userRepository = null;

    if (inTrendPage) {
      userRepository = await getMostStarsWithRepository(page);
    } else {
      userRepository = await getReposWithUsernameAndPage(username, page);
    }

    setPage(page + 1);

    if (!userRepository.status) {
      setRepository(repos => [
        ...repos,
        ...inTrendPage ? userRepository.items : userRepository
      ])

      setLoading(false);
    }
  }

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (
      scrollHeight !== clientHeight &&
      scrollHeight === clientHeight + scrollTop &&
      repository.length < maxRepositoryCount
    ) {
      setLoading(true);
      getRepository(page);
    }
  }

  useEffect(() => {
    const lastSearchUser = localStorage.name;

    if (lastSearchUser !== username) {
      setRepository([])
    }

    getRepository();
    localStorage.name = username
  }, [username])

  return (
    <React.Fragment>
      {
        loading && <Loader />
      }

      <div className="h-screen overflow-y-scroll" onScroll={e => scroll(e)}>
        {
          repository.map((repo, i) => (
            <Repository repo={repo} settings={{ inList: true }} key={i} />
          ))
        }
      </div>
    </React.Fragment>
  );
}

export default RepositoryList;
