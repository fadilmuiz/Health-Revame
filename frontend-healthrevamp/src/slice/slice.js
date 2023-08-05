import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config/base-API";

export const getAllHabbits = createAsyncThunk(
  "Habbits/getAll",
  async (token) => {
    const response = await fetch(`${BASE_URL}/habits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: token,
      },
    });
    if(response.ok){
      const responseJson = await response.json();
      return responseJson;
    }
  }
);

export const addHabbits = createAsyncThunk(
  "Habbits/addHabbit",
  async ({
    value,
    name,
    textTime,
    description,
    AlertSuccess,
    AlertFailed,
    move,
    storeData,
  }) => {
    const response = await fetch(`${BASE_URL}/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: value,
      },
      body: JSON.stringify({ name, time: textTime, description }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      AlertSuccess();
      await storeData();
      move()
    } else {
      AlertFailed();
      console.log(responseJson);
    }
    return responseJson;
  }
);

export const delHabbits = createAsyncThunk(
  "Habbits/deleteHabbit",
  async ({ value, id, storeData, AlertSuccess, AlertFailed }) => {
    const idReq = id;
    const response = await fetch(`${BASE_URL}/habits/${idReq}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: value,
      },
    });

    if(response.ok){
      AlertSuccess()
      storeData();
    }else {
      AlertFailed()
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  searchResult: null,
  habbitsData: [],
  addhabit: [],
  dataDelete: [],
  user: {},
  activities: [],
  activity: [],
  userRank: []
};

export const actionCreator = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSearch: (state, action) => {
      state.loading = false;
      state.error = null;
      state.searchResult = action.payload;
    },
    fetchActivities: (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    },
    fetchActivity: (state, action) => {
      state.loading = false;
      state.activity = action.payload;
    },
    fetchDataUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchDataUserRank: (state, action) => {
      state.loading = false;
      state.userRank = action.payload;
    },
    createdActivityLog: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: {
    [getAllHabbits.pending]: (state) => {
      state.loading = true;
    },
    [getAllHabbits.fulfilled]: (state, action) => {
      state.loading = false;
      state.habbitsData = action.payload;
    },
    [getAllHabbits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // add
    [addHabbits.pending]: (state) => {
      state.loading = true;
    },
    [addHabbits.fulfilled]: (state, action) => {
      state.loading = false;
      state.addhabit = action.payload;
    },
    [addHabbits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // deleted
    [delHabbits.pending]: (state) => {
      state.loading = true;
    },
    [delHabbits.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataDelete = action.payload;
    },
    [delHabbits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  fetchSearch,
  fetchActivities,
  fetchActivity,
  fetchDataUser,
  fetchDataUserRank,
  createdActivityLog
} = actionCreator.actions;

export default actionCreator.reducer;
