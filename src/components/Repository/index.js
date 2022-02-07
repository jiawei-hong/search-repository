import React from "react"
import { Link } from "react-router-dom";
import { StarIcon, LicenseIcon, EyeIcon, ForkIcon } from "../Icon";
import languageColors from "language-colors";
import './index.css';

function Repository({ repo = {}, settings = { inList: false } }) {
    return (
        <div className={`py-5 ${settings.inList ? "first:border-t border-b border-gray-200" : ""}`}>
            <h3 className="mb-1 text-2xl text-blue-500 hover:underline">
                {
                    settings.inList ? (
                        <Link to={`./${repo.name}`}>{repo.name}</Link>
                    ) : (
                        <a href={repo.html_url} rel="noreferrer" target={"_blank"}>{repo.full_name}</a>
                    )
                }
            </h3>

            <div className={`py-2 text-gray-500 ${settings.inList ? "" : "border-b pb-3"}`}>
                {repo.description}
            </div>

            <div className={`text-sm mt-2 ${settings.inList ? "in-list" : "not-in-list"}`}>
                {
                    settings.inList && (
                        <div>
                            <span
                                className="inline-block rounded-full w-3 h-3"
                                style={{ backgroundColor: repo.language ? languageColors[repo.language.toLowerCase()] : "#ccc" }}></span>
                            <span className="text-gray-500 ml-1">{repo.language ?? "Undefined"}</span>
                        </div>
                    )
                }

                <div>
                    <StarIcon className="inline-block fill-gray-500" />
                    <span className="text-gray-500">{repo.stargazers_count} {!settings.inList ? 'starts' : ''}</span>
                </div>

                {
                    !settings.inList && (
                        <React.Fragment>
                            <div>
                                <EyeIcon className="inline-block fill-gray-500" />
                                <span className="text-gray-500">{repo.watchers_count} watchers</span>
                            </div>

                            <div>
                                <ForkIcon className="inline-block fill-gray-500" />
                                <span className="text-gray-500">{repo.forks_count} forks</span>
                            </div>
                        </React.Fragment>
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