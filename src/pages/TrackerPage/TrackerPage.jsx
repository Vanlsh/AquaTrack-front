import { useParams } from "react-router-dom";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDailyWater,
  fetchMonthlyWater,
  fetchTodayWater,
  fetchWeeklyWater,
} from "../../redux/water/operations.js";
import { parseDateTime } from "../../helpers/parseDate.js";

const TrackerPage = () => {
  const { date } = useParams();
  const parsedDate = parseDateTime(date).getTime();
  const dispatch = useDispatch();
  const [isRefreshingPage, setIsRefreshingPage] = useState(true);

  useEffect(() => {
    if (isRefreshingPage) {
      const formattedDate = Date.now();
      dispatch(fetchMonthlyWater(parsedDate));
      dispatch(fetchDailyWater(parsedDate));
      dispatch(fetchTodayWater());
      dispatch(fetchWeeklyWater(formattedDate));
      setIsRefreshingPage(false);
    }
  }, [isRefreshingPage, parsedDate, dispatch]);

  return (
    <>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </>
  );
};

export default TrackerPage;
