function Topic({ text }) {
  return (
    <span className="m-1 px-3 py-0.5 rounded-full bg-sky-200/100 text-blue-500 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
      <a href={`https://github.com/topics/${text}`}>{text}</a>
    </span>
  )
}

export default Topic;