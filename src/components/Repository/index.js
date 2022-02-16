import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { StarIcon, LicenseIcon, EyeIcon, ForkIcon } from "../Icon";
import languageColors from "language-colors";
import { getRepoMostUseLanguages } from '../../api';
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

            {
                repo.topics &&(
                    <div className="mt-2 flex flex-wrap">
                        {
                            repo.topics.map((topic,i) => (
                                <span key={i} className="m-1 px-3 py-0.5 rounded-full bg-sky-200/100 text-blue-500 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                                    <a href={`https://github.com/topics/${topic}`}>{topic}</a>
                                </span>
                            ))
                        }
                    </div>
                )
            }

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

                <div>
                    <StarIcon className="inline-block fill-gray-500" />
                    <span className="text-gray-500">{repo.stargazers_count} {!settings.inList ? 'starts' : ''}</span>
                </div>

                {
                    repo.forks_count > 0 && (
                        <div>
                            <ForkIcon className="inline-block fill-gray-500" />
                            <span className="text-gray-500">{repo.forks_count} {!settings.inList ? 'forks' : ''}</span>
                        </div>
                    )
                }

                {
                    !settings.inList && (
                        <div>
                            <EyeIcon className="inline-block fill-gray-500" />
                            <span className="text-gray-500">{repo.watchers_count} watchers</span>
                        </div>
                    )
                }

                {
                    repo.license && (
                        <div>
                            <LicenseIcon className="inline-block fill-gray-500" />
                            <span className="text-gray-500">{repo.license.name}</span>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Repository;