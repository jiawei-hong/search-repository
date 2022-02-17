import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  getReposWithUsernameAndPage,
  getUserOrganizations,
} from "../api";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import RepositorySidebar from "../components/RepositoryList/Sidebar";
import RepositoryList from "../components/RepositoryList";

function RepositoryListPage() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [repository, setRepository] = useState([]);
  const [organizations, setOrganizations] = useState("");
  const [error, setError] = useState("");

  async function getRepository(page = 1) {
    const getRepositoryWithPage = await getReposWithUsernameAndPage(
      params.username,
      page
    );

    setPage(page);

    if (!getRepositoryWithPage.status) {
      setRepository((repos) => [...repos, ...getRepositoryWithPage]);
    } else {
      setError(getRepositoryWithPage.data.message);
    }
  }

  useEffect(() => {
    async function getProfile() {
      const profile = await getUserProfile(params.username);
      const userOrganization = await getUserOrganizations(params.username);

      if (!profile.status) {
        setMaxRepositoryCount(profile.public_repos);
        setProfile(profile);
        setOrganizations(userOrganization);
      } else {
        setError(`This user was ${profile.data.message}`);
      }
    }

    getProfile();

    const storageName = localStorage.getItem("name");

    if (storageName && storageName !== params.username) {
      setRepository([]);
      setError("");
      setPage(1);
    }

    getRepository();

    localStorage.setItem("name", params.username);
  }, [params.username]);

  async function scroll(e) {
    const { scrollHeight, clientHeight, scrollTop } = e.target;

    if (
      scrollHeight !== clientHeight &&
      scrollHeight === clientHeight + scrollTop &&
      repository.length < maxRepositoryCount
    ) {
      getRepository(page + 1);
    }
  }

  return (
    <React.Fragment>
      <Navbar />

      {error ? (
        <div className="container mx-auto mt-3">
          <Alert variant="error" text={error} />
        </div>
      ) : (
        <div
          className="container grid grid-cols-[.25fr_.75fr] mx-auto pt-5 repository-list-cotainer h-screen overflow-y-scroll px-5"
          onScroll={(e) => scroll(e)}
        >
          <RepositorySidebar profile={profile} organizations={organizations} />

          <div>
            {repository.length > 0 ? (
              <RepositoryList repository={repository} />
            ) : (
              <Alert
                variant="info"
                text={`${profile.login} doesn’t have any repositories.`}
              />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default RepositoryListPage;
