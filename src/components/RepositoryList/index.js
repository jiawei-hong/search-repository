import { useEffect, useState } from "react";
import { getReposWithUsernameAndPage } from "../../api";
import Repository from "../Repository";

function RepositoryList({ username, maxRepositoryCount }) {
  const [repository, setRepository] = useState([]);
  const [page, setPage] = useState(1)

  async function getRepository(page = 1) {
    const userRepository = await getReposWithUsernameAndPage(username, page);

    setPage(page + 1);

    if (!userRepository.status) {
      setRepository(repos => [
        ...repos,
        ...userRepository
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
