import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createWater,
  updateWater,
  deleteWater,
  getDayWater,
  getMonthWater,
} from "../../api/water.js";

//===================== ADD WATER =====================

export const addWater = createAsyncThunk(
  "water/addWater",
  async (formData, thunkAPI) => {
    try {
      const response = await createWater(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== UPDATE WATER ====================

export const updateWaterIntakeRecord = createAsyncThunk(
  "water/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await updateWater(id, formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//=================== DELETE WATER ====================

export const deleteWaterIntakeRecord = createAsyncThunk(
  "water/deleteWater",
  async (id, thunkAPI) => {
    try {
      const { data } = await deleteWater(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//================= GET MONTHLY WATER =================

export const fetchMonthlyWater = createAsyncThunk(
  "water/fetchWaters",
  async (formData, thunkAPI) => {
    try {
      const { data } = await getMonthWater(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

//================== GET DAILY WATER ==================

export const fetchDailyWater = createAsyncThunk(
  "water/fetchDay",
  async (date, thunkAPI) => {
    try {
      const response = await getDayWater(date);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
