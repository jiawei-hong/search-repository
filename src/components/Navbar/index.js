import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [searchGithubAccount, setSearchGithubAccount] = useState("");

  const setInputAccount = (searchAccount) => {
    setSearchGithubAccount(searchAccount);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      navigate(`/users/${searchGithubAccount}/repos`);
    }
  };

  return (
    <div className="flex items-center h-12 w-100 w-full bg-blue-900 h-50">
      <div className="text-2xl ml-1 mr-auto text-white">Github</div>

      <div className="mr-auto">
        <input
          className="w-80 rounded  px-2 outline-none"
          type="search"
          placeholder="輸入Github帳號"
          onInput={(e) => setInputAccount(e.target.value)}
          onKeyDown={(e) => handleKeydown(e)}
        />
      </div>
    </div>
  );
}

export default Navbar;
