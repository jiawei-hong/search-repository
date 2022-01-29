import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserProfile, getReposWithUsernameAndPage } from '../api';

function RepositoryList() {
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    async function getProfile() {
      const profile = await getUserProfile(params.username);

      setMaxRepositoryCount(profile.public_repos);
    }

    getProfile();
    getTenRepository();
  }, []);

  async function getTenRepository() {
    const getRepositoryWithPage = await getReposWithUsernameAndPage(params.username, page);

    setPage(page + 1);
    setRepository([
      ...repository,
      ...getRepositoryWithPage
    ])
  }

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
          <h1 style={{ textTransform: 'uppercase', letterSpacing: '.5rem' }}> {params.username}</h1>
        </header>

        <main>
          {
            repository.map(repos => (
              <div key={repos.id}>
                <div>
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
          }
        </main>
      </div>
    </React.Fragment >
  )
}

export default RepositoryList;
