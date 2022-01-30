import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserProfile, getReposWithUsernameAndPage } from '../api';

function RepositoryList() {
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);
  const getTenRepository = useCallback(async () => {
    const getRepositoryWithPage = await getReposWithUsernameAndPage(params.username, page);

    setPage(page + 1);
    setRepository([
      ...repository,
      ...getRepositoryWithPage
    ])
  }, [params.username, page, repository]);

  useEffect(() => {
    (async () => {
      const profile = await getUserProfile(params.username);

      if (profile.status !== 404) {
        setMaxRepositoryCount(profile.public_repos);

        getTenRepository();
      }
    })()
  }, []);

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (scrollHeight === clientHeight + scrollTop && repository.length < maxRepositoryCount) {
      getTenRepository();
    }
  }

  return (
    <React.Fragment>
      <div className='repositoryList-container' onScroll={e => scroll(e)}>
        <header>
          <h1 className='repositoryListHeader'>{params.username}</h1>
        </header>

        <main className='text-center'>
          {
            repository.length > 0 ? (
              repository.map(repos => (
                <div key={repos.id}>
                  <div className='text-left'>
                    <Link to={`./${repos.name}`}>{repos.name}</Link>
                    {
                      repos.license && (
                        <div className='text-sm'>
                          {repos.license.name}
                        </div>
                      )
                    }

                    <div className='text-sm'>{new Date(repos.created_at).toLocaleDateString()}</div>
                  </div>

                  <div className='ml-auto'>
                    <i className="fas fa-star">{repos.stargazers_count}</i>
                  </div>
                </div>
              ))
            ) : (
              <Link to={'/'}>Not Found This User</Link>
            )
          }
        </main>
      </div>
    </React.Fragment >
  )
}

export default RepositoryList;
