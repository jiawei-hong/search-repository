import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useParams, useNavigate } from "react-router-dom";
import { getRepository, getRepoReadMarkdown } from "../api";
import Alert from '../components/Alert';
import Repository from "../components/Repository";
import RepositoryMarkdown from '../components/Markdown';

function RepositoryPage() {
  const params = useParams();
  const navigate = useNavigate();

  const [repository, setRepository] = useState({});
  const [markdwon, setMarkdown] = useState('');
  const [markdwonErr, setMarkdownErr] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const repo = await getRepository(params.username, params.repo);

      if (!repo.status) {
        setRepository(repo);

        const md = await getRepoReadMarkdown(params.username, params.repo);

        if (md.status) {
          setMarkdownErr(`This Repository README Markdown ${md.data.message}.`);
        } else {
          setMarkdown(Buffer.from(md.content, 'base64').toString());
        }
      } else {
        setError(`Repository ${repo.data.message}.`);
      }
    })()
  }, [params.username, params.repo]);

  return (
    <React.Fragment>
      <div className="container mx-auto p-5">
        {
          error ? (
            <Alert variant="error" text={error} />
          ) : (
            <React.Fragment>
              <div className="p-3 mb-3 rounded border border-gray-300">
                <div className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>&crarr;</div>

                <Repository repo={repository} />
              </div>

              {
                markdwonErr ? (
                  <Alert text={markdwonErr} />
                ) : (
                  <RepositoryMarkdown source={markdwon} />
                )
              }
            </React.Fragment>
          )
        }
      </div>
    </React.Fragment>
  )
}

export default RepositoryPage;