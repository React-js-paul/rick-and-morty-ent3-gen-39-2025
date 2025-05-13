import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
//el costom hook son patrones de diseño

const ResidentCard = ({ url }) => {
  const [resident, getResident, hasError, isLoading] = useFetch(url);

  useEffect(() => {
    getResident();
  }, []);
  console.log(resident);
  return (
    <article>
      <header>
        <img src={resident?.image} alt={resident?.name} />
        <div>
          <div></div>
          <div>{resident?.status}</div>
        </div>
      </header>
      <section>
        <h3>{resident?.status} </h3>
        <hr />
        <ul>
          <li>
            <span>Specie: </span>
            <span>{resident?.species} </span>
          </li>
          <li>
            <span>Origin:</span>
            <span>{resident?.origin.name} </span>
          </li>
          <li>
            <span>Episodes where appear:</span>
            <span>{resident?.episode.length} </span>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentCard;
