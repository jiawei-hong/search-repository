import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import RepositoryList from "../components/RepositoryList";
import { getMostStarsWithRepository } from "../api";

function Trend() {
  const [maxRepositoryCount, setMaxRepositoryCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getMaxRepositoryCount() {
      const trendRepository = await getMostStarsWithRepository(1);

      if (!trendRepository.status) {
        setMaxRepositoryCount(trendRepository.total_count);
      } else {
        setError(trendRepository.data.message);
      }
    }

    getMaxRepositoryCount();
  }, [])


  return (
    <React.Fragment>
      <Navbar />

      <div className="container mx-auto">
        {
          error ? (
            <div className="mt-2">
              <Alert variant={'error'} text={error} />
            </div>
          ) : (
            <RepositoryList maxRepositoryCount={maxRepositoryCount} inTrendPage={true} />
          )
        }
      </div>
    </React.Fragment>
  );
}

export default Trend;
