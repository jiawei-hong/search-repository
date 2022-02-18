import React, { useEffect, useState } from "react";
import languageColors from "language-colors";
import { getRepoMostUseLanguages } from '../../api';

function RepositoryLanguage({ repo, username, repoLanguage }) {
  const [language, setLanguage] = useState({
    color: '#ccc',
    text: null
  })

  async function getMostUseLanguages() {
    const languages = await getRepoMostUseLanguages(username, repo);
    const languagesKeys = Object.keys(languages);

    if (languagesKeys.length > 0) {
      setLanguage({
        text: languagesKeys[0],
        color: languageColors[languagesKeys[0].toLowerCase()]
      });
    }
  }

  useEffect(() => {
    if (!repoLanguage) {
      getMostUseLanguages();
    } else {
      setLanguage({
        text: repoLanguage,
        color: languageColors[repoLanguage.toLowerCase()],
      });
    }
  }, [repoLanguage])

  return (
    <React.Fragment>
      {
        language.text && (
          <div>
            <span
              className="inline-block rounded-full w-3 h-3"
              style={{ backgroundColor: language.color }}></span>
            <span className="text-gray-500 ml-1">{language.text}</span>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default RepositoryLanguage;