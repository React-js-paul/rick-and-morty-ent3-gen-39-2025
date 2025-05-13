const LocationInfo = ({ location }) => {
  return (
    <section>
      <div>
        <h2> {location?.name} </h2>
        <ul>
          <li>
            <span>Type:</span>
            <span>{location?.type} </span>
          </li>
          <li>
            <span>Dimension:</span>
            <span>{location?.dimension} </span>
          </li>
          <li>
            <span>Population:</span>
            <span>{location?.residents.length} </span>
          </li>
        </ul>
      </div>
      ;
    </section>
  );
};

export default LocationInfo;
