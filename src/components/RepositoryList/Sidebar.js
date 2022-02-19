import IconText from '../IconText';
import OrganizationList from '../OrganizationList';
import { UserIcon } from '../Icon';

function RepositorySidebar({ username, profile }) {
    return (
        <div className="mx-auto">
            <img className="inline-block rounded-full border border-gray-300 w-32 h-32 lg:w-64 lg:h-64 md:inline-block md:w-48 md:h-48" src={profile.avatar_url} alt="" />

            <div className="sm:mt-2">
                <header className="user-name d-block font-semibold text-2xl">{profile.name}</header>
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
                    ['company', 'location', 'blog'].map((information, i) => (
                        profile[information] && <IconText key={i} type={information} text={profile[information]} />
                    ))
                }
            </div>

            <OrganizationList username={username} />
        </div>
    )
}

export default RepositorySidebar;