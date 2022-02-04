import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserProfile, getReposWithUsernameAndPage } from "../api";
import languageColors from "language-colors"

function RepositoryList() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);
  const getTenRepository = useCallback(async (username, page) => {
    const getRepositoryWithPage = await getReposWithUsernameAndPage(username, page);

    if (getRepositoryWithPage instanceof Array) {
      setRepository(repos => [
        ...repos,
        ...getRepositoryWithPage
      ])
    } else {
      console.error(getRepositoryWithPage.data.message);
    }
  }, []);

  const getProfile = useCallback(async username => {
    const profile = await getUserProfile(username);

    if (profile.status !== 404) {
      setMaxRepositoryCount(profile.public_repos);
      setProfile(profile);
    }
  }, [])

  useEffect(() => {
    getProfile(params.username)
  }, [params.username, getProfile]);

  useEffect(() => {
    getTenRepository(params.username, page);
  }, [params.username, page, getTenRepository]);

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (scrollHeight === clientHeight + scrollTop && repository.length < maxRepositoryCount) {
      setPage(page + 1);
      getTenRepository();
    }
  }

  return (
    <div className="container grid grid-cols-[500px_1fr] mx-auto pt-5 repository-list-cotainer h-screen overflow-y-scroll px-5" onScroll={e => scroll(e)}>
      <div className="repository-list-sidebar ml-auto">
        <img className="rounded-full border border-gray-300" src={profile.avatar_url} width={260} height={260} alt="" />

        <div className="card-names">
          <span className="user-name d-block text-color-default">{profile.name}</span>
          <span className="user-nickname block text-gray">{profile.login}</span>
        </div>

        <div className="card-links mt-3 mb-3">
          <a className="text-decoration-none text-color-default" href={"https://github.com/JiaWei-Hong?tab=followers"}>
            <svg version="1.1" width="16" height="16" className="inline-block">
              <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
            </svg>
            <span className="font-medium text-color-default ml-1 mr-1">{profile.followers}</span>followers
          </a>

          <span className="dot">·</span>

          <a className="text-decoration-none text-color-default" href={"https://github.com/JiaWei-Hong?tab=following"}>
            <span className="font-medium text-color-default mr-1">{profile.following}</span>following
          </a>
        </div>
      </div>

      <div className="user-repositories-list pl-5">
        <ul className="list-style-none">
          {
            repository.length > 0 ? (
              repository.map(repo => (
                <li className="py-5 px-2 first:border-t border-b border-gray-200" key={repo.id}>
                  <h3 className="mb-1 text-2xl">
                    <Link className="text-blue hover:underline" to={`./${repo.name}`}>{repo.name}</Link>
                  </h3>

                  <div className="mb-1 text-gray-500">{repo.description}</div>

                  <div className="flex items-center text-sm">
                    <span
                      className="inline-block rounded-full w-3 h-3 RepositoryList"
                      style={{ backgroundColor: repo.language ? languageColors[repo.language.toLowerCase()] : "#ccc" }}></span>
                    <span className="text-gray-500 ml-1">{repo.language ?? "Undefined"}</span>
                  </div>
                </li>
              ))
            ) : (
              <h3 className="text-center text-3xl font-sans">{profile.login}doesn’t have any repositories that match.</h3>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default RepositoryList;
