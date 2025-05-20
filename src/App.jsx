import { useEffect, useRef, useState } from "react";

import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./hooks/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import getNumbers from "./helpers/getNumbers";

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, hasError, isLoading] = useFetch(url);
  const [locations, getLocations, hasErrorLocations, isLoadingLocations] =
    useFetch(`https://rickandmortyapi.com/api/location/${getNumbers()}`);

  useEffect(() => {
    getLocation();
  }, [locationId]);

  useEffect(() => {
    getLocations();
  }, []);

  console.log(locations);
  const handleSbmit = (e) => {
    e.preventDefault();
    const inputValue = inputName.current.value.thim();
    const selectedLocation = locations.find(
      (location) => location.name.toLowerCase() == inputValue.toLowerCase()
    );

    if (inputValue) {
      setLocationId(selectedLocation ? selectedLocation.id : null);
    }

    {
      /*if (inputId.current.value) {setLocationId(inputId.current.value.trim()); }*/
    }
  };

  {
    /*const inputId = useRef();*/
  }
  const inputName = useRef();
  return (
    <div className="app flex-container">
      <header className="app__hero">
        <img className="hero__image" src="/img/hero.svg" alt="hero Image" />
      </header>
      {/*   <h1>Esta es mi locacion actual</h1>*/}

      <section className="app__body">
        <form className="form" onSubmit={handleSbmit}>
          {/*  <input className="form__input" type="number" ref={inputId} />*/}
          <input
            className="form__input"
            type="text"
            placeholder="search Location name"
            ref={inputName}
            list="location"
          />
          <datalist id="locations">
            {isLoadingLocations ? (
              <option> Loading.....</option>
            ) : (
              location?.map((location) => (
                <option value={locations.name} key={locations.id}></option>
              ))
            )}
          </datalist>
          <button className="form__btn">Search</button>
        </form>
        {isLoading ? (
          <h1>Loading..</h1>
        ) : hasError ? (
          <h1>X! sorry! you must enter numbers</h1>
        ) : (
          <>
            <LocationInfo location={location} />
            <section className="cards__container flex-container">
              {location?.residents.map((url) => (
                <ResidentCard key={url} url={url} />
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
