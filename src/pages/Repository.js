import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { getRepository } from "../api";

function Repository() {
  const params = useParams();
  const [repository, setRepository] = useState({});

  useEffect(() => {
    (async () => {
      const repo = await getRepository(params.username, params.repo);

      setRepository(repo);
    })()
  }, [params.username, params.repo]);

  return (
    <React.Fragment>
      <div className="repository-container">
        <h1>
          <a href={repository.html_url} rel='noreferrer' target={'_blank'}>{repository.full_name}</a>
        </h1>

        <h2>{repository.description}</h2>

        <div className="repository-information">
          <div className="text-gray">
            <i className="far fa-star"></i>
            <span>{repository.stargazers_count} stargazers_count</span>
          </div>

          <div className="text-gray">
            <i className="fas fa-eye"></i>
            <span>{repository.watchers_count} watchers</span>
          </div>

          <div className="text-gray">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo-forked mr-2">
              <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            </svg>
            <span>{repository.forks_count} forks</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Repository;