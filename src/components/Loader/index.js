import './index.css';

function Loader() {
  return (
    <div className="loader flex items-center justify-center mt-10 space-x-2">
      {
        new Array(3).fill(0).map(() => (
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        ))
      }
    </div>
  )
}

export default Loader;