import React, { useEffect, useState } from 'react';
import { getRepoReadMarkdown } from "../../api";
import Markdown from 'react-remarkable'
import { Buffer } from "buffer";
import "github-markdown-css/github-markdown-light.css"
import Alert from '../Alert';

function RepositoryMarkdown({ repo, username }) {
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function getMarkdown() {
      const md = await getRepoReadMarkdown(username, repo);

      if (md.status) {
        setError(`This Repository README Markdown ${md.data.message}.`);
      } else {
        setMarkdown(Buffer.from(md.content, 'base64').toString());
      }
    }

    getMarkdown();
  }, [repo, username])

  return (
    <React.Fragment>
      {
        error ? (
          <Alert variant='error' text={error} />
        ) : (
          <div className="mt-5 p-3 rounded border">
            <div className="mb-2 border-b text-2xl text-gray-500">README.md</div>

            <div className="markdown-body">
              <Markdown>{markdown}</Markdown>
            </div>
          </div >
        )
      }
    </React.Fragment >
  )
}

export default RepositoryMarkdown;