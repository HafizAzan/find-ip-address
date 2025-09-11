import React, { memo } from "react";
import LocationMap from "../../components/LocationMap";
import { useSelector } from "react-redux";

function Home() {
  const { ip, location } = useSelector((state) => state.location);
  console.log(location, "location");
  return (
    <div className="home-container">
      <LocationMap location={location} />
    </div>
  );
}

export default memo(Home);
