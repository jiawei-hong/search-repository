import React, { useEffect, useState } from 'react';
import { getUserOrganizations } from '../../api';
import { UserIcon, CompanyIcon, LocationIcon, LinkIcon } from '../Icon';

function RepositorySidebar({ username, profile }) {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        async function getOrganization() {
            const userOrganization = await getUserOrganizations(username)

            if (!userOrganization.status) {
                setOrganizations(userOrganization)
            }
        }

        getOrganization();
    }, [username])

    return (
        <div className="mx-auto">
            <img className="rounded-full border border-gray-300" src={profile.avatar_url} width={260} height={260} alt="" />

            <div>
                <header className="user-name d-block">{profile.name}</header>
                <span className="user-nickname block text-gray-500">{profile.login}</span>
            </div>

            <div className="mt-3 mb-3">
                <a className="text-decoration-none" href={`https://github.com/${profile.login}?tab=followers`}>
                    <UserIcon className="inline-block" />
                    <span className="font-medium mx-1">{profile.followers}</span>
                    <span className="text-gray-500 mr-1">followers</span>
                </a>

                <span className="dot">·</span>

                <a className="text-decoration-none" href={`https://github.com/${profile.login}?tab=following`}>
                    <span className="font-medium mx-1 ">{profile.following}</span>
                    <span className="text-gray-500">following</span>
                </a>
            </div>

            <div className="mt-3 mb-3">
                {
                    profile['company'] && (
                        <div className="mt-2 mb-2">
                            <CompanyIcon className="inline-block fill-gray-500" />
                            <span className="pl-2 text-gray-700">{profile['company']}</span>
                        </div>
                    )
                }

                {
                    profile['location'] && (

                        <div className="mt-2 mb-2">
                            <LocationIcon className="inline-block fill-gray-500" />
                            <span className="pl-2 text-gray-700">{profile['location']}</span>
                        </div>
                    )
                }

                {
                    profile['blog'] && (
                        <div className="mt-2 mb-2">
                            <LinkIcon className="inline-block fill-gray-500" />
                            <span className="pl-2 text-gray-700">{profile['blog']}</span>
                        </div>
                    )
                }
            </div>

            {
                organizations.length > 0 && (
                    <div className="mt-3 mb-3 pt-2 border-t">
                        <h2 className="mb-2">Organizations</h2>
                        <div className="flex flex-wrap">
                            {
                                organizations.map((organization, i) => (
                                    <a className="pr-2" href={`https://github.com/${organization.login}`} key={i}>
                                        <img className="border rounded" width={32} height={32} src={organization.avatar_url} alt={organization.login} />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default RepositorySidebar;