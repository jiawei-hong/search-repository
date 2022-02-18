function Organization({ username, avatarUrl }) {
  return (
    <a className="pr-2" href={`https://github.com/${username}`}>
      <img className="border rounded" width={32} height={32} src={avatarUrl} alt={username} />
    </a>
  )
}

export default Organization;