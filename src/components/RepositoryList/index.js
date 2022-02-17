import Repository from "../Repository";

function RepositoryList({ repository }) {
  return repository.map((repo, i) => (
    <Repository repo={repo} settings={{ inList: true }} key={i} />
  ));
}

export default RepositoryList;
