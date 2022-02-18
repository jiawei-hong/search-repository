import { EyeIcon, ForkIcon, LicenseIcon, StarIcon, CompanyIcon, LocationIcon, LinkIcon, UserIcon } from '../Icon';

function IconText({ type, text, showText = '', inList = false }) {
  const getIcon = (icon) => {
    switch (icon) {
      case "fork":
        return <ForkIcon className="inline-block fill-gray-500" />
      case "eye":
        return <EyeIcon className="inline-block fill-gray-500" />
      case "license":
        return <LicenseIcon className="inline-block fill-gray-500" />
      case "company":
        return <CompanyIcon className="inline-block fill-gray-500" />
      case "location":
        return <LocationIcon className="inline-block fill-gray-500" />
      case "blog":
        return <LinkIcon className="inline-block fill-gray-500" />
      case "user":
        return <UserIcon className="inline-block fill-gray-500" />
      default:
        return <StarIcon className="inline-block fill-gray-500" />
    }
  }

  return (
    <div>
      {getIcon(type)}
      <span className="text-gray-500 pl-2">{text} {!inList ? showText : ''}</span>
    </div>
  )
}

export default IconText;