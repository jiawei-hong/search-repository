import React, { useEffect, useState } from 'react';
import { getUserOrganizations } from '../../api';
import Organization from '../Organization';

function OrganizationList({ username }) {
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
    organizations.length > 0 && (
      <div className="mt-3 mb-3 pt-2 border-t">
        <h2 className="mb-2">Organizations</h2>
        <div className="flex flex-wrap">
          {
            organizations.map((organization, i) => (
              <Organization username={organization.login} avatarUrl={organization.avatar_url} key={i} />
            ))
          }
        </div>
      </div>
    )
  )
}

export default OrganizationList;