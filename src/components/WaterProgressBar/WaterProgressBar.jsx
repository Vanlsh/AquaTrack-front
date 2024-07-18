import { useTranslation } from "react-i18next";
import css from "./WaterProgressBar.module.css";
import { selectWaterDailyPercentage } from "../../redux/water/selectors";
import { selectWaterRate } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const WaterProgressBar = () => {
    const { t } = useTranslation();
    const currentWater = useSelector(selectWaterDailyPercentage);
    const goal = useSelector(selectWaterRate);

    const percentage = (currentWater / goal) * 100;

    return (
        <div className={css.progressBarContainer}>
            <h2 className={css.progressBarTitle}>{t("today")}</h2>
            <div className={css.progressBar}>
                <div
                    className={css.progressBarFill}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: currentWater < goal ? "#9be1a0" : "#FABE4A",
                    }}
                >
                    <p
                        className={css.percentNumber}
                        style={{
                            color: currentWater < goal ? "#9be1a0" : "#FABE4A",
                        }}
                    >
                        {currentWater < goal ? `${percentage.toFixed(0)}%` : "done!"}
                    </p>
                    <div
                        className={css.ball}
                        style={{
                            border: currentWater < goal ? "solid 1px #9be1a0" : "solid 1px #FABE4A",
                        }}
                    ></div>
                </div>
            </div>
            <div className={css.percentContainer}>
                <p className={css.percent}>0%</p>
                <p className={css.percent}>50%</p>
                <p className={css.percent}>100%</p>
            </div>
        </div>
    );
};

export default WaterProgressBar;
