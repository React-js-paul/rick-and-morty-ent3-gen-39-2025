import { useEffect, useState } from "react";

import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./hooks/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <h1>Esta es mi locacion actual</h1>
      <LocationInfo location={location} />
      <section>
        {location?.residents.map((url) => (
          <ResidentCard key={url} url={url} />
        ))}
      </section>
    </div>
  );
}

export default App;
