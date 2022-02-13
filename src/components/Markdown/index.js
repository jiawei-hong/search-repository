import React, { useEffect, useState } from 'react';
import Markdown from 'react-remarkable'
import Alert from '../Alert';
import { Buffer } from 'buffer';
import { getRepoReadMarkdown } from '../../api';
import "github-markdown-css/github-markdown-light.css"

function RepositoryMarkdown({ owner, repo }) {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMarkown() {
      const md = await getRepoReadMarkdown(owner.login, repo);

      if (md.status) {
        setError(`This Repository README Markdown ${md.data.message}.`);
      } else {
        setMarkdown(Buffer.from(md.content, 'base64').toString());
      }
    }

    if (owner && repo) {
      getMarkown();
    }
  }, [owner, repo]);

  return (
    <div className="mt-5 p-3 rounded border">
      <div className="mb-2 border-b text-2xl text-gray-500">README.md</div>

      {
        !error ? (
          <div className='markdown-body'>
            <Markdown>{markdown}</Markdown>
          </div>
        ) : (
          <Alert variant={'error'} text={error} />
        )
      }
    </div>
  )
}

export default RepositoryMarkdown;