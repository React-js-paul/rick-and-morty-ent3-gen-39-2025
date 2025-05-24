import { useRef, useState, useMemo, useCallback } from "react";

import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./hooks/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import getNumbers from "./helpers/getNumbers";
import Pagination from "./components/Pagination"; // ⬅ Importamos el componente de paginación

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));
  const [errorMessage, setErrorMessage] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const safeNumbers = getNumbers() || 1;
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;

  const [location, hasError, isLoading] = useFetch(url);
  const [locations, hasErrorLocations, isLoadingLocations] = useFetch(
    `https://rickandmortyapi.com/api/location/${safeNumbers}`
  );

  const inputName = useRef();

  const performSearch = useCallback(() => {
    const inputValue = inputName.current.value.trim();
    setErrorMessage("");

    if (!inputValue) {
      setErrorMessage("You must enter a location name.");
      return;
    }

    const selectedLocation = locations?.find(
      (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (selectedLocation) {
      setLocationId(selectedLocation.id);
    } else {
      setErrorMessage("No location found with that name!");
    }
  }, [locations]);

  const handleSbmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleInputChange = () => {
    const inputValue = inputName.current.value.trim();
    setShowClearButton(inputValue.length > 0);

    if (inputValue) {
      const matchingLocation = locations?.find(
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

  // ******************************* PAGINATION *******************************
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 8;

  const residentsToShow = useMemo(() => {
    if (!location?.residents) return [];
    const startIndex = (currentPage - 1) * residentsPerPage;
    const endIndex = startIndex + residentsPerPage;
    return location.residents.slice(startIndex, endIndex);
  }, [location, currentPage]);

  const totalPages = useMemo(() => {
    return location?.residents
      ? Math.ceil(location.residents.length / residentsPerPage)
      : 1;
  }, [location]);
  // ******************************* PAGINATION *******************************

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
            onChange={handleInputChange}
          />
          {showClearButton && (
            <div className="form__div">
              <button
                className="form__button"
                onClick={() => {
                  inputName.current.value = "";
                  setShowClearButton(false);
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
          <div className="loader__container">
            {/* Animamos directamente la imagen para evitar un div extra */}
            <img className="loader" src="/vite.png" alt="loader" />
          </div>
        ) : errorMessage ? (
          <h1>X {errorMessage}</h1>
        ) : (
          <>
            <LocationInfo location={location} />
            <section className="cards__container flex-container">
              {residentsToShow.map((url) => (
                <ResidentCard key={url} url={url} />
              ))}

              {/* 📄 Controles de paginación */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </section>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
