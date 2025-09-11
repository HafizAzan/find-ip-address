import React, { memo } from "react";
import formatDateTime from "../utils/constant";
import { useDispatch } from "react-redux";
import { deleteHistoryByIp } from "../redux/slices/locationSlice";
import toast from "react-hot-toast";

const cardStyle = {
  width: "320px",
  height: "400px",
  perspective: "1000px",
  margin: "10px",
};

const cardInnerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
};

const cardFrontBackCommon = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "8px",
  boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.63)",
  backdropFilter: "blur(10px)",
  padding: "12px",
  fontSize: "14px",
  lineHeight: "1.5",
  overflowY: "auto",
};

const frontStyle = {
  ...cardFrontBackCommon,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const backStyle = {
  ...cardFrontBackCommon,
  transform: "rotateY(180deg)",
  overflowY: "auto",
};

function HistoryCard({ location, onClick }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          ...cardInnerStyle,
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div style={frontStyle}>
          <span style={{ fontSize: "64px" }}>
            {location.flag?.emoji || "🏳️"}
          </span>

          <img src={location?.flag?.img} alt="img" width={80} />

          <strong style={{ marginTop: 20, fontSize: "24px" }}>
            {location.country || "Unknown"}
          </strong>
        </div>

        <div style={backStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 24 }}>{location.flag?.emoji}</span>
              {location.flag?.img && (
                <img
                  src={location.flag.img}
                  alt="flag"
                  width={32}
                  height={20}
                />
              )}
              <strong style={{ fontSize: 18 }}>{location.country}</strong>
            </div>

            <span
              style={{ cursor: "pointer" }}
              onClick={onClick}
              title="Delete"
            >
              ❌
            </span>
          </div>

          <main style={{ textAlign: "left" }}>
            <div>
              <strong>City:</strong> {location.city || "N/A"}
            </div>
            <div>
              <strong>Region:</strong> {location.region || "N/A"}
            </div>
            <div>
              <strong>Postal Code:</strong> {location.postal || "N/A"}
            </div>
            <div>
              <strong>Latitude:</strong> {location.latitude || "N/A"}
            </div>
            <div>
              <strong>Longitude:</strong> {location.longitude || "N/A"}
            </div>
            <div>
              <strong>IP Address:</strong> {location.ip || "N/A"}
            </div>
            <div>
              <strong>Country Code:</strong> {location.country_code || "N/A"}
            </div>
            <div>
              <strong>Continent:</strong> {location.continent || "N/A"}
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
              {formatDateTime(location.timezone?.current_time)}
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default memo(HistoryCard);
