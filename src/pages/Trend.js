import React, { useCallback, useEffect, useState } from "react";
import { getMostStarsWithRepository } from "../api";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import Repository from "../components/Repository";

function Trend() {
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);
  const [error, setError] = useState("");

  const getTenRepository = useCallback(async (page) => {
    const getRepositoryWithPage = await getMostStarsWithRepository(page);

    if (!getRepositoryWithPage.status) {
      if (maxRepositoryCount === 0) {
        setMaxRepositoryCount(getRepositoryWithPage.total_count);
      }

      setRepository((repos) => [...repos, ...getRepositoryWithPage.items]);
    } else {
      setError(getRepositoryWithPage.data.message);
    }
  }, []);

  useEffect(() => {
    getTenRepository(page);
  }, [page, getTenRepository]);

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (
      scrollHeight === clientHeight + scrollTop &&
      repository.length < maxRepositoryCount
    ) {
      setPage(page + 1);
      getTenRepository();
    }
  }

  return (
    <React.Fragment>
      <Navbar />

      <div
        className="container mx-auto pt-5 repository-list-cotainer h-screen overflow-y-scroll px-5"
        onScroll={(e) => scroll(e)}
      >
        {error ? (
          <Alert variant="error" text={error} />
        ) : (
          repository.length > 0 && (
            <React.Fragment>
              {repository.map((repo,i) => (
                <Repository
                  repo={repo}
                  settings={{ inList: true }}
                  key={i}
                />
              ))}
            </React.Fragment>
          )
        )}
      </div>
    </React.Fragment>
  );
}

export default Trend;
