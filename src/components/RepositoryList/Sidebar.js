import { UserIcon } from '../Icon';

function RepositorySidebar({ profile }) {
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
        </div>
    )
}

export default RepositorySidebar;