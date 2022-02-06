import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { getRepository } from "../api";
import Alert from '../components/Alert';
import Repository from "../components/Repository";
import { StarIcon, EyeIcon, ForkIcon } from '../components/Icon';

function RepositoryPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [repository, setRepository] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const repo = await getRepository(params.username, params.repo);

      if (!repo.status) {
        setRepository(repo);
      } else {
        setError(`Repository ${repo.data.message}.`);
      }
    })()
  }, [params.username, params.repo]);

  return (
    <React.Fragment>
      <div className="container mx-auto p-5">
        <div className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>&crarr;</div>
        {
          error ? (
            <Alert variant="error" text={error} />
          ) : (
            <div className="p-5 rounded border border-gray-300">
              <Repository>
                <Repository.Name>
                  <a className="text-2xl text-blue-500 hover:text-blue-700 hover:underline" href={repository.html_url} rel='noreferrer' target={'_blank'}>{repository.full_name}</a>
                </Repository.Name>

                <Repository.Description>
                  {repository.description}
                </Repository.Description>

                <Repository.Information layoutIsVertical={true}>
                  <div className="flex items-center">
                    <StarIcon className="mr-2 fill-gray-500" />
                    <span className="text-gray-500">{repository.stargazers_count} Stars</span>
                  </div>

                  <div>
                    <EyeIcon className="mr-2 inline-block  fill-gray-500" />
                    <span className="text-gray-500">{repository.watchers_count} watching</span>
                  </div>

                  <div>
                    <ForkIcon className="mr-2 inline-block  fill-gray-500" />
                    <span className="text-gray-500">{repository.forks_count} forks</span>
                  </div>
                </Repository.Information>
              </Repository>
            </div>
          )
        }
      </div>
    </React.Fragment>
  )
}

export default RepositoryPage;