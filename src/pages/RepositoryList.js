import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile, getReposWithUsernameAndPage } from "../api";
import languageColors from "language-colors"
import Alert from "../components/Alert";
import RepositorySidebar from "../components/RepositoryList/Sidebar";
import Repository from "../components/Repository";
import { StarIcon, LicenseIcon } from '../components/Icon';

function RepositoryListPage() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);
  const [error, setError] = useState('');

  const getTenRepository = useCallback(async (username, page) => {
    const getRepositoryWithPage = await getReposWithUsernameAndPage(username, page);

    if (!getRepositoryWithPage.status) {
      setRepository(repos => [
        ...repos,
        ...getRepositoryWithPage
      ])
    } else {
      setError(getRepositoryWithPage.data.message);
    }
  }, []);

  const getProfile = useCallback(async username => {
    const profile = await getUserProfile(username);

    if (!profile.status) {
      setMaxRepositoryCount(profile.public_repos);
      setProfile(profile);
    } else {
      setError(`This user was ${profile.data.message}`);
    }
  }, [])

  useEffect(() => {
    getProfile(params.username)
  }, [params.username, getProfile]);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      getTenRepository(params.username, page);
    }
  }, [params.username, page, getTenRepository, profile]);

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (scrollHeight === clientHeight + scrollTop && repository.length < maxRepositoryCount) {
      setPage(page + 1);
      getTenRepository();
    }
  }

  return (
    <React.Fragment>
      {
        error ? (
          <div className="container mx-auto mt-3">
            <Alert variant="error" text={error} />
          </div>
        )
          : (
            <div
              className="container grid grid-cols-[.25fr_.75fr] mx-auto pt-5 repository-list-cotainer h-screen overflow-y-scroll px-5"
              onScroll={e => scroll(e)}
            >
              <RepositorySidebar profile={profile} />

              <div>
                {
                  repository.length > 0 ? (
                    <React.Fragment>
                      {
                        repository.map(repo => (
                          <Repository isInList={true} key={repo.id}>
                            <Repository.Name>
                              <Link className="text-blue-500 hover:underline" to={`./${repo.name}`}>{repo.name}</Link>
                            </Repository.Name>

                            <Repository.Description>
                              {repo.description}
                            </Repository.Description>

                            <Repository.Information layoutIsVertical={false}>
                              <span
                                className="inline-block rounded-full w-3 h-3 RepositoryList"
                                style={{ backgroundColor: repo.language ? languageColors[repo.language.toLowerCase()] : "#ccc" }}></span>
                              <span className="text-gray-500 ml-1">{repo.language ?? "Undefined"}</span>

                              <StarIcon className="ml-3 mr-1 inline-block fill-gray-500" />
                              <span className="text-gray-500">{repo.stargazers_count}</span>

                              {
                                repo.license && (
                                  <>
                                    <LicenseIcon className="ml-3 mr-1 fill-gray-500" />
                                    <span className="text-gray-500">{repo.license.name}</span>
                                  </>
                                )
                              }
                            </Repository.Information>
                          </Repository>
                        ))
                      }
                    </React.Fragment>
                  ) : (
                    <Alert variant="info" text={`${profile.login} doesn’t have any repositories.`} />
                  )
                }
              </div>
            </div>
          )
      }
    </React.Fragment>
  )
}

export default RepositoryListPage;
