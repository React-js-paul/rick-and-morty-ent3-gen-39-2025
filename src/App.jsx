import { useEffect, useRef, useState } from "react";

import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./hooks/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import getNumbers from "./helpers/getNumbers";

function App() {
  // 🟢 Estado para manejar el ID de la ubicación
  const [locationId, setLocationId] = useState(getRandomNumber(126));

  // 🟢 Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState("");

  // 🟢 Obtiene un número seguro para evitar errores si `getNumbers()` devuelve `undefined`
  const safeNumbers = getNumbers() || 1;

  // 🟢 URL para obtener los datos de una ubicación específica
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;

  // 🟢 Hook personalizado para obtener datos de la ubicación
  const [location, getLocation, hasError, isLoading] = useFetch(url);

  // 🟢 Hook para obtener todas las ubicaciones disponibles
  const [locations, getLocations, hasErrorLocations, isLoadingLocations] =
    useFetch(`https://rickandmortyapi.com/api/location/${safeNumbers}`);

  // 🔄 Este efecto se ejecuta cuando `locationId` cambia
  // 🔄 Llama a `getLocation` para actualizar la información de la ubicación
  useEffect(() => {
    getLocation();
  }, [locationId]);

  // 🔄 Este efecto obtiene la lista de ubicaciones al inicio
  useEffect(() => {
    getLocations();
  }, []);

  // 🟢 Referencia para acceder al valor del input
  const inputName = useRef();

  // ⚡ Manejador de eventos para el formulario
  const handleSbmit = (e) => {
    e.preventDefault();

    // 🔍 Obtiene el valor ingresado por el usuario en el input
    const inputValue = inputName.current.value.trim();

    // 🔍 Busca la ubicación cuyo nombre coincida con lo ingresado
    const selectedLocation = locations.find(
      (location) => location.name.toLowerCase() === inputValue.toLowerCase()
    );

    // 📌 Si se ingresó algo, actualiza el estado con la ubicación encontrada
    if (inputValue) {
      setLocationId(selectedLocation ? selectedLocation.id : null);
      setErrorMessage(
        selectedLocation ? "" : "No location found with that name!"
      );
    } else {
      setErrorMessage("You must put a location name");
    }
  };

  return (
    <div className="app flex-container">
      {/* 🖼 Sección del encabezado con la imagen */}
      <header className="app__hero">
        <img className="hero__image" src="/img/hero.svg" alt="Hero Image" />
      </header>

      {/* 📍 Sección principal de la aplicación */}
      <section className="app__body">
        <form className="form" onSubmit={handleSbmit}>
          {/* 🔍 Input para buscar ubicación por nombre */}
          <input
            className="form__input"
            type="text"
            placeholder="Search Location Name"
            ref={inputName}
            list="locations"
          />

          {/* 📃 Lista de opciones automáticas basadas en ubicaciones disponibles */}
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

        {/* 🔄 Estado de carga y manejo de errores */}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : errorMessage ? (
          <h1>X {errorMessage}</h1>
        ) : (
          <>
            {/* 🏠 Muestra información de la ubicación actual */}
            <LocationInfo location={location} />

            {/* 👥 Lista de residentes en la ubicación */}
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
