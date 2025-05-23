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
  const [showClearButton, setShowClearButton] = useState(false); // 🟢 Nuevo estado

  const safeNumbers = getNumbers() || 1;
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;

  const [location, getLocation, hasError, isLoading] = useFetch(url);
  const [locations, getLocations, hasErrorLocations, isLoadingLocations] =
    useFetch(`https://rickandmortyapi.com/api/location/${safeNumbers}`);

  useEffect(() => {
    getLocation();
  }, [locationId]);

  useEffect(() => {
    getLocations();
  }, []);

  const inputName = useRef();

  const performSearch = () => {
    const inputValue = inputName.current.value.trim();
    setErrorMessage("");

    if (!inputValue) {
      setErrorMessage("You must enter a location name.");
      return;
    }

    const selectedLocation = locations.find(
      (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (selectedLocation) {
      setLocationId(selectedLocation.id);
    } else {
      setErrorMessage("No location found with that name!");
    }
  };

  const handleSbmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleInputChange = () => {
    const inputValue = inputName.current.value.trim();
    setShowClearButton(inputValue.length > 0); // 🟢 Actualiza visibilidad del botón

    if (inputValue) {
      const matchingLocation = locations.find(
        (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchingLocation) {
        setLocationId(matchingLocation.id);
        setErrorMessage("");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="app flex-container">
      <header className="app__hero">
        <img className="hero__image" src="/img/hero.svg" alt="Hero Image" />
      </header>

      <section className="app__body">
        <form className="form" onSubmit={handleSbmit}>
          <input
            className="form__input"
            type="text"
            placeholder="Search Location Name"
            ref={inputName}
            list="locations"
            onChange={handleInputChange} // 🔄 Modificado para controlar el botón
          />
          {showClearButton && ( // 🟢 Renderización condicional del botón
            <div className="form__div">
              <button
                className="form__button"
                onClick={() => {
                  inputName.current.value = ""; // 🟢 Borra el contenido del input
                  setShowClearButton(false); // 🟢 Oculta el botón de limpiar
                }}
              >
                <span className="button__icon">✖</span>
              </button>
            </div>
          )}
          <datalist id="locations">
            {isLoadingLocations ? (
              <option>Loading...</option>
            ) : (
              locations?.map((location) => (
                <option value={location.name} key={location.id}></option>
              ))
            )}
          </datalist>
          <button className="form__btn">Search</button>
        </form>

        {isLoading ? (
          <h1>Loading...</h1>
        ) : errorMessage ? (
          <h1>X {errorMessage}</h1>
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
