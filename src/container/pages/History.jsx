import React, { memo } from "react";
import HistoryCard from "../../components/HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import toast from "react-hot-toast";
import {
  deleteHistoryByIp,
  deleteListByIp,
} from "../../redux/slices/locationSlice";

function History() {
  const dispatch = useDispatch();
  const { history, lists } = useSelector((state) => state.location);
  const location = useLocation();
  const isUserIpPage = location.pathname === ROUTES.USER_IP;

  const deleteCard = (ip, type = "") => {
    if (type === "history") {
      dispatch(deleteHistoryByIp(ip));
      toast.success("History entry deleted successfully");
    } else {
      dispatch(deleteListByIp(ip));
      toast.success("User IP entry deleted successfully");
    }
  };

  return (
    <>
      <div className="history-container">
        {isUserIpPage ? (
          <>
            {!lists?.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 50,
                  width: "100%",
                  fontSize: 28,
                }}
              >
                No User IP Found.
              </div>
            ) : (
              lists?.map((location, index) => (
                <HistoryCard
                  location={location}
                  key={index}
                  onClick={() => deleteCard(location.ip)}
                />
              ))
            )}
          </>
        ) : (
          <>
            {!history?.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 50,
                  width: "100%",
                  fontSize: 28,
                }}
              >
                No history data available.
              </div>
            ) : (
              history?.map((location, index) => (
                <HistoryCard
                  location={location}
                  key={index}
                  onClick={() => deleteCard(location.ip, "history")}
                />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
}

export default memo(History);
