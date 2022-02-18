import { useEffect, useState } from "react";
import { getReposWithUsernameAndPage, getMostStarsWithRepository } from "../../api";
import Repository from "../Repository";

function RepositoryList({ username, maxRepositoryCount, inTrendPage = false }) {
  const [repository, setRepository] = useState([]);
  const [page, setPage] = useState(1)

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
    }
  }

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (
      scrollHeight !== clientHeight &&
      scrollHeight === clientHeight + scrollTop &&
      repository.length < maxRepositoryCount
    ) {
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
    <div className="h-screen overflow-y-scroll" onScroll={e => scroll(e)}>
      {
        repository.map((repo, i) => (
          <Repository repo={repo} settings={{ inList: true }} key={i} />
        ))
      }
    </div>
  );
}

export default RepositoryList;
