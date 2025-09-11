import React, { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import formatDateTime from "../utils/constant";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FlyToLocation({ latitude, longitude }) {
  const map = useMap();

  if (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    !isNaN(latitude) &&
    !isNaN(longitude)
  ) {
    map.flyTo([latitude, longitude], 15);
  }

  return null;
}

function LocationMap({
  location = {
    latitude: 51.505,
    longitude: -0.09,
    city: "London",
    country: "UK",
  },
}) {
  // Default coordinates (London)
  const DEFAULT_LATITUDE = 51.505;
  const DEFAULT_LONGITUDE = -0.09;

  let { latitude, longitude } = location;

  // Validate coordinates, fallback to default if invalid
  const validLatitude =
    typeof latitude === "number" && !isNaN(latitude)
      ? latitude
      : DEFAULT_LATITUDE;
  const validLongitude =
    typeof longitude === "number" && !isNaN(longitude)
      ? longitude
      : DEFAULT_LONGITUDE;

  return (
    <MapContainer
      center={[validLatitude, validLongitude]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[validLatitude, validLongitude]}>
        <Popup>
          <div className="popup-content">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>
                {location?.flag?.emoji || "🏳️"}
              </span>
              {location.flag?.img && (
                <img
                  src={location.flag.img}
                  width={24}
                  height={16}
                  alt="flag"
                />
              )}
              <strong>{location.country || "Unknown"}</strong>
            </div>

            <div>
              <strong>City:</strong> {location.city || "N/A"}
            </div>
            <div>
              <strong>Region:</strong> {location.region || "N/A"} (
              {location.region_code || "N/A"})
            </div>
            <div>
              <strong>Postal Code:</strong> {location.postal || "N/A"}
            </div>
            <div>
              <strong>Latitude:</strong> {validLatitude}
            </div>
            <div>
              <strong>Longitude:</strong> {validLongitude}
            </div>
            <div>
              <strong>IP Address:</strong> {location.ip || "N/A"}
            </div>
            <div>
              <strong>Country Code:</strong> {location.country_code || "N/A"}
            </div>
            <div>
              <strong>Continent:</strong> {location.continent || "N/A"} (
              {location.continent_code || "N/A"})
            </div>

            <div>
              <strong>ISP:</strong> {location.connection?.isp || "N/A"}
            </div>
            <div>
              <strong>Organization:</strong> {location.connection?.org || "N/A"}
            </div>
            <div>
              <strong>Domain:</strong> {location.connection?.domain || "N/A"}
            </div>
            <div>
              <strong>ASN:</strong> {location.connection?.asn || "N/A"}
            </div>

            <div>
              <strong>Calling Code:</strong> +{location.calling_code || "N/A"}
            </div>
            <div>
              <strong>Capital:</strong> {location.capital || "N/A"}
            </div>
            <div>
              <strong>Time Zone:</strong> {location.timezone?.id || "N/A"}
            </div>
            <div>
              <strong>Current Time:</strong>{" "}
              {formatDateTime(location.timezone?.current_time) || "N/A"}
            </div>
            <div>
              <strong>UTC Offset:</strong> {location.timezone?.utc || "N/A"}
            </div>
            <div>
              <strong>Is DST:</strong>{" "}
              {location.timezone?.is_dst ? "Yes" : "No"}
            </div>

            <div>
              <strong>Is EU:</strong> {location.is_eu ? "Yes" : "No"}
            </div>
            <div>
              <strong>Borders:</strong> {location.borders || "N/A"}
            </div>
            <div>
              <strong>IP Type:</strong> {location.type || "N/A"}
            </div>
          </div>
        </Popup>
      </Marker>
      <FlyToLocation latitude={validLatitude} longitude={validLongitude} />
    </MapContainer>
  );
}

export default memo(LocationMap);
