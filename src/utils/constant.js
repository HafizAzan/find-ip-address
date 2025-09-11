export const ROUTES = {
  HOME: "/",
  USER_IP: "/user-ip",
  HISTORY: "/history",
  REGISTER: "/sign-up",
  NOT_FOUND: "*",
};

export default function formatDateTime(isoString) {
  const dateObj = new Date(isoString);
  const date = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${date} at ${time}`;
}
