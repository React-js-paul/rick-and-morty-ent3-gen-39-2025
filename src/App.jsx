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

  // ⚡ Nueva función para manejar la búsqueda, tanto automática como manual
  const performSearch = () => {
    const inputValue = inputName.current.value.trim();
    setErrorMessage(""); // Limpia cualquier mensaje de error previo

    if (!inputValue) {
      setErrorMessage("You must enter a location name.");
      return;
    }

    // Busca la ubicación cuyo nombre coincida con lo ingresado
    const selectedLocation = locations.find(
      (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (selectedLocation) {
      setLocationId(selectedLocation.id);
      // Opcional: podrías limpiar el input después de una búsqueda exitosa
      // inputName.current.value = "";
    } else {
      setErrorMessage("No location found with that name!");
    }
  };

  // ⚡ Manejador de eventos para el formulario (lo mantenemos para la búsqueda manual si el usuario presiona Enter o el botón)
  const handleSbmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    performSearch(); // Llama a la nueva función de búsqueda
  };

  // ⚡ Manejador de eventos para el input (para la búsqueda automática)
  const handleInputChange = () => {
    const inputValue = inputName.current.value.trim();

    // Solo busca automáticamente si el input no está vacío
    if (inputValue) {
      // Busca si el valor actual del input coincide exactamente con un nombre de ubicación
      const matchingLocation = locations.find(
        (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchingLocation) {
        // Si hay una coincidencia exacta, dispara la búsqueda
        setLocationId(matchingLocation.id);
        setErrorMessage(""); // Limpia el error si había uno
      } else {
        // Si no hay una coincidencia exacta, pero el usuario está escribiendo,
        // puedes decidir si quieres mostrar un error o simplemente no hacer nada hasta que coincida.
        // Por ahora, lo dejamos sin mensaje de error si no hay match, ya que el usuario puede seguir escribiendo.
        setErrorMessage(""); // Evita que el mensaje de error se quede si el usuario está escribiendo
      }
    } else {
      setErrorMessage(""); // Limpia el error si el input está vacío
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
            onChange={handleInputChange} // <<-- ¡Añadimos este evento!
          />
          <button className="form__button">x</button>

          {/* 📃 Lista de opciones automáticas basadas en ubicaciones disponibles */}
          <datalist id="locations">
            {isLoadingLocations ? (
              <option>Loading...</option>
            ) : (
              // Asegúrate de que `locations` no sea undefined antes de mapear
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
