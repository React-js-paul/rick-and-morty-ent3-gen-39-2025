import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./styles/ResidentCard.css";

const ResidentCard = React.memo(({ url }) => {
  const [resident, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    // No es necesario llamar a getResident, el hook ya lo hace automáticamente
  }, [url]);

  return (
    <article className={`resident paul ${resident?.status}`}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header className="resident__header">
            <img
              className="resident__image"
              src={resident?.image}
              alt={resident?.name}
            />
            <div className="resident__status-container flex-container">
              <div
                className={`resident__status-circle ${resident?.status}`}
              ></div>
              <div className="resident_status">{resident?.status}</div>
            </div>
          </header>

          <section className="resident__body">
            <h3 className="resident__name">{resident?.status} </h3>
            <hr className="resident__hr" />
            <ul className="resident__list grid-container">
              <li className="resident__item grid-container">
                <span className="resident__label">Specie: </span>
                <span className="resident__value">{resident?.species} </span>
              </li>
              <li className="resident__item grid-container">
                <span className="resident__label">Origin:</span>
                <span className="resident__value">
                  {resident?.origin.name}{" "}
                </span>
              </li>
              <li className="resident__item grid-container">
                <span className="resident__label">Episodes where appear:</span>
                <span className="resident__value">
                  {resident?.episode.length}{" "}
                </span>
              </li>
            </ul>
          </section>
        </>
      )}
    </article>
  );
});

export default ResidentCard;
