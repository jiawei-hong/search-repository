import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../api";
import Alert from '../components/Alert';
import Navbar from "../components/Navbar";
import RepositorySidebar from "../components/RepositoryList/Sidebar";
import RepositoryList from "../components/RepositoryList";

function RepositoryListPage() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function getPorfile() {
      const userProfile = await getUserProfile(params.username)

      if (!userProfile.status) {
        setProfile(userProfile)
      } else {
        setError(`${userProfile.data.message} User`)
      }
    }

    getPorfile();
  }, [params.username])

  return (
    <React.Fragment>
      {
        error ? (
          <div className="mx-auto p-3">
            <Alert variant={'error'} text={error} />
          </div>
        ) : (
          <React.Fragment>
            <Navbar />

            <div className="container grid grid-cols-[.25fr_.75fr] mx-auto pt-5">
              <RepositorySidebar username={params.username} profile={profile} />

              <div>
                <RepositoryList username={params.username} maxRepositoryCount={profile.public_repos} />
              </div>
            </div>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default RepositoryListPage;
