import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    ip: "",
    location: {},
    history: [],
    lists: [],
  },
  reducers: {
    setLocation: (state, action) => {
      const newEntry = { ...action.payload };

      const exists = state.history.some((entry) => entry.ip === newEntry.ip);
      if (!exists) {
        state.location = newEntry;
        const entryWithTimestamp = {
          ...newEntry,
          timestamp: new Date().toISOString(),
        };
        state.history.unshift(entryWithTimestamp);
      }
    },

    setUserList: (state, action) => {
      const newEntry = { ...action.payload };

      const exists = state.lists.some((entry) => entry.ip === newEntry.ip);
      if (!exists) {
        const entryWithTimestamp = {
          ...newEntry,
          timestamp: new Date().toISOString(),
        };
        state.lists.unshift(entryWithTimestamp);
      }
    },

    setIp: (state, action) => {
      state.ip = action.payload;
    },

    clearHistory: (state) => {
      state.history = [];
    },

    deleteHistoryByIp: (state, action) => {
      const ipToDelete = action.payload;
      state.history = state.history.filter((entry) => entry.ip !== ipToDelete);
    },

    clearLists: (state) => {
      state.lists = [];
    },

    deleteListByIp: (state, action) => {
      const ipToDelete = action.payload;
      console.log(ipToDelete, "ipToDelete");
      state.lists = state.lists.filter((entry) => entry.ip !== ipToDelete);
    },
  },
});

export const {
  setLocation,
  setIp,
  clearHistory,
  deleteHistoryByIp,
  deleteListByIp,
  clearLists,
  setUserList,
} = locationSlice.actions;

export default locationSlice.reducer;
