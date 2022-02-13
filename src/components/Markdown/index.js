import Markdown from 'react-remarkable'
import "github-markdown-css/github-markdown-light.css"

function RepositoryMarkdown({ source }) {

  return (
    <div className="mt-5 p-3 rounded border">
      <div className="mb-2 border-b text-2xl text-gray-500">README.md</div>

      <div className="markdown-body">
        <Markdown>{source}</Markdown>
      </div>
    </div>
  )
}

export default RepositoryMarkdown;