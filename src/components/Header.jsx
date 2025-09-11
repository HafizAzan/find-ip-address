import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIp, setLocation, setUserList } from "../redux/slices/locationSlice";
import toast from "react-hot-toast";
import { ROUTES } from "../utils/constant";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const ip = e.target.ip.value;
    dispatch(setIp(ip));

    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    if (data.success) {
      if (location.pathname !== ROUTES.HOME) {
        navigate(ROUTES.HOME);
      }
      dispatch(setLocation(data));
      toast.success("Location found successfully! & history updated");
      e.target.ip.value = "";
    } else {
      toast.error("Invalid IP or not found");
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(
          "https://ip-location-75qio8oqn-hafizazans-projects.vercel.app/api/getUserLocation"
        );
        const data = await res.json();

        if (res.ok) {
          dispatch(setLocation(data));
        } else {
          toast.error(data.error || "Failed to get location");
        }
      } catch (err) {
        toast.error("Network error");
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    fetch(
      "https://ip-location-75qio8oqn-hafizazans-projects.vercel.app/api/user-ip-location"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return dispatch(setUserList(data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <header className="header">
      <main className="sub-header">
        <div className="img-wrapper">
          <Link to={ROUTES?.HOME}>
            <img src="/public/images/logo.png" />
          </Link>
        </div>

        <nav className="nav-links">
          <li>
            <Link to={ROUTES?.HISTORY}>View History</Link>
          </li>
          <li>
            <Link to={ROUTES?.USER_IP}>User IPs</Link>
          </li>
        </nav>
      </main>

      <main className="form-wrapper">
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter IP Address (e.g. 192.168.0.1)"
            name="ip"
            className="form-input"
            pattern="^(\d{1,3}\.){3}\d{1,3}$"
            title="Enter a valid IPv4 address like 192.168.0.1"
            required
          />
          <button className="form-button">Find</button>
        </form>
      </main>
    </header>
  );
}

export default memo(Header);
