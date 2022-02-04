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

                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="ml-3 mr-1 inline-block">
                      <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    <span className="text-gray-500">{repo.stargazers_count}</span>

                    {
                      repo.license && (
                        <>
                          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="ml-3 mr-1">
                            <path fillRule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path>
                          </svg>
                          <span className="text-gray-500">{repo.license.name}</span>
                        </>
                      )
                    }
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
