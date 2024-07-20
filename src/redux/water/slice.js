import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWaterIntakeRecord,
  updateWaterIntakeRecord,
  fetchDailyWater,
  fetchMonthlyWater,
  fetchTodayWater,
  fetchWeeklyWater,
} from "./operations";

import { WATER_INITIAL_STATE } from "./initialState";
import { isToday } from "../../helpers/isToday";

const handleDailyPending = (state) => {
  state.waterDaily.errorMessage = null;
  state.waterDaily.successMessage = null;
};

const roundToTwoDecimals = (num) => parseFloat(num.toFixed(2));

const findDate = (oldDate) => {
  return ({ date }) => {
    const firstDate = Math.floor(Number(date) / 1000 / 60 / 60 / 24);
    const secondDate = Math.floor(Number(oldDate) / 1000 / 60 / 60 / 24);
    return firstDate === secondDate;
  };
};

const waterSlice = createSlice({
  name: "water",
  initialState: WATER_INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      //=================== fetchDailyWater ===================
      .addCase(fetchDailyWater.pending, (state) => {
        state.waterDaily.isLoading = true;
      })
      .addCase(fetchDailyWater.fulfilled, (state, action) => {
        const { dailyAmount, dailyPercentage, data } = action.payload;

        state.waterDaily.isLoading = false;

        state.waterDaily.amount = dailyAmount;
        state.waterDaily.percentage = dailyPercentage;
        state.waterDaily.data = data;
        state.waterDaily.data.sort((a, b) => Number(a.date) - Number(b.date));
      })
      .addCase(fetchDailyWater.rejected, (state) => {
        state.waterDaily.isLoading = false;
      })

      //================== fetchMonthlyWater ==================
      .addCase(fetchMonthlyWater.pending, (state) => {
        state.waterMonthly.isLoading = true;
        state.waterMonthly.isError = null;
      })
      .addCase(fetchMonthlyWater.fulfilled, (state, action) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.data = action.payload.data;
      })
      .addCase(fetchMonthlyWater.rejected, (state) => {
        state.waterMonthly.isLoading = false;
        state.waterMonthly.isError = true;
      })

      //================== fetchWeeklyWater ==================
      .addCase(fetchWeeklyWater.pending, (state) => {
        state.waterWeekly.isLoading = true;
      })
      .addCase(fetchWeeklyWater.fulfilled, (state, action) => {
        state.waterWeekly.isLoading = false;
        state.waterWeekly.data = action.payload.data;
      })
      .addCase(fetchWeeklyWater.rejected, (state) => {
        state.waterWeekly.isLoading = false;

        state.waterWeekly.errorMessage = 'An error occurred'
      })  

      //======================= addWater ======================
      .addCase(addWater.pending, handleDailyPending)
      .addCase(addWater.fulfilled, (state, action) => {
        const newRecord = action.payload.data;

        state.waterDaily.data.push(newRecord);
        state.waterDaily.data.sort((a, b) => Number(a.date) - Number(b.date));
        state.waterDaily.amount += newRecord.amount;
        state.waterDaily.percentage = roundToTwoDecimals(
          state.waterDaily.percentage + newRecord.percentage
        );

        const monthlyRecordIndex = state.waterMonthly.data.findIndex(
          findDate(newRecord.date)
        );
        if (isToday(newRecord.date)) {
          state.todayAmount.value += newRecord.amount;
        }
        if (monthlyRecordIndex !== -1) {
          state.waterDaily.successMessage = "Successfully added";
          state.waterMonthly.data[monthlyRecordIndex].amount +=
            newRecord.amount;
          state.waterMonthly.data[monthlyRecordIndex].percentage =
            roundToTwoDecimals(
              state.waterMonthly.data[monthlyRecordIndex].percentage +
                newRecord.percentage
            );
        }
      })
      .addCase(addWater.rejected, (state) => {
        state.waterDaily.errorMessage = "Something went wrong. Try again";
      })

      //====================== editWater ======================
      .addCase(updateWaterIntakeRecord.pending, handleDailyPending)
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const updatedRecord = action.payload.data;

        state.waterDaily.successMessage = "Successfully updated";

        const dailyIndex = state.waterDaily.data.findIndex(
          (record) => record.id === updatedRecord.id
        );

        if (dailyIndex !== -1) {
          const oldRecord = state.waterDaily.data[dailyIndex];

          state.waterDaily.data[dailyIndex] = updatedRecord;
          state.waterDaily.data.sort((a, b) => Number(a.date) - Number(b.date));
          const totalAmount = state.waterDaily.data.reduce(
            (sum, record) => sum + record.amount,
            0
          );
          state.waterDaily.amount = totalAmount;

          const totalPercentage = state.waterDaily.data.reduce(
            (sum, record) => sum + record.percentage,
            0
          );
          state.waterDaily.percentage = roundToTwoDecimals(totalPercentage);
          const monthlyIndex = state.waterMonthly.data.findIndex(
            findDate(oldRecord.date)
          );

          if (isToday(updatedRecord.date)) {
            state.todayAmount.value += updatedRecord.amount - oldRecord.amount;
          }
          if (monthlyIndex !== -1) {
            state.waterMonthly.data[monthlyIndex].amount +=
              updatedRecord.amount - oldRecord.amount;

            state.waterMonthly.data[monthlyIndex].percentage =
              roundToTwoDecimals(
                state.waterMonthly.data[monthlyIndex].percentage +
                  updatedRecord.percentage -
                  oldRecord.percentage
              );
          }
        }
      })
      .addCase(updateWaterIntakeRecord.rejected, (state) => {
        state.waterDaily.errorMessage = "Something went wrong. Try again";
      })

      //===================== deleteWater =====================
      .addCase(deleteWaterIntakeRecord.pending, handleDailyPending)
      .addCase(deleteWaterIntakeRecord.fulfilled, (state, action) => {
        const recordId = action.payload.data.id;

        const dailyIndex = state.waterDaily.data.findIndex(
          (record) => record.id === recordId
        );
        state.waterDaily.successMessage = "Successfully edited";
        if (dailyIndex !== -1) {
          const [removedRecord] = state.waterDaily.data.splice(dailyIndex, 1);
          state.waterDaily.amount -= removedRecord.amount;
          state.waterDaily.percentage -= removedRecord.percentage;

          const monthlyIndex = state.waterMonthly.data.findIndex(
            findDate(removedRecord.date)
          );
          if (isToday(removedRecord.date)) {
            state.todayAmount.value -= removedRecord.amount;
          }
          if (monthlyIndex !== -1) {
            state.waterMonthly.data[monthlyIndex].amount -=
              removedRecord.amount;
            state.waterMonthly.data[monthlyIndex].percentage -=
              removedRecord.percentage;
          }
        }
      })
      .addCase(deleteWaterIntakeRecord.rejected, (state) => {
        state.errorMessage = "Something went wrong. Try again";
      })
      //====================== editWater ======================
      .addCase(fetchTodayWater.pending, (state) => {
        state.todayAmount.isLoading = true;
        state.todayAmount.isError = false;
      })
      .addCase(fetchTodayWater.fulfilled, (state, action) => {
        state.todayAmount.isLoading = false;
        state.todayAmount.value = action.payload;
      })
      .addCase(fetchTodayWater.rejected, (state) => {
        state.todayAmount.isLoading = false;
        state.todayAmount.isError = true;
      });
  },
});

export const waterReducer = waterSlice.reducer;
