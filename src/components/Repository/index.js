import React from "react"
import { Link } from "react-router-dom";
import TopicList from '../TopicList'
import IconText from "../IconText";
import './index.css';
import RepositoryLanguage from "../RepositoryLanguage";

function Repository({ repo = {}, settings = { inList: false } }) {
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
                    settings.inList && <RepositoryLanguage repo={repo.name} username={repo.owner.login} repoLanguage={repo.language} />
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