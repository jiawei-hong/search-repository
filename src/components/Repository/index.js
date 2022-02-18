import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import languageColors from "language-colors";
import { getRepoMostUseLanguages } from '../../api';
import TopicList from '../TopicList'
import IconText from "../IconText";
import './index.css';

function Repository({ repo = {}, settings = { inList: false } }) {
    const [language, setLanguage] = useState({
        text: "",
        color: null,
    });

    useEffect(() => {
        async function getMostUseLanguages() {
            const languages = await getRepoMostUseLanguages(repo.owner.login, repo.name);
            const languagesKeys = Object.keys(languages);

            if (languagesKeys.length > 0) {
                setLanguage({
                    text: languagesKeys[0],
                    color: languageColors[languagesKeys[0].toLowerCase()]
                });
            }
        }

        if (Object.keys(repo).length > 0) {
            if (!repo.language) {
                getMostUseLanguages();
            } else {
                setLanguage({
                    text: repo.language,
                    color: languageColors[repo.language.toLowerCase()],
                });
            }
        }
    }, [repo]);

    return (
        <div className={`py-5 ${settings.inList ? "first:border-t border-b border-gray-200" : ""}`}>
            <h3 className="mb-1 text-2xl text-blue-500 hover:underline">
                {
                    settings.inList ? (
                        <Link to={`/users/${repo.owner.login}/repos/${repo.name}`}>{repo.name}</Link>
                    ) : (
                        <a href={repo.html_url} rel="noreferrer" target={"_blank"}>{repo.full_name}</a>
                    )
                }
            </h3>

            <div className={`py-2 text-gray-500 ${settings.inList ? "" : "border-b pb-3"}`}>
                {repo.description}
            </div>

            <TopicList topics={repo.topics} />

            <div className={`text-sm mt-2 ${settings.inList ? "in-list" : "not-in-list"}`}>
                {
                    settings.inList && language.color && language.text && (
                        <div>
                            <span
                                className="inline-block rounded-full w-3 h-3"
                                style={{ backgroundColor: language.color }}></span>
                            <span className="text-gray-500 ml-1">{language.text}</span>
                        </div>
                    )
                }

                <IconText text={repo.stargazers_count} showText={'starts'} inList={settings.inList} />

                {
                    repo.forks_count > 0 && <IconText type="fork" text={repo.forks_count} showText={'forks'} inList={settings.inList} />
                }

                {
                    !settings.inList && <IconText type="eye" text={repo.watchers_count} showText={'watchers'} inList={settings.inList} />
                }

                {
                    repo.license && <IconText type="license" text={repo.license.name} />
                }
            </div>
        </div >
    )
}

export default Repository;