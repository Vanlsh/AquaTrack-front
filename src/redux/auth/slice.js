// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./initialState";
import {
  getUserInfo,
  logIn,
  logOut,
  signUp,
  updateUserProfile,
  uploadUserPhoto,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOutReducer: () => {
      return INITIAL_STATE;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      ////////////////////////////////////////////////////
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.token = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.successMessage = "Successfully registered";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.successMessage = "Successfully logged in";
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      ////////////////////////////////////////////////////
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, (state) => {
        return INITIAL_STATE;
      })

      ////////////////////////////////////////////////////
      .addCase(getUserInfo.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      })

      ////////////////////////////////////////////////////
      .addCase(updateUserProfile.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Profile updated";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      })

      ////////////////////////////////////////////////////
      .addCase(uploadUserPhoto.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Photo updated";
        state.user.photo = action.payload;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "Something went wrong, try again later";
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn } = authSlice.actions;
