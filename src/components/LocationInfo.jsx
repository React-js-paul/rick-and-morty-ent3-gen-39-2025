import "./styles/LocationInfo.css";

const LocationInfo = ({ location }) => {
  return (
    <section className="location">
      <h2 className="location__name"> {location?.name} </h2>
      <ul className="location__list flex-container">
        <li className="location__item grid-container">
          <span className="location__label">Type:</span>
          <span className="location__value">{location?.type} </span>
        </li>
        <li className="location__item grid-container">
          <span className="location__label">Dimension:</span>
          <span>{location?.dimension} </span>
        </li>
        <li className="location__item grid-container">
          <span className="location__label">Population:</span>
          <span>{location?.residents?.length ?? 0} </span>
        </li>
      </ul>
    </section>
  );
};

export default LocationInfo;
